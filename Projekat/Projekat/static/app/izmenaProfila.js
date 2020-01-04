Vue.component("izmena-profila", {
	data: function (){
		return {
		active: null,
		kor: null,
		loz: '',
		validate_email: false,
		validate_loz: false,
		validate_loz_nd: false,
		validate_name: false,
		validate_lastname: false,
		validate_match: false,
		validate_email_form: false,
		validate_email_exist: false
		}
	},
	template:`
	<div>
	
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
                      <a href="#DiscView">View discs</a>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button class="dropbtn">Categories
                    </button>
                    <div class="dropdown-content">
                      <a href="#/CategoryView">View categories</a>
                    </div>
                  </div>
                  <div class="dropdown" v-if="active === 'admin'">
                    <button class="dropbtn">Monthly receipt
                    </button>
                    <div class="dropdown-content">
                      <a href="#/ChooseDates">Choose dates</a>
                    </div>
                  </div>
              </div>           
        </div>
        
		<form id="form" class="login_form" method="post">
		<table class="poravnaj" v-if="kor">
			<tr>
				<td>Email:</td>
				<td><input v-model=kor.email></input></td>
				<td><label v-if="validate_email">You're missing field!</label>
				<label v-else-if="validate_email_form">Not correct form of email!</label>
				<label v-else-if="validate_email_exist">Email already taken!</label></td>
			</tr>
			<tr>
				<td>Name:</td>
				<td><input v-model=kor.ime></input></td>
			<td><label v-if="validate_name">You're missing field!</label></td>
			</tr>
			<tr>
				<td>LastName:</td>
				<td><input v-model=kor.prezime></input></td>
				<td><label v-if="validate_lastname">You're missing field!</label></td>
			</tr>
			<tr>
				<td>Password:</td>
				<td><input v-model=kor.lozinka></input></td>
				<td><label v-if="validate_loz">You're missing field!</label>
				<label v-else-if="validate_match">Two password fields don't match!</label></td>
			</tr>
			<tr>
				<td>Password 2nd time:</td>
				<td><input v-model=loz></input></td>
				<td><label v-if="validate_loz_nd">You're missing field!</label></td>
			</tr>
			<tr>
				<td>Organization:</td>
				<td>{{kor.organizacija.ime}}</td>
				<td v-if="kor.uloga==='admin'"><button class="dugme" type="submit" v-on:click="goToOrganization(kor.organizacija)">Organization</button></td>
			</tr>
			<tr>
				<td>Role:</td>
				<td >{{kor.uloga}}</td>
			</tr>
			<tr>
			<td>
				<button class="dugme" type="submit" v-on:click="save(kor, loz)">Save</button>
			</td>
			<td>
				<button class="dugme"  type="submit" v-on:click="cancel()">Cancel</button>	
			</td>
			</tr>
		</table>
		</form>
	</div>
	`	
	,
	methods: {
		save : function(kor, loz)
		{
			this.validate_email_exist = false;
			document.getElementById("form").setAttribute("onsubmit","return false;");
			if(kor.email.length === 0)
			{
				this.validate_email = true; 
			}
			else
			{
				this.validate_email = false; 
			}
			
			if(kor.lozinka.length === 0)
			{
				this.validate_loz = true; 
			}
			else
			{
				this.validate_loz = false;
			}
			
			if(loz!== kor.lozinka && loz!== '')
			{
				this.validate_match = true;
			}
			else
			{
				this.validate_match = false;
			}
			
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
			
			if(!kor.email.includes('@') || !kor.email.includes('.'))
			{
				this.validate_email_form = true; 
			}
			else
			{
				this.validate_email_form = false; 
			}
			
			axios.post('rest/korisnici/Izmena', {"email":''+kor.email, "ime" : ''+ kor.ime, "prezime":''+kor.prezime, "lozinka":''+kor.lozinka})
				.then(response => {
					if(response.data.toString() === ("200") && this.validate_match === false)
					{
						toast('User (' + kor.email + ') information is saved!');		
					}
					else if(response.data.toString() === ("202"))
					{
						this.validate_email_exist = true; 
					}
				});
			
		},
		
		cancel : function()
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			
			if (confirm('If you go back, your changes won\'t be saved, go back?') == true) {
				axios
				.post('rest/korisnici/Izmena', {"email":''+"p"})
					.then(response=> {window.location.href = "#/VMView"})
			}
			
		},
		
		goToOrganization(org)
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			
			if (confirm('If you go to organization, your changes here won\'t be saved, go to organization?') == true) {
				this.$router.push({ name: 'organization', params: { ime: org.ime } });
			}
			
		},
		
		logOut : function()
		{
			
			if (confirm('Are you sure?') == true) {
				axios.get('rest/logOut')
			}
			
		}


	},
	mounted()
	{
		axios
			.get('rest/korisnici/getActiveUser')
			.then(response =>{
				this.kor = response.data,
				this.active = this.kor.uloga
			});
	}
	
});