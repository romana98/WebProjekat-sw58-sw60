package enums;

import com.google.gson.annotations.SerializedName;

public enum Uloga {
	@SerializedName("superadmin")SuperAdmin, 
	@SerializedName("admin")Admin, 
	@SerializedName("korisnik")Korisnik
}
