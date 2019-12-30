package classes;

import java.util.ArrayList;
import java.util.HashMap;

public class Aplikacija {
	private HashMap<String, Korisnik> korisnici = new HashMap<>();
	private ArrayList<Korisnik> korisniciList = new ArrayList<>();
	private HashMap<String, Organizacija> organizacije = new HashMap<>();
	private ArrayList<Organizacija> organizacijeList = new ArrayList<>();

	
	public Aplikacija() {
		super();
	}

	public void popuniMape() {
		
		
		if(korisniciList != null){
			for (int i = 0; i < korisniciList.size(); i++) {
						korisnici.put(korisniciList.get(i).getEmail(), korisniciList.get(i));
			}
		}
		else{
			korisniciList = new ArrayList<Korisnik>();
		}

		if(organizacijeList != null){
			for (int i = 0; i < organizacijeList.size(); i++) {
				organizacije.put(organizacijeList.get(i).getIme(), organizacijeList.get(i));
			}
		}
		else{
			organizacijeList = new ArrayList<Organizacija>();
		}
		// TODO za ostale entitete
		
	}
	
	public void editOrganizacija(Organizacija o)
	{
		organizacije.put(o.getIme(), o);
		int index = organizacijeList.indexOf(o);
		organizacijeList.set(index, o);
		
	}
	
	public void editKorisnik(Korisnik k)
	{
		
		korisnici.put(k.getEmail(), k);
		
		int index = -1;
		for (int i = 0; i < korisniciList.size(); i++) {
			if(korisniciList.get(i).getEmail().equals(k.getEmail()))
			{
				index = i;
				break;
			}
		}
		korisniciList.get(index).setIme(k.getIme());
		korisniciList.get(index).setPrezime(k.getPrezime());
		korisniciList.get(index).setUloga(k.getUloga());
	}
	
	public void removeKorisnik(Korisnik k)
	{
		int index = -1;
		for (int i = 0; i < korisniciList.size(); i++) {
			if(korisniciList.get(i).getEmail().equals(k.getEmail()))
			{
				index = i;
				break;
			}
		}
		korisniciList.remove(index);
		korisnici.remove(k.getEmail());
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
