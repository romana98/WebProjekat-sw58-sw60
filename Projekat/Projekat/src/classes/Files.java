package classes;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

public class Files {
	private Gson gson = new Gson();
	
	public Aplikacija Ucitavanje()
	{
		Aplikacija app = new Aplikacija();
		
		try {
			
		app.setKorisniciList(gson.fromJson(new FileReader("./files/korisnici.json"), new TypeToken<ArrayList<Korisnik>>(){}.getType()));
		app.setOrganizacijeList(gson.fromJson(new FileReader("./files/organizacije.json"), new TypeToken<ArrayList<Organizacija>>(){}.getType()));
		//TODO dodati za ostale entitete
		
		
		System.out.println(app.getKorisniciList().get(0));
		
		} catch (IOException e) {
			System.out.println("Error pri ucitavanju iz fajlova!");
		}
		
		return app;
	}
	
	public void UpisKorisnik(ArrayList<Korisnik> korisnici)
	{
		try (Writer writer = new FileWriter("./files/korisnici.json")) {
		    gson = new GsonBuilder().create();
		    gson.toJson(korisnici, writer);
		
		} catch (IOException e) {
			System.out.println("Error pri upisu u fajl korisnika!");
		}
	}
	
	public void UpisOrganizacija(ArrayList<Organizacija> organizacije)
	{
		try (Writer writer = new FileWriter("./files/organizacije.json")) {
		    gson = new GsonBuilder().create();
		    gson.toJson(organizacije, writer);
		
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
