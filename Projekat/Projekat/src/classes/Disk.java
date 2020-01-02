package classes;

import enums.TipDiska;

public class Disk extends Resurs{
	
	TipDiska tip;
	int kapacitet;
	VM mojaVirtualnaMasina;
	
	public Disk()
	{
		super();
		this.ime = "none";
		this.kapacitet = 0;
		this.mojaVirtualnaMasina = new VM();
	}
	
	
	
	public Disk(String ime, TipDiska tip, int kapacitet, VM mojaVirtualnaMasina) {
		super();
		this.ime = ime;
		this.tip = tip;
		this.kapacitet = kapacitet;
		this.mojaVirtualnaMasina = mojaVirtualnaMasina;
		mojaVirtualnaMasina.addDisk(this.ime);
	}
	public String getIme() {
		return ime;
	}
	public void setIme(String ime) {
		this.ime = ime;
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
		return "Disk [ime=" + ime + ", tip=" + tip + ", kapacitet=" + kapacitet + ", mojaVirtualnaMasina="
				+ mojaVirtualnaMasina + "]";
	}
	
	
	
	
}
