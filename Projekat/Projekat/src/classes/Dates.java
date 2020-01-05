package classes;

public class Dates {

	private String start_Date;
	private String finish_Date;
	
	
	public Dates() 
	{
		this.start_Date = "";
		this.finish_Date = "";
	}

	public Dates(String start_Date, String finish_Date)
	{
		this.start_Date = start_Date;
		this.finish_Date = finish_Date;	
	}
	public Dates(String start_Date) {
		super();
		this.start_Date = start_Date;
		this.finish_Date = null;
	}
	
	public String getStart_Date() {
		return start_Date;
	}
	
	public void setStart_Date(String start_Date) {
		this.start_Date = start_Date;
	}
	
	public String getFinish_Date() {
		return finish_Date;
	}
	
	public void setFinish_Date(String finish_Date) {
		this.finish_Date = finish_Date;
	}

	@Override
	public String toString() {
		return "Dates [start_Date=" + start_Date + ", finish_Date=" + finish_Date + "]";
	}
	
	
	
}
