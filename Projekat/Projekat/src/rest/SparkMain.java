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
		
		app = new Aplikacija();
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		app = Files.Ucitavanje();
		
		
		get("/test", (req, res) -> {
			return "Works";
		});
		
		//ORGANIZACIJE
		get("/rest/organizacije/getOrganizacija", (req, res) -> {
			res.type("application/json");
			Organizacija o = app.getOrganizacijaID("FTN");
			if(o == null)
			{
				o = new Organizacija();
			}
			return g.toJson(o);
		});
	
		
		post("rest/organizacije/Izmena", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			Organizacija o = g.fromJson(payload, Organizacija.class);
			app.editOrganizacija(o);
			
			Files.UpisOrganizacija(app.getOrganizacijeList());
			return ("OK");
		});
		
		get("rest/korisnici/getActiveUser", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(true);
			return ss.attribute("user");
			
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
			Korisnik k = app.getKorisnikID(req.params("email"));			
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
			if(!k.getEmail().equals(""))
			{
				app.editKorisnik(k);	
				Files.UpisKorisnik(app.getKorisniciList());
			}
			return ("OK");
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

}
