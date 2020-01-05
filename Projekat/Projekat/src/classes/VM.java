package classes;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class VM extends Resurs{
	private KategorijaVM kategorija;
	
	private ArrayList<Dates> datumi;
	private ArrayList<String> diskovi;
	
	public VM()
	{
		super();
		this.setIme("");
		this.kategorija = new KategorijaVM();
		this.datumi = new ArrayList<Dates>();
		this.diskovi = new ArrayList<String>();
	}
	
	public VM(VM vm) {
		this.setIme(vm.getIme());
		this.kategorija = vm.kategorija;
		this.datumi = vm.datumi;
		this.diskovi = vm.diskovi;
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
	public void setDatumi(List<Dates> list) {
		this.datumi = (ArrayList<Dates>) list;
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
	public int getNumberOfHours(Date start_Date, Date finish_Date) {
		
		long dif = 0;
			dif = Math.abs(start_Date.getTime() - finish_Date.getTime());
		int h = Math.round(TimeUnit.HOURS.convert(dif,TimeUnit.MILLISECONDS));
		return h;
	}

	@Override
	public double getCena(Dates date) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
		double cena = 0;
		double suma = 0;
		try
		{
			Date start_date = sdf.parse(date.getStart_Date());
			Date finish_date = sdf.parse(date.getFinish_Date());
			Date begin = null, end = null;
			
			for (int i = 0; i < this.datumi.size(); i++) {
				Date start = sdf.parse(this.datumi.get(i).getStart_Date());
				Date finish = null;
				if(this.datumi.get(i).getFinish_Date().equals(""))
				{
					finish = finish_date;
				}
				else
				{
					finish = sdf.parse(this.datumi.get(i).getFinish_Date());
				}
				
				
				if(start.before(start_date) && finish.after(start_date))
				{
					begin = start_date;
					if(finish.after(finish_date))
					{ end = finish_date;}
					else
					{ end = finish;}
				}
				else if(start.after(start_date)) 
				{
					begin = start;
					if(finish.after(finish_date))
					{ end = finish_date;}
					else
					{ end = finish;}
					
				}
				else if(start.after(finish_date))
				{
					continue;
				}
				if(begin != null && end != null)
				{
					int h = getNumberOfHours(begin, end);
					cena = (((double)25/720 * this.kategorija.getBr_jezgara())  + ((double)15/720 * this.kategorija.getRAM()) + ((double)1/720 * this.kategorija.getGPU())) * h;
					
					
					suma += cena;
				}
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		 BigDecimal bd = new BigDecimal(suma).setScale(2, RoundingMode.HALF_UP);
	     double cal = bd.doubleValue();
		return cal;
	}
}
