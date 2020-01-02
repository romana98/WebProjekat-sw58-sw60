package classes;

public class KategorijaVM {
	String ime;
	int br_jezgara;
	int RAM;
	String GPU;
	
	public KategorijaVM()
	{
		this.ime = "none";
		this.br_jezgara = 0;
		this.RAM = 0;
		this.GPU = "none";
	}
	
	public KategorijaVM(String ime, int br_jezgara, int rAM, String gPU) {
		super();
		this.ime = ime;
		this.br_jezgara = br_jezgara;
		RAM = rAM;
		GPU = gPU;
	}
	public String getIme() {
		return ime;
	}
	public void setIme(String ime) {
		this.ime = ime;
	}
	public int getBr_jezgara() {
		return br_jezgara;
	}
	public void setBr_jezgara(int br_jezgara) {
		this.br_jezgara = br_jezgara;
	}
	public int getRAM() {
		return RAM;
	}
	public void setRAM(int rAM) {
		RAM = rAM;
	}
	public String getGPU() {
		return GPU;
	}
	public void setGPU(String gPU) {
		GPU = gPU;
	}
	@Override
	public String toString() {
		return "KategorijaVM [ime=" + ime + ", br_jezgara=" + br_jezgara + ", RAM=" + RAM + ", GPU=" + GPU + "]";
	}
	
	
}
