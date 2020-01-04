Vue.component("izmena-bisanje-korisnika", {
	data: function (){
		return {
			kor: null,
			active: null,
			uloge: ['admin', 'korisnik'],
			validate_name: false,
			validate_lastname: false,
			validate_pass: false,
			email:''
		}
	},
	template:`
	<div >
	<div class="background" v-if="active">
             <div style="text-align: right; font-size: large;">
              <a href="#/profil" style="width: 10px;height: 5px; margin: 5px;"> Profil </a>
               <a href="#/login" v-on:click="logOut()" style="width: 10px;height: 5px; margin: 5px;"> Log out </a>
            </div>
            <h1 style="font-size: xx-large; ">Welcome to Cloud</h1>
            <div class="navbar">
                <div class="dropdown">
                  <button class="dropbtn">Virtual Machines
                  </button>
                  <div class="dropdown-content">
                    <a href="#/VMView">View VM's</a>
                  </div>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Organizations 
                    </button>
                    <div class="dropdown-content">
                      <a href="#/OrganizationView">View organizations</a>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button class="dropbtn">Users
                    </button>
                    <div class="dropdown-content">
                      <a href="#/UserView">View users</a>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button class="dropbtn">Discs
                    </button>
                    <div class="dropdown-content">
                      <a href="#/DiscView">View discs</a>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button class="dropbtn">Categories
                    </button>
                    <div class="dropdown-content">
                      <a href="#/CategoryView">View categories</a>
                    </div>
                  </div>
                  <div class="dropdown" v-if="active.uloga === 'admin'">
                    <button class="dropbtn">Monthly receipt
                    </button>
                    <div class="dropdown-content">
                      <a href="#/ChooseDates">Choose dates</a>
                    </div>
                  </div>
              </div>           
        </div>
		<form id="form" class="login_form" method="post">
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
				<button class="dugme" type="submit" v-on:click="save(kor)">Save</button>
			</td>
			<td>
				<button class="dugme"  type="submit" v-on:click="cancel()">Cancel</button>
			</td>
			</tr>
			<tr>	
			<td>
				<button class="dugme"  type="submit" v-on:click="deleteUser(kor.email)">Delete user</button>
			</td>
			</tr>
			</table>
			</form>
	
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
					window.location.href = "#/UserView"
				}
			});
			
			
			
		},
		
		cancel : function()
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			
			if (confirm('If you go back, your changes won\'t be saved, go back?') == true) {
				axios
				.post('rest/korisnici/Izmena', {"email":''+"p"})
					.then(response=> {window.location.href = "#/UserView"})
			}
		},
		
		deleteUser : function(email)
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			
			axios.get('rest/korisnici/getActiveUser')
	        .then(response => {
	      	  if (response.data.email === email){
	      		toast('Error 400: Can\'t delete user!');
	      	  }
	      	  else{
	      		axios
				.post('rest/korisnici/Brisanje', {"email":''+email})
				.then(response=> {
					toast('User (' + email + ') deleted!'),
					window.location.href = "#/UserView"})
				
	      	  }
	        });
		}
		
	},
	
	logOut : function()
	{
		
		if (confirm('Are you sure?') == true) {
			axios.get('rest/logOut')
		}
		
	},
	mounted()
	{
		if(this.$route.params.email)
		{
			this.email = this.$route.params.email;
		}
		axios
			.get('rest/korisnici/getKorisnik', { params: {"email":''+this.email}})
			.then(response =>{
				this.kor = response.data
			});
		axios
		.get('rest/korisnici/getActiveUser')
		.then(response =>{
			this.active = response.data
		});
	}
	
});