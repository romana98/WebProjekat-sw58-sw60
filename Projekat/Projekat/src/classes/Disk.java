package classes;

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

	@Override
	public double getCena(Dates date) {
		double cena = 0;
		int sati = date.getNumberOfHours();
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
