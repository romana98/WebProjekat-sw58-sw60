package classes;

import java.util.ArrayList;
import java.util.HashMap;

public class Aplikacija {
	private HashMap<String, Korisnik> korisnici = new HashMap<>();
	private ArrayList<Korisnik> korisniciList = new ArrayList<>();
	private HashMap<String, Organizacija> organizacije = new HashMap<>();
	private ArrayList<Organizacija> organizacijeList = new ArrayList<>();
	
	
	public HashMap<String, Korisnik> getKorisnici() {
		return korisnici;
	}
	
	public void setKorisnici(HashMap<String, Korisnik> korisnici) {
		this.korisnici = korisnici;
	}
	
	public ArrayList<Korisnik> getKorisniciList() {
		return korisniciList;
	}
	public void setKorisniciList(ArrayList<Korisnik> korisniciList) {
		this.korisniciList = korisniciList;
	}
	public HashMap<String, Organizacija> getOrganizacije() {
		return organizacije;
	}
	public void setOrganizacije(HashMap<String, Organizacija> organizacije) {
		this.organizacije = organizacije;
	}
	public ArrayList<Organizacija> getOrganizacijeList() {
		return organizacijeList;
	}
	
	public void setOrganizacijeList(ArrayList<Organizacija> organizacijeList) {
		this.organizacijeList = organizacijeList;
	}
	
	
	
	
	

}
