Vue.component("izmena-profila", {
	data: function (){
		return {
		kor: null,
		loz: '',
		uloge: ['superadmin', 'admin', 'korisnik'],
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
					<button class="dugme" type="submit" v-on:click="save(kor, loz)">Save</button>
					<button class="dugme"  type="submit" v-on:click="cancel()">Cancel</button>
				</form>
			</td>
			</tr>
		</table>
	</div>
	`	
	,
	methods: {
		save : function(kor, loz)
		{
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
				});
			
		},
		
		cancel : function()
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			
			if (confirm('Are you sure?') == true) {
				axios
				.post('rest/korisnici/Izmena', {"email":''+"p"})
					.then(response=> {window.location.href = "#/VMView"})
			}
			
		},
		
		logOut : function()
		{
			
			if (confirm('Are you sure?') == true) {
				axios.get('rest/logOut')
					.then(response=> {window.location.href = "#/login"})
			}
			
		}


	},
	mounted()
	{
		axios
			.get('rest/korisnici/getActiveUser')
			.then(response =>{
				this.kor = response.data
			});
	}
	
});