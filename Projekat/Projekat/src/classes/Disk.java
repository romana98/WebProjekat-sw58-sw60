package classes;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import enums.TipDiska;

public class Disk extends Resurs{
	
	private TipDiska tip;
	private int kapacitet;
	private VM mojaVirtualnaMasina;
	
	public Disk()
	{
		super();
		this.setIme("");
		this.kapacitet = 0;
		this.mojaVirtualnaMasina = new VM();
	}
	
	
	
	public Disk(String ime, TipDiska tip, int kapacitet, VM mojaVirtualnaMasina) {
		super();
		this.setIme(ime);
		this.tip = tip;
		this.kapacitet = kapacitet;
		this.mojaVirtualnaMasina = mojaVirtualnaMasina;
		mojaVirtualnaMasina.addDisk(this.getIme());
	}
	public TipDiska getTip() {
		return tip;
	}
	public void setTip(TipDiska tip) {
		this.tip = tip;
	}
	public int getKapacitet() {
		return kapacitet;
	}
	public void setKapacitet(int kapacitet) {
		this.kapacitet = kapacitet;
	}
	public VM getMojaVirtualnaMasina() {
		return mojaVirtualnaMasina;
	}
	public void setMojaVirtualnaMasina(VM mojaVirtualnaMasina) {
		this.mojaVirtualnaMasina = mojaVirtualnaMasina;
	}
	@Override
	public String toString() {
		return "Disk [ime=" + getIme() + ", tip=" + tip + ", kapacitet=" + kapacitet + ", mojaVirtualnaMasina="
				+ mojaVirtualnaMasina + "]";
	}
	
public int getNumberOfHours(Date start_Date, Date finish_Date) {
		
		long dif = 0;
			dif = Math.abs(start_Date.getTime() - finish_Date.getTime());
		
		return (int) (TimeUnit.HOURS.convert(dif,TimeUnit.MILLISECONDS));
	}

	@Override
	public double getCena(Dates date) {
		double cena = 0;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
		Date start = null;
		Date finish = null;
		try {
			start = sdf.parse(date.getStart_Date());
			finish = sdf.parse(date.getFinish_Date());
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		
		int sati = getNumberOfHours(start, finish);
		if(this.tip == TipDiska.HDD)
		{
			cena = 0.1/720 * this.kapacitet * sati;
		}
		else
		{
			cena = 0.3/720 * this.kapacitet * sati;
		}
		return cena;
	}
	
	
	
	
}
