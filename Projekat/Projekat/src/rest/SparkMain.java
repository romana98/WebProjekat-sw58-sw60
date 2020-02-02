package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import classes.Aplikacija;
import classes.Dates;
import classes.Disk;
import classes.Files;
import classes.KategorijaVM;
import classes.Korisnik;
import classes.Organizacija;

import classes.VM;
import enums.Uloga;
import spark.Request;
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

		get("/rest/organizacije/getOrganizacije", (req, res) -> {
			res.type("application/json");
			return g.toJson(app.getOrganizacijeList());
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

		/*
		 * get("/rest/kategorije/getKategorije", (req, res) -> {
		 * res.type("application/json"); Session ss = req.session(true); Korisnik k =
		 * ss.attribute("user"); return g.toJson(app.getKategorijeList());
		 * 
		 * if (k.getUloga() == Uloga.SuperAdmin) { return
		 * g.toJson(app.getOrganizacijeList()); } else { return
		 * g.toJson(k.getOrganizacija()); }
		 * 
		 * });
		 */

		get("/rest/organizacije/getOrgID", (req, res) -> {
			res.type("application/json");
			Organizacija org = app.getOrganizacijaID(req.queryMap("OrgID").value());
			return g.toJson(org);
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

		get("/rest/diskovi/getDiskovi", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(true);
			Korisnik k = ss.attribute("user");
			if (k.getUloga() == Uloga.Admin) {
				ArrayList<Disk> diskovi = new ArrayList<Disk>();
				for (String resurs : k.getOrganizacija().getResursi()) {
					if (app.getDiskoviID(resurs) != null) {
						diskovi.add(app.getDiskoviID(resurs));
					}
				}
				return g.toJson(diskovi);
			} else {
				return g.toJson(app.getDiskoviList());
			}

		});

		get("/rest/korisnici/getKorisnici", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(true);
			Korisnik k = ss.attribute("user");
			if (k.getUloga() == Uloga.Admin) {
				ArrayList<Korisnik> korisnici = new ArrayList<Korisnik>();
				for (String kor : k.getOrganizacija().getKorisnici()) {
					if (app.getKorisnikID(kor) != null) {
						korisnici.add(app.getKorisnikID(kor));
						//System.out.println(app.getKorisnikID(kor));
					}
				}
				return g.toJson(korisnici);

			} else {

				return g.toJson(app.getKorisniciList());
			}

		});

		//VM
		get("/rest/virtuelne/VM", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(true);
			Korisnik k = ss.attribute("user");
			ArrayList<VM> virtualne = getVMs(k);
			return g.toJson(virtualne);

		});

		get("/rest/virtualne/getVM", (req, res) -> {
			res.type("application/json");
			VM vm = app.getVirtualneID(req.queryMap("ime").value());
			if (vm == null) {
				vm = new VM();
				res.status(400);
			} else {
				res.status(200);
			}
			return g.toJson(vm);
		});

		get("/rest/virtualne/getVMID", (req, res) -> {
			res.type("application/json");
			VM vm = app.getVirtualneID(req.queryMap("VMID").value());
			return g.toJson(vm);
		});

		get("rest/filter", (req, res) -> {
			res.type("application/json");
			String naziv = req.queryMap("naziv").value();
			boolean filterGPU;
			boolean filterRAM;
			boolean filterCORE;

			try {
				filterGPU = Boolean.parseBoolean(req.queryMap("filterGPU").value());
				filterRAM = Boolean.parseBoolean(req.queryMap("filterRAM").value());
				filterCORE = Boolean.parseBoolean(req.queryMap("filterCORE").value());
			} catch (Exception e) {
				res.status(400);
				return g.toJson("Bad request");
			}

			Session ss = req.session(true);
			Korisnik k = ss.attribute("user");
			ArrayList<VM> virtualne = getVMs(k);

			ArrayList<VM> po_nazivu = new ArrayList<VM>();
			ArrayList<VM> posle_GPU = new ArrayList<VM>();
			ArrayList<VM> posle_RAM = new ArrayList<VM>();
			ArrayList<VM> posle_CORE = new ArrayList<VM>();
			
			if (!(naziv == null)) {
				for (VM vm : virtualne) {
					String ime = vm.getIme().split("&")[0];
					if (ime.contains(naziv)) {
						po_nazivu.add(vm);
					}
				}
			} else {
				po_nazivu = virtualne;
			}

			if (filterGPU) {
				int odGPU;
				int doGPU;
				try {
					odGPU = Integer.parseInt(req.queryMap("odGPU").value());
					doGPU = Integer.parseInt(req.queryMap("doGPU").value());
				} catch (Exception e) {
					res.status(400);
					return g.toJson("Bad request");
				}
				for (VM vm : po_nazivu) {
					if(vm.getKategorija().getGPU() > odGPU && vm.getKategorija().getGPU() < doGPU) {
						posle_GPU.add(vm);
					}
				}

			}
			else {
				posle_GPU = po_nazivu;
			}

			if (filterRAM) {
				int odRAM;
				int doRAM;
				try {
					odRAM = Integer.parseInt(req.queryMap("odRAM").value());
					doRAM = Integer.parseInt(req.queryMap("doRAM").value());
				} catch (Exception e) {
					res.status(400);
					return g.toJson("Bad request");
				}
				for (VM vm : posle_GPU) {
					if(vm.getKategorija().getRAM() > odRAM && vm.getKategorija().getRAM() < doRAM) {
						posle_RAM.add(vm);
					}
				}
			}
			else {
				posle_RAM = posle_GPU;
			}

			if (filterCORE) {
				int odCORE;
				int doCORE;
				try {
					odCORE = Integer.parseInt(req.queryMap("odCORE").value());
					doCORE = Integer.parseInt(req.queryMap("doCORE").value());
				} catch (Exception e) {
					res.status(400);
					return g.toJson("Bad request");
				}
				for (VM vm : posle_RAM) {
					if(vm.getKategorija().getBr_jezgara() > odCORE && vm.getKategorija().getBr_jezgara() < doCORE) {
						posle_CORE.add(vm);
					}
				}
			}
			else {
				posle_CORE = posle_RAM;
			}
			if(posle_CORE.isEmpty()) {
				res.status(201);
				return g.toJson(virtualne);
			}
			else {
				res.status(200);
				return g.toJson(posle_CORE);
			}
			
		});

		post("rest/kategorije/addKategorija", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			KategorijaVM kat;
			try {
				kat = g.fromJson(payload, KategorijaVM.class);
			} catch (Exception ex) {
				res.status(400);
				return "Bad request";
			}

			if (app.getKategorijeID(kat.getIme()) == null) {
				ArrayList<KategorijaVM> kategorije = app.getKategorijeList();
				kategorije.add(kat);
				app.setKategorijeList(kategorije);
				app.popuniMape();
				Files.UpisKategorija(app.getKategorijeList());
				res.status(200);
				return "OK";
			}
			res.status(401);
			return "Already exists";
		});

		post("rest/korisnici/addUser", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			Korisnik kor = g.fromJson(payload, Korisnik.class);
			if (app.getKorisnikID(kor.getEmail()) != null) {
				return g.toJson("201");

			}
			//napravi korisnika i updejtuj

			ArrayList<String> korisnici = app.getOrganizacijaID(kor.getOrganizacija().getIme()).getKorisnici();
			korisnici.add(kor.getEmail());
			app.getOrganizacijaID(kor.getOrganizacija().getIme()).setKorisnici(korisnici);
			for (String korisnik : korisnici) {
				if (korisnik.equalsIgnoreCase(kor.getEmail())) {
					kor.setOrganizacija(app.getOrganizacijaID(kor.getOrganizacija().getIme()));

				} else {
					app.getKorisnikID(korisnik).setOrganizacija(app.getOrganizacijaID(kor.getOrganizacija().getIme()));
				}
			}
			ArrayList<Korisnik> korisnici_object = app.getKorisniciList();
			korisnici_object.add(kor);
			app.setKorisniciList(korisnici_object);
			Files.UpisKorisnik(app.getKorisniciList());
			Files.UpisOrganizacija(app.getOrganizacijeList());
			app.popuniMape();
			return g.toJson("200");

		});

		post("rest/organizacije/addOrganizacija", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			Organizacija org = g.fromJson(payload, Organizacija.class);
			if (app.getOrganizacijaID(org.getIme()) != null) {
				return g.toJson("201");
			}
			ArrayList<Organizacija> orgs = app.getOrganizacijeList();
			orgs.add(org);
			app.setOrganizacijaID(org.getIme(), org);
			app.setOrganizacijeList(orgs);
			Files.UpisOrganizacija(orgs);
			return g.toJson("200");

		});

		post("rest/vm/addVM", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			VM vm = g.fromJson(payload, VM.class);
			if (app.getVirtualneID(vm.getIme()) != null) {
				return g.toJson("201");
			}
			app.getVirtualneList().add(vm);
			app.setVirtualne(vm.getIme(), vm);
			Files.UpisVM(app.getVirtualneList());
			String name = req.queryMap("OrgID").value();
			Organizacija org = app.getOrganizacijaID(name);
			if (org != null) {
				ArrayList<Organizacija> orgs = app.getOrganizacijeList();
				for (Organizacija organizacija : orgs) {
					if (organizacija.getIme().equals(name)) {
						ArrayList<String> resursi = organizacija.getResursi();
						resursi.add(vm.getIme());
						organizacija.setResursi(resursi);
						Files.UpisOrganizacija(orgs);
						for (Korisnik korisnik : app.getKorisniciList()) {
							if (korisnik.getOrganizacija().getIme().equals(organizacija.getIme())) {
								korisnik.setOrganizacija(organizacija);
							}
						}
						Files.UpisKorisnik(app.getKorisniciList());
						return g.toJson("200");
					}
				}
			}
			return g.toJson("201");
		});

		post("rest/vm/Izmena", (req, res) -> {
			String payload = req.body();
			String name = req.queryMap("imeOld").value();
			VM vm  = null;
			try {
				vm = g.fromJson(payload, VM.class);
			} catch (Exception e) {
				res.status(400);
				return ("400 Bad Request");
			}
			if (checkImeVM(vm, name)) {
				res.status(400);
				return ("202");
			}

			if (checkVM(vm)) {
				
				app.editVM(vm, name);
				Files.UpisOrganizacija(app.getOrganizacijeList());
				Files.UpisVM(app.getVirtualneList());
				res.status(200);
				return ("OK");
			}
			res.status(400);
			return ("400 Bad Request");
		});

		post("rest/vm/Brisanje", (req, res) -> {
			String payload = req.body();
			VM vm = g.fromJson(payload, VM.class);
			if (vm == null) {
				res.status(400);
				return ("400 Bad Request");
			}
			if (!app.getVirtualne().containsKey(vm.getIme())) {
				res.status(400);
				return ("400 Bad Request");
			}
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
				res.status(400);
			} else {
				res.status(200);
			}
			return g.toJson(disk);
		});

		post("rest/diskovi/addDisk", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			Disk disk = g.fromJson(payload, Disk.class);
			System.out.println(disk.toString());
			if (app.getDiskoviID(disk.getIme()) != null) {
				return g.toJson("201");
			}
			VM vm = app.getVirtualneID(disk.getMojaVirtualnaMasina().getIme());
			ArrayList<String> diskovi = vm.getDiskovi();
			diskovi.add(disk.getIme());
			vm.setDiskovi(diskovi);
			disk.setMojaVirtualnaMasina(vm);
			ArrayList<Disk> diskovi_list = app.getDiskoviList();
			diskovi_list.add(disk);
			app.setDiskoviList(diskovi_list);
			//KOD SVIH DISKOVA MORAS PROMENITI VM KOJOJ PRIPADAJU JER JE PROMENJENA, TJ SAMO KOD ONIH KOJE PRIPADAJU TOJ VM KOJA SE IZMENILA
			for (Organizacija org : app.getOrganizacijeList()) {
				for (String resurs : org.getResursi()) {
					if (vm.getIme().equals(resurs)) {
						ArrayList<String> resursi = org.getResursi();
						resursi.add(disk.getIme());
						org.setResursi(resursi);
						for (Korisnik kor : app.getKorisniciList()) {
							if (kor.getOrganizacija().getIme().equals(org.getIme())) {
								kor.setOrganizacija(org);

							}
						}
						Files.UpisDisk(app.getDiskoviList());
						Files.UpisKorisnik(app.getKorisniciList());
						Files.UpisOrganizacija(app.getOrganizacijeList());
						Files.UpisVM(app.getVirtualneList());
						app.popuniMape();
						return g.toJson("200");
					}
				}
			}

			return g.toJson("201");
			//sad gde sve ga treba dodati?
			//nadjes vm, setujes je na disku 
			//zatim toj vm dodas disk,
			//e onda krece zabava, svugde de je vm ili gde je disk moras da updejtujes listu
			//dakle sledece je da nadjes organizaciju kojoj vm pripada i u njene resurse dodas disk
			//a zatim svakog korisnika cija je organizacija ona gore treba mu postaviti ovu sa izmenjenim resursima

		});

		post("rest/diskovi/Brisanje", (req, res) -> {
			String payload = req.body();
			Disk disk = g.fromJson(payload, Disk.class);
			if (disk == null) {
				res.status(400);
				return ("400 Bad Request");
			}
			if (!app.getDiskovi().containsKey(disk.getIme())) {
				res.status(400);
				return ("400 Bad Request");
			}
			app.removeDisk(disk);

			Files.UpisDisk(app.getDiskoviList());
			Files.UpisVM(app.getVirtualneList());
			Files.UpisOrganizacija(app.getOrganizacijeList());
			res.status(200);
			return ("OK");
		});

		post("rest/diskovi/Izmena", (req, res) -> {
			String payload = req.body();
			String name = req.queryMap("imeOld").value();
			Disk disk = null;
			try {
				disk = g.fromJson(payload, Disk.class);
			} catch (Exception e) {
				res.status(400);
				return ("400 Bad Request");
			}
			if (checkImeDisk(disk, name)) {
				res.status(400);
				return ("202");
			}
			if (checkDisk(disk)) {
				

				app.editDisk(disk, name);
				Files.UpisDisk(app.getDiskoviList());
				Files.UpisVM(app.getVirtualneList());
				Files.UpisOrganizacija(app.getOrganizacijeList());
				res.status(200);
				return ("OK");
			}
			res.status(400);
			return ("400 Bad Request");
		});

		//MESECNI RACUN
		post("/rest/mesecni/getMesecniRacun", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			Dates dates = g.fromJson(payload, Dates.class);
			Session ss = req.session(true);
			Korisnik k = ss.attribute("user");
			HashMap<String, Double> map = new HashMap<String, Double>();
			if(checkDates(dates))
			{
				map = app.calculate(k, dates);
			}
			
			if (map.isEmpty()) {
				res.status(400);
			}
			else
			{
				res.status(200);
			}
			return g.toJson(map);
		});

		//KATEGORIJE
		get("/rest/kategorije/getKategorija", (req, res) -> {
			res.type("application/json");
			KategorijaVM kat = app.getKategorijeID(req.queryMap("ime").value());

			if (kat == null) {
				kat = new KategorijaVM();
				res.status(400);
			} else {
				res.status(200);
			}
			return g.toJson(kat);
		});

		post("rest/kategorije/Brisanje", (req, res) -> {
			String payload = req.body();
			KategorijaVM kat = g.fromJson(payload, KategorijaVM.class);
			if (isRemove(kat)) {
				app.removeKategorija(kat);

				Files.UpisKategorija(app.getKategorijeList());
				res.status(200);
				return ("OK");
			}
			res.status(400);
			return ("400 Bad Request");
		});

		post("rest/kategorije/Izmena", (req, res) -> {
			String payload = req.body();
			String name = req.queryMap("imeOld").value();
			KategorijaVM kat = null;
			try {
				kat = g.fromJson(payload, KategorijaVM.class);
			} catch (Exception e) {
				res.status(400);
				return ("400 Bad Request");
			}
			
			if (checkImeKat(kat, name)) {
				res.status(400);
				return ("202");
			}
			if (checkKat(kat)) {

				app.editKategorija(kat, name);
				Files.UpisKategorija(app.getKategorijeList());
				Files.UpisVM(app.getVirtualneList());
				res.status(200);
				return ("OK");
			}
			res.status(400);
			return ("400 Bad Request");
		});

		//ORGANIZACIJE
		get("/rest/organizacije/getOrganizacija", (req, res) -> {
			res.type("application/json");
			Organizacija o = app.getOrganizacijaID(req.queryMap().value("ime"));
			if (o == null) {
				o = new Organizacija();
				res.status(400);
			} else {
				res.status(200);
			}
			return g.toJson(o);
		});

		post("rest/organizacije/Izmena", (req, res) -> {
			String payload = req.body();
			String name = req.queryMap("imeOld").value();
			Organizacija o = g.fromJson(payload, Organizacija.class);
			if (checkImeOrg(o, name)) {
				res.status(400);
				return ("202");
			}
			if (checkOrganization(o)) {
				app.editOrganizacija(o, name);
				Files.UpisKorisnik(app.getKorisniciList());
				Files.UpisOrganizacija(app.getOrganizacijeList());
				res.status(200);
				return ("OK");
			}
			res.status(400);
			return ("400 Bad Request");
		});

		//RAD SA ULOGOVANIM
		get("rest/korisnici/getActiveUser", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(true);
			Korisnik k = ss.attribute("user");
			return g.toJson(k);

		});

		get("rest/logOut", (req, res) -> {
			Session ss = req.session(false);
			ss.invalidate();
			res.status(200);
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
				res.status(400);
			} else {
				res.status(200);
			}
			return g.toJson(k);
		});

		post("rest/korisnici/Izmena", (req, res) -> {
			Session ss = req.session(true);
			Korisnik active = ss.attribute("user");

			String payload = req.body();
			String email = req.queryMap("emailOld").value();
			String pass_nd = req.queryMap("pass_nd").value();
			Korisnik k = g.fromJson(payload, Korisnik.class);

			if (k.getUloga() == null) {
				if (email.compareToIgnoreCase(active.getEmail()) != 0)
				{
					res.status(400);
					return ("202");
				}
				else if(k.getLozinka().compareTo(pass_nd) != 0 && k.getLozinka().compareTo(active.getLozinka()) != 0)
				{
					res.status(400);
					return ("400 Bad Request");
				}
			}
			if (checkUser(k)) {
				
				app.editKorisnik(k, email);
				Files.UpisKorisnik(app.getKorisniciList());
				if(k.getUloga() == null)
				{
						ss.attribute("user", app.getKorisnici().get(k.getEmail()));
				}
				res.status(200);
				return ("OK");
			}
			res.status(400);
			return ("400 Bad Request");
		});

		post("rest/korisnici/Brisanje", (req, res) -> {
			String payload = req.body();
			Korisnik k = g.fromJson(payload, Korisnik.class);
			if (k == null) {
				res.status(400);
				return ("400 Bad Request");
			}
			if (!app.getKorisnici().containsKey(k.getEmail())) {
				res.status(400);
				return ("400 Bad Request");
			}
			res.status(200);
			app.removeKorisnik(k);

			Files.UpisKorisnik(app.getKorisniciList());
			Files.UpisOrganizacija(app.getOrganizacijeList());
			return ("OK");
		});

		post("rest/forbidden", (req, res) -> {
			String payload = req.body();
			HashMap<String, String> salje = g.fromJson(payload, new TypeToken<HashMap<String, String>>() {
			}.getType());
			if (provera(salje, req)) {
				res.status(200);
				return ("OK");
			}
			res.status(403);
			return ("Access forbidden");
		});
	}

	public static boolean provera(HashMap<String, String> salje, Request req) {
		Session ss = req.session(true);
		Korisnik k = ss.attribute("user");
		//sta moze samo admin
		if (salje.get("salje").equals("mesecni")) {
			if (k == null) {
				return false;
			}

			if (k.getUloga().equals(Uloga.Admin)) {
				return true;
			} else {
				return false;
			}
		} else if (salje.get("salje").equals("profil") || salje.get("salje").equals("vmIzmena")
				|| salje.get("salje").equals("diskIzmena")) {
			if (k == null) {
				return false;
			}
		} else if (salje.get("salje").equals("organizacijaIzmena") || salje.get("salje").equals("korisnikIzmena")
				|| salje.get("salje").equals("AddDisc") || salje.get("salje").equals("AddVM")
				|| salje.get("salje").equals("AddUser") || salje.get("salje").equals("UserView")) {
			//sta mogu super admin i admin a ne moze korisnik
			if (k == null) {
				return false;
			}

			if (!k.getUloga().equals(Uloga.Korisnik)) {
				return true;
			} else {
				return false;
			}
		} else if (salje.get("salje").equals("kategorijaIzmena") || salje.get("salje").equals("korisnikIzmena")
				|| salje.get("salje").equals("AddCategory") || salje.get("salje").equals("CategoryView")
				|| salje.get("salje").equals("AddOrganization") || salje.get("salje").equals("OrganizationView")) {
			//sta moze samo superadmin
			if (k == null) {
				return false;
			}

			if (k.getUloga().equals(Uloga.SuperAdmin)) {
				return true;
			} else {
				return false;
			}
		}

		return true;
	}

	public static boolean isRemove(KategorijaVM kat) {
		if (!app.getKategorije().containsKey(kat.getIme())) {
			return false;
		}
		for (int i = 0; i < app.getVirtualneList().size(); i++) {
			if (app.getVirtualneList().get(i).getKategorija().getIme().equalsIgnoreCase(kat.getIme())) {
				return false;
			}
		}
		return true;
	}

	public static boolean checkKat(KategorijaVM kat) {

		if (kat.getIme().equals("") || kat.getGPU() <= 0 || kat.getBr_jezgara() <= 0 || kat.getRAM() <= 0) {
			return false;
		}
		return true;
	}

	public static boolean checkImeKat(KategorijaVM kat, String name) {

		for (int i = 0; i < app.getKategorijeList().size(); i++) {
			if (app.getKategorijeList().get(i).getIme().equals(kat.getIme())) {
				if (app.getKategorijeList().get(i).getIme().equalsIgnoreCase(name)) {
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
				if (app.getOrganizacijeList().get(i).getIme().equalsIgnoreCase(name)) {
					return false;
				}
				return true;
			}

		}

		return false;
	}
	public static boolean checkDates(Dates d)
	{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
		
		try {
			if(d.getFinish_Date().compareTo("") != 0 && d.getStart_Date().compareTo("") != 0)
			{
				if(sdf.parse(d.getStart_Date()).after(sdf.parse(d.getFinish_Date())))
					return false;
			}
			else
			{
				return false;
			}
		} catch (ParseException e) {
			return false;
		}
		return true;
	}

	public static boolean checkEmptyArgs(ArrayList<String> args) {
		//vraca true ako nema praznih argumenata
		for (String arg : args) {
			if (arg.equalsIgnoreCase("")) {
				return false;
			}
		}
		return true;
	}

	public static boolean checkVM(VM vm) {

		if (vm.getIme().equals("")) {
			return false;
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
		
		for (int i = 0; i < vm.getDatumi().size(); i++) {
			try {
				if(vm.getDatumi().get(i).getFinish_Date().compareTo("") != 0 && vm.getDatumi().get(i).getStart_Date().compareTo("") != 0)
				{
					if(sdf.parse(vm.getDatumi().get(i).getStart_Date()).after(sdf.parse(vm.getDatumi().get(i).getFinish_Date())))
						return false;
				}
				else if(vm.getDatumi().get(i).getFinish_Date().compareTo("") != 0 && vm.getDatumi().get(i).getStart_Date().compareTo("") == 0 && i != vm.getDatumi().size() -1)
				{
					return false;
				}
			} catch (ParseException e) {
				return false;
			}
		}
		return true;
	}

	public static boolean checkImeVM(VM vm, String name) {

		for (int i = 0; i < app.getVirtualneList().size(); i++) {
			if (app.getVirtualneList().get(i).getIme().equals(vm.getIme())) {
				if (app.getVirtualneList().get(i).getIme().equalsIgnoreCase(name)) {
					return false;
				}
				return true;
			}

		}

		return false;
	}

	public static boolean checkDisk(Disk d) {

		if (d.getIme().equals("") || d.getKapacitet() <= 0) {
			return false;
		}
		return true;
	}

	public static boolean checkImeDisk(Disk d, String name) {

		for (int i = 0; i < app.getDiskoviList().size(); i++) {
			if (app.getDiskoviList().get(i).getIme().equals(d.getIme())) {
				if (app.getDiskoviList().get(i).getIme().equalsIgnoreCase(name)) {
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
		
		if(k.getUloga() != null)
		{
			if(k.getUloga().equals(Uloga.SuperAdmin))
			{
				return false;
			}
		}

		if (k.getEmail().equals("") || k.getIme().equals("") || k.getPrezime().equals("") || k.getLozinka().equals("")
				|| !k.getEmail().contains("@") || !k.getEmail().contains(".") || !k.getIme().matches("[a-zA-Z]+")
				|| !k.getPrezime().matches("[a-zA-Z]+") || k.getEmail().indexOf('@') > k.getEmail().indexOf('.')) {
			return false;
		}
		return true;
	}

	public static ArrayList<VM> getVMs(Korisnik k) {
		if (k.getUloga() == Uloga.Admin) {
			ArrayList<VM> virtualneAdminove = new ArrayList<VM>();
			for (String r : k.getOrganizacija().getResursi()) {
				if (app.getVirtualneID(r) != null) {
					virtualneAdminove.add(app.getVirtualneID(r));
				}
			}
			return virtualneAdminove;
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
			return virtualneKorisnika;
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
			return virtualne;
		}
	}

}
