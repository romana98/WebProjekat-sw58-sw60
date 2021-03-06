package classes;

public class KategorijaVM {
	private String ime;
	private int br_jezgara;
	private int RAM;
	private int GPU;
	
	public KategorijaVM()
	{
		this.ime = "";
		this.br_jezgara = 0;
		this.RAM = 0;
		this.GPU = 0;
	}
	
	public KategorijaVM(String ime, int br_jezgara, int rAM, int gPU) {
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
	public int getGPU() {
		return GPU;
	}
	public void setGPU(int gPU) {
		GPU = gPU;
	}
	@Override
	public String toString() {
		return "KategorijaVM [ime=" + ime + ", br_jezgara=" + br_jezgara + ", RAM=" + RAM + ", GPU=" + GPU + "]";
	}
	
	
}
