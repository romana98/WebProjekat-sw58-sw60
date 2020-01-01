Vue.component("izmena-bisanje-korisnika", {
	data: function (){
		return {
			kor: null,
			uloge: ['superadmin', 'admin', 'korisnik'],
			validate_name: false,
			validate_lastname: false,
			validate_pass: false
		}
	},
	template:`
	<div >
		<div class="background">
            
            <h1 style="font-size: xx-large; ">Welcome to Cloud</h1>
            <span>
            <button type="submit" v-on:click="logOut()">Log out</button>
            <a href="#/IzProf"> Profil </a>          
           	</span>
            <div class="navbar">
                <div class="dropdown">
                  <button class="dropbtn">Virtual Machines
                  </button>
                  <div class="dropdown-content">
                    <a href="#">View VM's</a>
                    <a href="#">Add VM</a>
                    <a href="#">Delete VM</a>
                    <a href="#">Change VM</a>
                    <a href="#">Filter and Search VM</a>
                  </div>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Organizations 
                    </button>
                    <div class="dropdown-content">
                      <a href="#">View organizations</a>
                      <a href="#">Add organization</a>
                      <a href="#">View/Change organizations</a>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button class="dropbtn">Users
                    </button>
                    <div class="dropdown-content">
                      <a href="#">View users</a>
                      <a href="#">Add user</a>
                      <a href="#">Change user</a>
                      <a href="#">Delete user</a>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button class="dropbtn">Discs
                    </button>
                    <div class="dropdown-content">
                      <a href="#">View discs</a>
                      <a href="#">Change disc</a>
                      <a href="#">Add disc</a>
                      <a href="#">Delete disc</a>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button class="dropbtn">Categories
                    </button>
                    <div class="dropdown-content">
                      <a href="#">View categories</a>
                      <a href="#">Add category</a>
                      <a href="#">Change category</a>
                      <a href="#">Delete category</a>
                    </div>
                  </div>
              </div>
        </div>
	
	
		<table class="poravnaj"  v-if="kor">
			<tr>
				<td>Email:</td>
				<td>{{kor.email}}</td>
			</tr>
			<tr>
				<td>Name:</td>
				<td><input type="text" name="ime" v-model="kor.ime"></input></td>
				<td><label v-if="validate_name">You're missing field!</label></td>
			</tr>
			<tr>
				<td>Lastname:</td>
				<td><input type="text" name="prezime" v-model="kor.prezime"></input></td>
				<td><label v-if="validate_lastname">You're missing field!</label></td>
			</tr>
			<tr>
				<td>Password:</td>
				<td><input type="text" name="lozinka" v-model="kor.lozinka"></input></td>
				<td><label v-if="validate_pass">You're missing field!</label></td>
			</tr>
			<tr>
				<td>Organization:</td>
				<td >{{kor.organizacija.ime}}</td>
			</tr>
			<tr>
				<td>Role:</td>
				<td>
					<select v-model="kor.uloga">
						<option v-for="k in uloge">{{k}}</option>		
					</select>
				</td>
			</tr>
			<tr>
			<td>
				<form id="form" class="login_form" method="post">
					<button class="dugme" type="submit" v-on:click="save(kor)">Save</button>
					<button class="dugme"  type="submit" v-on:click="cancel()">Cancel</button>
					<td><button class="dugme"  type="submit" v-on:click="deleteUser(kor.email)">Delete user</button>
				</td></form>
			</td>
			</tr>
			</table>
	
	</div>
	`	
	,
	methods: {
		save : function(kor)
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			
			if(kor.ime.length === 0 )
			{
				this.validate_name = true;					
			}
			else
			{
				this.validate_name = false;
			}
			
			if(kor.prezime.lenght === 0)
			{
				this.validate_lastname = true;
			}
			else
			{
				this.validate_lastname = false;
			}
			if(kor.lozinka.length === 0)
			{
				this.validate_pass = true; 
			}
			else
			{
				this.validate_pass = false;
			}
			
			axios
			.post('rest/korisnici/Izmena', {"email":''+kor.email, "ime" : ''+ kor.ime, "prezime":''+kor.prezime, "lozinka":''+kor.lozinka, "uloga":''+kor.uloga})
			.then(response => {
				if(response.data.toString() === ("200"))
				{
					toast('User (' + kor.email + ') information is saved!');		
				}
			});
			
			
			
		},
		
		cancel : function()
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			
			if (confirm('Are you sure?') == true) {
				axios
				.post('rest/korisnici/Izmena', {"email":''+"p"})
					.then(response=> {window.location.href = "#/korisnici"})
			}
		},
		
		deleteUser : function(email)
		{
			//toast za potvrdu
			
				//.then(response => (toast())) toast
			
			axios.get('rest/korisnici/getActiveUser')
	        .then(response => {
	      	  if (response.data.uloga === "korisnik"){
	      		toast('Error 400: No action granted!');
	      	  }
	      	  else{
	      		axios
				.post('rest/korisnici/Brisanje', {"email":''+email})
				.then(response=> {
					toast('User (' + kor.email + ') deleted!'),
					window.location.href = "#/korisnici"})
				
	      	  }
	        });
		}
		
	},
	mounted()
	{
		axios
			.get('rest/korisnici/getKorisnik')
			.then(response =>{
				this.kor = response.data
			});
	}
	
});