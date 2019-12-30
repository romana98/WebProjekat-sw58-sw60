package classes;

import java.util.ArrayList;

public class Organizacija {
	private String ime; //key
	private String opis;
	private String logo;
	private ArrayList<String> korisnici;
	private ArrayList<String> resursi;
	
	public Organizacija() {
		ime = "none";
		opis = "none";
		logo = "none";
		korisnici  = new ArrayList<String>();
		resursi = new ArrayList<String>();
	}
	
	public Organizacija(String ime, String opis, String logo, ArrayList<String> korisnici,
			ArrayList<String> resursi) {
		this.ime = ime;
		this.opis = opis;
		this.logo = logo;
		this.korisnici = korisnici;
		this.resursi = resursi;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public ArrayList<String> getKorisnici() {
		return korisnici;
	}

	public void setKorisnici(ArrayList<String> korisnici) {
		this.korisnici = korisnici;
	}

	public ArrayList<String> getResursi() {
		return resursi;
	}

	public void setResursi(ArrayList<String> resursi) {
		this.resursi = resursi;
	}

	@Override
	public String toString() {
		return "Organizacija [ime=" + ime + ", opis=" + opis + ", logo=" + logo + ", korisnici=" + korisnici
				+ ", resursi=" + resursi + "]";
	}
	
}
