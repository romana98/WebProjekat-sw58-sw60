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
	
	public void editVM(VM vm)
	{
		virtualne.put(vm.getIme(), vm);
		int index = -1;
		for (int i = 0; i < virtualneList.size(); i++) {
			if(virtualneList.get(i).getIme().contentEquals(vm.getIme()))
			{
				index = i;
				break;
			}
		}
		virtualneList.get(index).setIme(vm.getIme());
		virtualneList.get(index).setDatumi(vm.getDatumi());
		
	}

	
	public void editDisk(Disk d, String name)
	{
		diskovi.remove(name);
		diskovi.put(d.getIme(), d);
		
		
		int index = -1;
		for (int i = 0; i < diskoviList.size(); i++) {
			if(diskoviList.get(i).getIme().contentEquals(name))
			{
				index = i;
				break;
			}
		}
		
		ArrayList<String> Vd = new ArrayList<String>();
		virtualne.get(d.getMojaVirtualnaMasina().getIme()).setDatumi(d.getMojaVirtualnaMasina().getDatumi());
		for(int i = 0; i < virtualneList.size(); i++)
		{
			if(virtualneList.get(i).getIme().equals(d.getMojaVirtualnaMasina().getIme()))
			{
				for (int j = 0; j < virtualneList.get(i).getDiskovi().size(); j++) {
					if(!virtualneList.get(i).getDiskovi().get(j).equals(name))
					{
						Vd.add(virtualneList.get(i).getDiskovi().get(j));
					}
				}
				
				virtualneList.get(i).setDiskovi(Vd);
				virtualne.get(virtualneList.get(i).getIme()).setDiskovi(Vd);
				break;
			}
		}
		
		diskoviList.get(index).setIme(d.getIme());
		diskoviList.get(index).setKapacitet(d.getKapacitet());
		diskoviList.get(index).setTip(d.getTip());
		diskoviList.get(index).getMojaVirtualnaMasina().setDatumi(d.getMojaVirtualnaMasina().getDatumi());;
		
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
		
		korisniciList.get(index).setEmail(k.getEmail());
		korisniciList.get(index).setIme(k.getIme());
		korisniciList.get(index).setPrezime(k.getPrezime());
		if(k.getUloga() != null)
			korisniciList.get(index).setUloga(k.getUloga());
		korisniciList.get(index).setLozinka(k.getLozinka());
	}
	
	public void removeVM(VM vm)
	{
		int indexK = -1, indexOK = -1, indexO = -1;
		for (int i = 0; i < virtualneList.size(); i++) {
			if(virtualneList.get(i).getIme().equals(vm.getIme()))
			{
				indexK = i;
				break;
			}
		}
		for (int i = 0; i < organizacijeList.size(); i++) {
			
			for (int j = 0; j < organizacijeList.get(i).getResursi().size(); j++)
			{
				if(organizacijeList.get(i).getResursi().get(j).equals(vm.getIme()))
				{
					indexOK = j;
					break;
				}
				
			}
			
			if(indexOK != -1)
			{
				indexO = i;
				break;
			}
		}
		for (int i = 0; i < diskoviList.size(); i++) {
			if(diskoviList.get(i).getMojaVirtualnaMasina().getIme().equals(vm.getIme()))
			{
				diskovi.get(diskoviList.get(i).getIme()).setMojaVirtualnaMasina(new VM());
				diskoviList.get(i).setMojaVirtualnaMasina(new VM());
			}
			
		}
		
		
		virtualneList.remove(indexK);
		virtualne.remove(vm.getIme());
		organizacijeList.get(indexO).getResursi().remove(indexOK);
		organizacije.put(organizacijeList.get(indexO).getIme(), organizacijeList.get(indexO));

	}
	
	public void removeDisk(Disk d)
	{
		int indexD = -1, indexVM = -1, indexVD = -1;
		for (int i = 0; i < diskoviList.size(); i++) {
			if(diskoviList.get(i).getIme().equals(d.getIme()))
			{
				indexD = i;
				break;
			}
		}
		for (int i = 0; i < virtualneList.size(); i++) {
			
			for (int j = 0; j < virtualneList.get(i).getDiskovi().size(); j++)
			{
				if(virtualneList.get(i).getDiskovi().get(j).equals(d.getIme()))
				{
					indexVD = j;
					break;
				}
				
			}
			
			if(indexVD != -1)
			{
				indexVM = i;
				break;
			}
		}
		
		diskoviList.remove(indexD);
		diskovi.remove(d.getIme());
		virtualneList.get(indexVM).getDiskovi().remove(indexVD);
		virtualne.put(virtualneList.get(indexVM).getIme(), virtualneList.get(indexVM));

	}
	
	public void removeKorisnik(Korisnik k)
	{
		int indexK = -1, indexOK = -1, indexO = -1;
		for (int i = 0; i < korisniciList.size(); i++) {
			if(korisniciList.get(i).getEmail().equals(k.getEmail()))
			{
				indexK = i;
				break;
			}
		}
		for (int i = 0; i < organizacijeList.size(); i++) {
			
			for (int j = 0; j < organizacijeList.get(i).getKorisnici().size(); j++)
			{
				if(organizacijeList.get(i).getKorisnici().get(j).equals(k.getEmail()))
				{
					indexOK = j;
					break;
				}
				
			}
			
			if(indexOK != -1)
			{
				indexO = i;
				break;
			}
		}
		korisniciList.remove(indexK);
		korisnici.remove(k.getEmail());
		organizacijeList.get(indexO).getKorisnici().remove(indexOK);
		organizacije.put(organizacijeList.get(indexO).getIme(), organizacijeList.get(indexO));
	}
	
	
	
	//Get/Set by ID
	
	public Disk getDiskoviID(String id) {
		return diskovi.get(id);
	}

	public void setDiskoviID(String id, Disk disk) {
		this.diskovi.put(id, disk);
	}
	
	public VM getVirtualneID(String id) {
		return virtualne.get(id);
	}

	public void setVirtualne(String id, VM vm) {
		this.virtualne.put(id, vm);
	}
	
	public KategorijaVM getKategorijeID(String id) {
		return kategorije.get(id);
	}

	public void setKategorijeID(String id, KategorijaVM kategorija) {
		this.kategorije.put(id, kategorija );
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
	
	public ArrayList<KategorijaVM> getKategorijeList() {
		return kategorijeList;
	}

	public void setKategorijeList(ArrayList<KategorijaVM> kategorijeList) {
		this.kategorijeList = kategorijeList;
	}
	
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

	public ArrayList<VM> getVirtualneList() {
		return virtualneList;
	}

	public void setVirtualneList(ArrayList<VM> virtualneList) {
		this.virtualneList = virtualneList;
	}


	public ArrayList<Disk> getDiskoviList() {
		return diskoviList;
	}

	public void setDiskoviList(ArrayList<Disk> diskoviList) {
		this.diskoviList = diskoviList;
	}

	
	
	
	
	
	
	

}
