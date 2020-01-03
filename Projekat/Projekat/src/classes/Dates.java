package classes;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.concurrent.TimeUnit;;

public class Dates {

	String start_Date;
	String finish_Date;
	
	//Ovde nisam siguran da sam dobro razumeo, ali u tekstu zadatka pise
	//da izmenu datuma vrsi samo super admin, i da se datumi ukucavaju prilikom
	//dodavanja virtualne masine. Meni bi bilo logicnije da postoji dugme da se
	//vm pusti u radi pa da se onda napravi ovde samo start date, pa kada se stisne
	//neko dugme da se zaustavi VM da se ovde stavi i finish date i to sve bude upisano
	//u VM. Ali ovako kako oni kazu ima samo zakucane vrednosti :)
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
		SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy HH:mm");
		long dif = 0;
		try {
			dif = Math.abs(sdf.parse(start_Date).getTime() - sdf.parse(finish_Date).getTime());
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return (int) (TimeUnit.HOURS.convert(dif,TimeUnit.MILLISECONDS));
	}
	
	
}
