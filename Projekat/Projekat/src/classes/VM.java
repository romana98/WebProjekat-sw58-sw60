package classes;

import java.util.ArrayList;
import java.util.List;

public class VM extends Resurs{
	private KategorijaVM kategorija;
	
	private ArrayList<Dates> datumi;
	private ArrayList<String> diskovi;
	
	public VM()
	{
		super();
		this.setIme("none");
		this.kategorija = new KategorijaVM();
		this.datumi = new ArrayList<Dates>();
		this.diskovi = new ArrayList<String>();
	}
	
	
	
	public VM(String ime, KategorijaVM kategorija) {
		super();
		this.setIme(ime);
		this.kategorija = kategorija;
		this.datumi = new ArrayList<Dates>();
		this.diskovi = new ArrayList<String>();
	}
	
	public void addDate(Dates date) {
		this.datumi.add(date);
	}
	
	public void addDisk(String disk) {
		this.diskovi.add(disk);
	}
	
	public KategorijaVM getKategorija() {
		return kategorija;
	}
	public void setKategorija(KategorijaVM kategorija) {
		this.kategorija = kategorija;
	}
	public List<Dates> getDatumi() {
		return datumi;
	}
	public void setDatumi(ArrayList<Dates> datumi) {
		this.datumi = datumi;
	}
	public ArrayList<String> getDiskovi() {
		return this.diskovi;
	}
	public void setDiskovi(ArrayList<String> diskovi) {
		this.diskovi = diskovi;
	}

	@Override
	public String toString() {
		return "VM [ime=" + getIme() + ", kategorija=" + kategorija + ", datumi=" + datumi + ", diskovi=" + diskovi + "]";
	}
	
	
	
}
