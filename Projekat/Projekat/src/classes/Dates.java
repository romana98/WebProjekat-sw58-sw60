package classes;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.concurrent.TimeUnit;;

public class Dates {

	private String start_Date;
	private String finish_Date;
	
	
	public Dates() {}

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
	
	public int getNumberOfHours() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
		long dif = 0;
		try {
			dif = Math.abs(sdf.parse(start_Date).getTime() - sdf.parse(finish_Date).getTime());
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return (int) (TimeUnit.HOURS.convert(dif,TimeUnit.MILLISECONDS));
	}

	@Override
	public String toString() {
		return "Dates [start_Date=" + start_Date + ", finish_Date=" + finish_Date + "]";
	}
	
	
	
}
