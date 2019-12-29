package classes;

import java.util.ArrayList;
import java.util.HashMap;

public class Aplikacija {
	private HashMap<String, Korisnik> korisnici = new HashMap<>();
	private ArrayList<Korisnik> korisniciList = new ArrayList<>();
	private HashMap<String, Organizacija> organizacije = new HashMap<>();
	private ArrayList<Organizacija> organizacijeList = new ArrayList<>();
	
	public void popuniMape() {
		
		for (int i = 0; i < korisniciList.size(); i++) {
			korisnici.put(korisniciList.get(i).getEmail(), korisniciList.get(i));
		}
		
		for (int i = 0; i < organizacijeList.size(); i++) {
			organizacije.put(organizacijeList.get(i).getIme(), organizacijeList.get(i));
		}
		// TODO za ostale entitete
		
	}
	
	//Get/Set by ID
	
	public Korisnik getKorisnikID(String id) {
		return korisnici.get(id);
	}
	
	public void setKorisnikID(String id, Korisnik korisnik) {
		this.korisnici.put(id, korisnik);
	}
	

	public Organizacija getOrganizacijaID(String id) {
		return organizacije.get(id);
	}
	public void setOrganizacijaID(String id, Organizacija organizacija) {
		this.organizacije.put(id, organizacija);
	}
	
	
	//Getters and Setters for ArrayList
	
	public ArrayList<Korisnik> getKorisniciList() {
		return korisniciList;
	}
	public void setKorisniciList(ArrayList<Korisnik> korisniciList) {
		this.korisniciList = korisniciList;
	}
	public ArrayList<Organizacija> getOrganizacijeList() {
		return organizacijeList;
	}
	
	public void setOrganizacijeList(ArrayList<Organizacija> organizacijeList) {
		this.organizacijeList = organizacijeList;
	}

	
	
	
	
	
	

}
