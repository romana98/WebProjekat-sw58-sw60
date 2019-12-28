package classes;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JSON {
	private ObjectMapper mapper = new ObjectMapper();
	
	public Aplikacija Ucitavanje()
	{
		Aplikacija app = new Aplikacija();
		
		try {
		 app.setKorisnici(mapper.readValue(new File("./files/korisnici.json"), new TypeReference<ArrayList<Korisnik>>(){}));
		 app.setOrganizacije(mapper.readValue(new File("./files/korisnici.json"), new TypeReference<ArrayList<Organizacija>>(){}));
		 //TODO dodati za ostale entitete
		
		} catch (IOException e) {
			System.out.println("Error pri ucitavanju iz fajlova!");
		}
		
		return app;
	}
	
	public void UpisKorisnik(ArrayList<Korisnik> korisnici)
	{
		try {
			mapper.writeValue(new File("./files/organizacije.json"), korisnici);
		
		} catch (IOException e) {
			System.out.println("Error pri upisu u fajl korisnika!");
		}
	}
	
	public void UpisOrganizacija(ArrayList<Organizacija> organizacije)
	{
		try {
			mapper.writeValue(new File("./files/organizacije.json"), organizacije);
		
		} catch (IOException e) {
			System.out.println("Error pri upisu u fajl organizacija!");
		}
	}
	
	//TODO upis za ostale entitete
	public void UpisVM()
	{
		
	}
	
	public void UpisDisk()
	{
		
	}
	
	public void UpisKategorija()
	{
		
	}
	
}
