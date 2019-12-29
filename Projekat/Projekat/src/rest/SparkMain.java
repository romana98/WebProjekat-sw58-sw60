package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import spark.Request;
import spark.Session;

import java.io.File;
import java.io.IOException;

import com.google.gson.Gson;

import classes.Aplikacija;
import classes.Files;

public class SparkMain {
	
	private static Gson g = new Gson();
	private static Aplikacija app;

	public static void main(String[] args) throws IOException {
		port(8080);
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		app = Files.Ucitavanje();
		
		
		get("/test", (req, res) -> {
			return "Works";
		});
		
		
		get("/rest/organizacije/getOrganizacija", (req, res) -> {
			res.type("application/json");
			return g.toJson(app.getOrganizacijaID(req.params("ime")));
		});

	}

}
