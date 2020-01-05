package classes;

import enums.Uloga;

public class Korisnik {
	private String email; //key
	private String ime;
	private String lozinka;
	private String prezime;
	private Organizacija organizacija;
	private Uloga uloga;
	
	public Korisnik() {
		email = "";
		ime = "";
		lozinka = "";
		prezime = "";
		organizacija = new Organizacija();
	}

	public Korisnik(String email, String ime, String prezime, String lozinka, Organizacija organizacija, Uloga uloga) {
		this.email = email;
		this.ime = ime;
		this.prezime = prezime;
		this.lozinka = lozinka;
		this.organizacija = organizacija;
		this.uloga = uloga;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPrezime() {
		return prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public Organizacija getOrganizacija() {
		return organizacija;
	}

	public void setOrganizacija(Organizacija organizacija) {
		this.organizacija = organizacija;
	}

	public Uloga getUloga() {
		return uloga;
	}

	public void setUloga(Uloga uloga) {
		this.uloga = uloga;
	}

	public String getLozinka() {
		return lozinka;
	}

	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}

	@Override
	public String toString() {
		return "Korisnik [email=" + email + ", ime=" + ime + ", lozinka=" + lozinka + ", prezime=" + prezime
				+ ", organizacija=" + organizacija + ", uloga=" + uloga + "]";
	}

	

}
