package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import spark.Request;
import spark.Session;

import java.io.File;
import java.io.IOException;

import com.google.gson.Gson;

import classes.Aplikacija;
import classes.Files;
import classes.Korisnik;
import classes.Organizacija;

public class SparkMain {
	
	private static Gson g = new Gson();
	private static Aplikacija app;

	public static void main(String[] args) throws IOException {
		port(8080);
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		app = new Aplikacija();
		app = Files.Ucitavanje();
		
		app.popuniMape();
		
		
		get("/test", (req, res) -> {
			return "Works";
		});
		//VM
		get("/rest/virtuelne/VM", (req, res) -> {
			res.type("application/json");
			return g.toJson(app.getVirtualneList());
		});
		
		
		
		
		//ORGANIZACIJE
		get("/rest/organizacije/getOrganizacija", (req, res) -> {
			res.type("application/json");
			Organizacija o = app.getOrganizacijaID(req.queryMap().value("ime"));
			//Organizacija o = app.getOrganizacijaID("FTN");
			if(o == null)
			{
				o = new Organizacija();
			}
			return g.toJson(o);
		});
	
		
		post("rest/organizacije/Izmena", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			String name = req.queryMap("imeOld").value();
			Organizacija o = g.fromJson(payload, Organizacija.class);
			if(checkOrganization(o))
			{
					if(checkImeOrg(o, name))
					{
						return("202");
					}
							
				app.editOrganizacija(o);	
				Files.UpisOrganizacija(app.getOrganizacijeList());
				return("200");
			}
			return ("201");
		});
		
		//RAD SA ULOGOVANIM
		get("rest/korisnici/getActiveUser", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(true);
			Korisnik k = ss.attribute("user");
			return g.toJson(k);
			
		});
		
		get("rest/logOut", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(false);
			ss.invalidate();
			return "OK";
			
		});
		
		
		//Vukasinovo za vracanje po emailu
		get("rest/korisnici/getKorisnikByEmail", (req, res) -> {
			res.type("application/json");
			Korisnik k = app.getKorisnikID(req.queryMap("email").value());
			String password = req.queryMap("password").value();


			if (password.equals("")) {
				return("201");
			}
			if (k != null) {
				if (k.getLozinka().equals(password)) {
					//hocemo da zakacimo usera za sesiju ovde
					Session ss = req.session(true);
					ss.attribute("user",k);
					return("200");
				}
				else {
					return("Password is not correct.");			
				}
					
			}
			else {
				return("User with email: " + req.queryMap().value("email") + " doesn't exist!");
			}
		});
		
		
		//KORISNICI
		get("rest/korisnici/getKorisnik", (req, res) -> {
			res.type("application/json");
			//Korisnik k = app.getKorisnikID(req.params("email"));	
			Korisnik k = app.getKorisnikID("romana@super.com");	
			if(k == null)
			{
				k = new Korisnik();
			}
			return g.toJson(k);
		});

		post("rest/korisnici/Izmena", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			Korisnik k = g.fromJson(payload, Korisnik.class);

			if(checkUser(k))
			{
				if(k.getUloga() == null)
				{
					if(checkEmail(k, req))
						return("202");
				}
				app.editKorisnik(k);	
				Files.UpisKorisnik(app.getKorisniciList());
				return("200");
			}
			return ("201");
		});
		
		post("rest/korisnici/Brisanje", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			Korisnik k = g.fromJson(payload, Korisnik.class);
			app.removeKorisnik(k);
			
			Files.UpisKorisnik(app.getKorisniciList());
			return ("OK");
		});
	}
	
	
	public static boolean checkEmail(Korisnik k, Request req)
	{
		Session ss = req.session(true);
		Korisnik active = ss.attribute("user");
		
		for (int i = 0; i < app.getKorisniciList().size(); i++) {
			if(app.getKorisniciList().get(i).getEmail().equals(k.getEmail()))
			{
				if(active.getEmail().equals(k.getEmail())) {
					return false;
				}
				return true;
			}
			
		}
		
		return false;
	}
	
	public static boolean checkOrganization(Organizacija o)
	{
		
		if(o.getIme().equals("") || o.getOpis().equals(""))
		{
			return false;
		}
		return true;
	}

	
	
	public static boolean checkImeOrg(Organizacija o, String name)
	{
		
		for (int i = 0; i < app.getOrganizacijeList().size(); i++) {
			if(app.getOrganizacijeList().get(i).getIme().equals(o.getIme()))
			{
				if(app.getOrganizacijeList().get(i).getIme().equals(name))
				{
					return false;
				}
				return true;
			}
			
		}
		
		return false;
	}
	
	public static boolean checkUser(Korisnik k)
	{
		if(k.getEmail().equals("p"))
		{
			return false;
		}
		if(k.getEmail().equals("") || k.getIme().equals("") || k.getPrezime().equals("") || k.getLozinka().equals("") || !k.getEmail().contains("@") || !k.getEmail().contains("."))
		{
			return false;
		}
		return true;
	}

}
