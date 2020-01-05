package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;

import classes.Aplikacija;
import classes.Dates;
import classes.Disk;
import classes.Files;
import classes.KategorijaVM;
import classes.Korisnik;
import classes.Organizacija;

import classes.VM;
import enums.Uloga;
import spark.Session;

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

		get("/rest/kategorije/getKatID", (req, res) -> {
			res.type("application/json");
			KategorijaVM kat = app.getKategorijeID(req.queryMap("KatID").value());
			return g.toJson(kat);
		});

		get("/rest/kategorije/getKategorije", (req, res) -> {
			res.type("application/json");
			return g.toJson(app.getKategorijeList());
		});

		get("/rest/organizacije/getOrgDiscs", (req, res) -> {
			res.type("application/json");
			ArrayList<String> discs = new ArrayList<String>();
			Organizacija org = app.getOrganizacijaID(req.queryMap("OrgID").value());
			if (org != null) {
				for (String resurs : org.getResursi()) {
					if (app.getDiskoviID(resurs) != null) {
						discs.add(resurs);
					}
				}
			}
			return g.toJson(discs);
		});

		get("/rest/organizacije/getOrgs", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(true);
			Korisnik k = ss.attribute("user");

			if (k.getUloga() == Uloga.SuperAdmin) {
				return g.toJson(app.getOrganizacijeList());
			} else {
				return g.toJson(k.getOrganizacija());
			}
		});

		//VM
		get("/rest/virtuelne/VM", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(true);
			Korisnik k = ss.attribute("user");
			if (k.getUloga() == Uloga.Admin) {
				ArrayList<VM> virtualneAdminove = new ArrayList<VM>();
				for (String r : k.getOrganizacija().getResursi()) {
					if (app.getVirtualneID(r) != null) {
						virtualneAdminove.add(app.getVirtualneID(r));
					}
				}
				return g.toJson(virtualneAdminove);
			} else if (k.getUloga() == Uloga.Korisnik) {
				ArrayList<VM> virtualneKorisnika = new ArrayList<VM>();
				for (Organizacija org : app.getOrganizacijeList()) {
					for (String kor : org.getKorisnici()) {
						if (kor.equalsIgnoreCase(k.getEmail())) {
							for (String resurs : org.getResursi()) {
								if (app.getVirtualneID(resurs) != null) {
									virtualneKorisnika.add(app.getVirtualneID(resurs));
								}
							}
						}
					}
				}
				return g.toJson(virtualneKorisnika);
			} else {
				ArrayList<VM> virtualne = new ArrayList<VM>();
				for (VM virt : app.getVirtualneList()) {
					for (Organizacija org : app.getOrganizacijeList()) {
						for (String resu : org.getResursi()) {
							if (resu.equalsIgnoreCase(virt.getIme())) {
								VM newVm = new VM(virt);
								newVm.setIme(virt.getIme() + "&" + org.getIme());
								virtualne.add(newVm);
							}
						}
					}
				}
				return g.toJson(virtualne);
			}

		});

		get("/rest/virtualne/getVM", (req, res) -> {
			res.type("application/json");
			VM vm = app.getVirtualneID(req.queryMap("ime").value());
			if (vm == null) {
				vm = new VM();
			}
			return g.toJson(vm);
		});

		post("rest/vm/addVM", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			VM vm = g.fromJson(payload, VM.class);
			if(app.getVirtualneID(vm.getIme())!=null) {
				return g.toJson("201");
			}
			app.getVirtualneList().add(vm);
			app.setVirtualne(vm.getIme(), vm);
			Files.UpisVM(app.getVirtualneList());
			String name = req.queryMap("OrgID").value();
			Organizacija org = app.getOrganizacijaID(name);
			if (org != null) {
				ArrayList<Organizacija> orgs = app.getOrganizacijeList();
				for (Organizacija organizacija: orgs) {
					if (organizacija.getIme().equals(name)) {
						ArrayList<String> resursi = organizacija.getResursi();
						resursi.add(vm.getIme());
						organizacija.setResursi(resursi);
						Files.UpisOrganizacija(orgs);
						return g.toJson("200");
					}
				}
			}
			return g.toJson("201");
		});

		post("rest/vm/Izmena", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			String name = req.queryMap("imeOld").value();
			VM vm = g.fromJson(payload, VM.class);
			if (checkVM(vm)) {
				if (checkImeVM(vm, name)) {
					return ("202");
				}

				app.editVM(vm, name);
				Files.UpisOrganizacija(app.getOrganizacijeList());
				Files.UpisVM(app.getVirtualneList());
				return ("200");
			}
			return ("201");
		});

		post("rest/vm/Brisanje", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			VM vm = g.fromJson(payload, VM.class);
			app.removeVM(vm);

			Files.UpisVM(app.getVirtualneList());
			Files.UpisOrganizacija(app.getOrganizacijeList());
			return ("OK");
		});
		
		//DISKOVI
		get("/rest/diskovi/getDisk", (req, res) -> {
			res.type("application/json");
			Disk disk = app.getDiskoviID(req.queryMap("ime").value());
			if (disk == null) {
				disk = new Disk();
			}
			return g.toJson(disk);
		});

		post("rest/diskovi/Brisanje", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			Disk disk = g.fromJson(payload, Disk.class);
			app.removeDisk(disk);

			Files.UpisDisk(app.getDiskoviList());
			Files.UpisVM(app.getVirtualneList());
			return ("OK");
		});
		
		post("rest/diskovi/Izmena", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			String name = req.queryMap("imeOld").value();
			Disk disk = g.fromJson(payload, Disk.class);
			if (checkDisk(disk)) {
				if (checkImeDisk(disk, name)) {
					return ("202");
				}

				app.editDisk(disk, name);
				Files.UpisDisk(app.getDiskoviList());
				Files.UpisVM(app.getVirtualneList());
				return ("200");
			}
			return ("201");
		});
		
		//MESECNI RACUN
		post("/rest/mesecni/getMesecniRacun", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			Dates dates = g.fromJson(payload, Dates.class);
			Session ss = req.session(true);
			Korisnik k = ss.attribute("user");
			HashMap<String, Double> map = app.calculate(k, dates);
			if(map.isEmpty())
				return("201");
			return g.toJson(map);
		});
		
		//KATEGORIJE
		get("/rest/kategorije/getKategorija", (req, res) -> {
			res.type("application/json");
			KategorijaVM kat = app.getKategorijeID(req.queryMap("ime").value());
			
			
			if (kat == null) {
				kat = new KategorijaVM();
			}
			return g.toJson(kat);
		});
		
		post("rest/kategorije/Brisanje", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			KategorijaVM kat = g.fromJson(payload, KategorijaVM.class);
			if(isRemove(kat))
			{
				app.removeKategorija(kat);

				Files.UpisKategorija(app.getKategorijeList());
				return ("200");
			}
			return ("201");
		});
		
		post("rest/kategorije/Izmena", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			String name = req.queryMap("imeOld").value();
			KategorijaVM kat = g.fromJson(payload, KategorijaVM.class);
			if (checkKat(kat)) {
				if (checkImeKat(kat, name)) {
					return ("202");
				}

				app.editKategorija(kat, name);
				Files.UpisKategorija(app.getKategorijeList());
				
				return ("200");
			}
			return ("201");
		});
		
		//ORGANIZACIJE
		get("/rest/organizacije/getOrganizacija", (req, res) -> {
			res.type("application/json");
			Organizacija o = app.getOrganizacijaID(req.queryMap().value("ime"));
			//Organizacija o = app.getOrganizacijaID("FTN");
			if (o == null) {
				o = new Organizacija();
			}
			return g.toJson(o);
		});

		post("rest/organizacije/Izmena", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			String name = req.queryMap("imeOld").value();
			Organizacija o = g.fromJson(payload, Organizacija.class);
			if (checkOrganization(o)) {
				if (checkImeOrg(o, name)) {
					return ("202");
				}

				app.editOrganizacija(o, name);
				Files.UpisOrganizacija(app.getOrganizacijeList());
				return ("200");
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
				return ("201");
			}
			if (k != null) {
				if (k.getLozinka().equals(password)) {
					//hocemo da zakacimo usera za sesiju ovde
					Session ss = req.session(true);
					ss.attribute("user", k);
					return ("200");
				} else {
					return ("Password is not correct.");
				}

			} else {
				return ("User with email: " + req.queryMap().value("email") + " doesn't exist!");
			}
		});

		//KORISNICI
		get("rest/korisnici/getKorisnik", (req, res) -> {
			res.type("application/json");
			Korisnik k = app.getKorisnikID(req.queryMap().value("email"));
			if (k == null) {
				k = new Korisnik();
			}
			return g.toJson(k);
		});

		post("rest/korisnici/Izmena", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(true);
			Korisnik active = ss.attribute("user");
			
			String payload = req.body();
			Korisnik k = g.fromJson(payload, Korisnik.class);

			if (checkUser(k)) {
				if (k.getUloga() == null) {
					if (checkEmail(k, active))
						return ("202");
				}
				app.editKorisnik(k, active.getEmail());
				Files.UpisKorisnik(app.getKorisniciList());
				return ("200");
			}
			return ("201");
		});

		post("rest/korisnici/Brisanje", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			Korisnik k = g.fromJson(payload, Korisnik.class);
			app.removeKorisnik(k);

			Files.UpisKorisnik(app.getKorisniciList());
			Files.UpisOrganizacija(app.getOrganizacijeList());
			return ("OK");
		});
	}
	
	public static boolean isRemove(KategorijaVM kat)
	{
		for (int i = 0; i < app.getVirtualneList().size(); i++) {
			if(app.getVirtualneList().get(i).getKategorija().getIme().equals(kat.getIme()))
			{
				return false;
			}
		}
		return true;
	}

	public static boolean checkKat(KategorijaVM kat) {

		if (kat.getIme().equals("") || kat.getGPU() == 0 || kat.getBr_jezgara() == 0 || kat.getRAM() == 0) {
			return false;
		}
		return true;
	}

	public static boolean checkImeKat(KategorijaVM kat, String name) {

		for (int i = 0; i < app.getKategorijeList().size(); i++) {
			if (app.getKategorijeList().get(i).getIme().equals(kat.getIme())) {
				if (app.getKategorijeList().get(i).getIme().equals(name)) {
					return false;
				}
				return true;
			}

		}

		return false;
	}

	public static boolean checkOrganization(Organizacija o) {

		if (o.getIme().equals("") || o.getOpis().equals("")) {
			return false;
		}
		return true;
	}

	public static boolean checkImeOrg(Organizacija o, String name) {

		for (int i = 0; i < app.getOrganizacijeList().size(); i++) {
			if (app.getOrganizacijeList().get(i).getIme().equals(o.getIme())) {
				if (app.getOrganizacijeList().get(i).getIme().equals(name)) {
					return false;
				}
				return true;
			}

		}

		return false;
	}

	public static boolean checkVM(VM vm) {

		if (vm.getIme().equals("")) {
			return false;
		}
		return true;
	}

	public static boolean checkImeVM(VM vm, String name) {

		for (int i = 0; i < app.getVirtualneList().size(); i++) {
			if (app.getVirtualneList().get(i).getIme().equals(vm.getIme())) {
				if (app.getVirtualneList().get(i).getIme().equals(name)) {
					return false;
				}
				return true;
			}

		}

		return false;
	}

	public static boolean checkDisk(Disk d) {

		if (d.getIme().equals("") || d.getKapacitet() == 0) {
			return false;
		}
		return true;
	}

	public static boolean checkImeDisk(Disk d, String name) {

		for (int i = 0; i < app.getDiskoviList().size(); i++) {
			if (app.getDiskoviList().get(i).getIme().equals(d.getIme())) {
				if (app.getDiskoviList().get(i).getIme().equals(name)) {
					return false;
				}
				return true;
			}

		}

		return false;
	}

	public static boolean checkEmail(Korisnik k, Korisnik active) {
		for (int i = 0; i < app.getKorisniciList().size(); i++) {
			if (app.getKorisniciList().get(i).getEmail().equals(k.getEmail())) {
				if (active.getEmail().equals(k.getEmail())) {
					return false;
				}
				return true;
			}

		}

		return false;
	}
	
	public static boolean checkUser(Korisnik k) {
		if (k.getEmail().equals("p")) {
			return false;
		}
		if (k.getEmail().equals("") || k.getIme().equals("") || k.getPrezime().equals("") || k.getLozinka().equals("")
				|| !k.getEmail().contains("@") || !k.getEmail().contains(".")) {
			return false;
		}
		return true;
	}

}
