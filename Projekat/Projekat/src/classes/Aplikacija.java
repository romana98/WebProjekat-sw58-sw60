package classes;

import java.util.ArrayList;
import java.util.HashMap;

public class Aplikacija {
	private HashMap<String, Korisnik> korisnici = new HashMap<>();
	private ArrayList<Korisnik> korisniciList = new ArrayList<>();
	private HashMap<String, Organizacija> organizacije = new HashMap<>();
	private ArrayList<Organizacija> organizacijeList = new ArrayList<>();
	private HashMap<String, KategorijaVM> kategorije = new HashMap<String, KategorijaVM>();
	private ArrayList<KategorijaVM> kategorijeList = new ArrayList<KategorijaVM>();
	private HashMap<String, VM> virtualne = new HashMap<String, VM>();
	private ArrayList<VM> virtualneList = new ArrayList<VM>();
	private HashMap<String, Disk> diskovi = new HashMap<String, Disk>();
	private ArrayList<Disk> diskoviList = new ArrayList<Disk>();
	
	public Aplikacija() {
		super();
	}

	public void popuniMape() {
		
		//za korisnike
		if(korisniciList != null){
			for (int i = 0; i < korisniciList.size(); i++) {
						korisnici.put(korisniciList.get(i).getEmail(), korisniciList.get(i));
			}
		}
		else{
			korisniciList = new ArrayList<Korisnik>();
		}
		//za organizacije
		if(organizacijeList != null){
			for (int i = 0; i < organizacijeList.size(); i++) {
				organizacije.put(organizacijeList.get(i).getIme(), organizacijeList.get(i));
			}
		}
		else{
			organizacijeList = new ArrayList<Organizacija>();
		}
		//za kategorije
		if(kategorijeList != null){
			for (int i = 0; i < kategorijeList.size(); i++) {
						kategorije.put(kategorijeList.get(i).getIme(), kategorijeList.get(i));
			}
		}
		else{
			kategorijeList = new ArrayList<KategorijaVM>();
		}
		//za diskove
		if(diskoviList != null){
			for (int i = 0; i < diskoviList.size(); i++) {
						diskovi.put(diskoviList.get(i).getIme(), diskoviList.get(i));
			}
		}
		else{
			diskoviList = new ArrayList<Disk>();
		}
		//za VM
		if(virtualneList != null){
			for (int i = 0; i < virtualneList.size(); i++) {
						virtualne.put(virtualneList.get(i).getIme(), virtualneList.get(i));
			}
		}
		else{
			virtualneList = new ArrayList<VM>();
		}
		
		
		// TODO za ostale entitete
		
	}
	
	public void editOrganizacija(Organizacija o)
	{
		organizacije.put(o.getIme(), o);
		int index = -1;
		for (int i = 0; i < organizacijeList.size(); i++) {
			if(organizacijeList.get(i).getIme().contentEquals(o.getIme()))
			{
				index = i;
				break;
			}
		}
		organizacijeList.get(index).setIme(o.getIme());
		organizacijeList.get(index).setOpis(o.getOpis());
		organizacijeList.get(index).setLogo(o.getLogo());
		
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
		korisniciList.get(index).setLozinka(k.getLozinka());
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
	
	public HashMap<String, KategorijaVM> getKategorije() {
		return kategorije;
	}

	public void setKategorije(HashMap<String, KategorijaVM> kategorije) {
		this.kategorije = kategorije;
	}

	public ArrayList<KategorijaVM> getKategorijeList() {
		return kategorijeList;
	}

	public void setKategorijeList(ArrayList<KategorijaVM> kategorijeList) {
		this.kategorijeList = kategorijeList;
	}

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

	public HashMap<String, VM> getVirtualne() {
		return virtualne;
	}

	public void setVirtualne(HashMap<String, VM> virtualne) {
		this.virtualne = virtualne;
	}

	public ArrayList<VM> getVirtualneList() {
		return virtualneList;
	}

	public void setVirtualneList(ArrayList<VM> virtualneList) {
		this.virtualneList = virtualneList;
	}

	public HashMap<String, Disk> getDiskovi() {
		return diskovi;
	}

	public void setDiskovi(HashMap<String, Disk> diskovi) {
		this.diskovi = diskovi;
	}

	public ArrayList<Disk> getDiskoviList() {
		return diskoviList;
	}

	public void setDiskoviList(ArrayList<Disk> diskoviList) {
		this.diskoviList = diskoviList;
	}

	
	
	
	
	
	
	

}
