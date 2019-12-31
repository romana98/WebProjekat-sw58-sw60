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
	private static Gson gson = new Gson();
	
	public static Aplikacija Ucitavanje()
	{
		Aplikacija app = new Aplikacija();
		
		try {
			
		app.setKorisniciList(gson.fromJson(new FileReader("./files/korisnici.json"), new TypeToken<ArrayList<Korisnik>>(){}.getType()));
		app.setOrganizacijeList(gson.fromJson(new FileReader("./files/organizacije.json"), new TypeToken<ArrayList<Organizacija>>(){}.getType()));
		app.setKategorijeList(gson.fromJson(new FileReader("./files/kategorije.json"), new TypeToken<ArrayList<KategorijaVM>>(){}.getType()));
		app.setVirtualneList(gson.fromJson(new FileReader("./files/virtualneMasine.json"), new TypeToken<ArrayList<VM>>(){}.getType()));
		app.setDiskoviList(gson.fromJson(new FileReader("./files/diskovi.json"), new TypeToken<ArrayList<Disk>>(){}.getType()));	
		
		} catch (IOException e) {
			System.out.println("Error pri ucitavanju iz fajlova!");
		}
		
		return app;
	}
	
	public static void UpisKorisnik(ArrayList<Korisnik> korisnici)
	{
		try (Writer writer = new FileWriter("./files/korisnici.json")) {
		    gson = new GsonBuilder().create();
		    gson.toJson(korisnici, writer);
		
		} catch (IOException e) {
			System.out.println("Error pri upisu u fajl korisnika!");
		}
	}
	
	public static void UpisOrganizacija(ArrayList<Organizacija> organizacije)
	{
		try (Writer writer = new FileWriter("./files/organizacije.json")) {
		    gson = new GsonBuilder().create();
		    gson.toJson(organizacije, writer);
		
		} catch (IOException e) {
			System.out.println("Error pri upisu u fajl organizacija!");
		}
	}
	
	//TODO upis za ostale entitete
	public static void UpisVM()
	{
		
	}
	
	public static void UpisDisk()
	{
		
	}
	
	public static void UpisKategorija()
	{
		
	}
	
}
