package classes;
import java.util.Date;
import java.util.concurrent.TimeUnit;;

public class Dates {

	Date start_Date;
	Date finish_Date;
	
	//Ovde nisam siguran da sam dobro razumeo, ali u tekstu zadatka pise
	//da izmenu datuma vrsi samo super admin, i da se datumi ukucavaju prilikom
	//dodavanja virtualne masine. Meni bi bilo logicnije da postoji dugme da se
	//vm pusti u radi pa da se onda napravi ovde samo start date, pa kada se stisne
	//neko dugme da se zaustavi VM da se ovde stavi i finish date i to sve bude upisano
	//u VM. Ali ovako kako oni kazu ima samo zakucane vrednosti :)
	public Dates(Date start_Date) {
		super();
		this.start_Date = start_Date;
		this.finish_Date = null;
	}
	
	public Date getStart_Date() {
		return start_Date;
	}
	
	public void setStart_Date(Date start_Date) {
		this.start_Date = start_Date;
	}
	
	public Date getFinish_Date() {
		return finish_Date;
	}
	
	public void setFinish_Date(Date finish_Date) {
		this.finish_Date = finish_Date;
	}
	
	public int getNumberOfHours() {
		long dif = Math.abs(start_Date.getTime() - finish_Date.getTime());
		return (int) (TimeUnit.HOURS.convert(dif,TimeUnit.MILLISECONDS));
	}
	
	
}
