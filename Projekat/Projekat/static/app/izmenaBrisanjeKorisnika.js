Vue.component("izmena-brisanje-korisnika", {
	data: function (){
		return {
			kor: null,
			active: null,
			uloge: ['admin', 'korisnik'],
			validate_name: false,
			validate_name_let: false,
			validate_lastname: false,
			validate_lastname_let: false,
			validate_pass: false,
			email:''
		}
	},
	template:`
	<div >
	<div class="background" v-if="active">
             <div style="text-align: right; font-size: large;">
              <a href="#/profil" style="width: 10px;height: 5px; margin: 5px;" v-on:click="a_clicked($event)"> Profil </a>
               <a href="/" v-on:click="logOut($event)" style="width: 10px;height: 5px; margin: 5px;"> Log out </a>
            </div>
            <h1 style="font-size: xx-large; ">Welcome to Cloud</h1>
            <div class="navbar">
                <div class="dropdown">
                  <button class="dropbtn">Virtual Machines
                  </button>
                  <div class="dropdown-content">
                    <a href="#/VMView" v-on:click="a_clicked($event)">View VM's</a>
                  </div>
                </div>
                <div class="dropdown">
                    <button v-if="active_superadmin" class="dropbtn">Organizations 
                    </button>
                    <div class="dropdown-content">
                      <a href="#/OrganizationView" v-on:click="a_clicked($event)">View organizations</a>
                    </div>
                  </div>
                  <div class="dropdown" v-if="active.uloga !== 'korisnik'">
                    <button class="dropbtn">Users
                    </button>
                    <div class="dropdown-content">
                      <a href="#/UserView" v-on:click="a_clicked($event)">View users</a>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button class="dropbtn">Discs
                    </button>
                    <div class="dropdown-content">
                      <a href="#/DiscView" v-on:click="a_clicked($event)">View discs</a>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button v-if="active_superadmin" class="dropbtn">Categories
                    </button>
                    <div class="dropdown-content">
                      <a href="#/CategoryView" v-on:click="a_clicked($event)">View categories</a>
                    </div>
                  </div>
                  <div class="dropdown" v-if="active.uloga === 'admin'">
                    <button class="dropbtn">Monthly receipt
                    </button>
                    <div class="dropdown-content">
                      <a href="#/MonthlyReceipt">Get Monthly Receipt</a>
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
				<td><label v-if="validate_name">You're missing field!</label>
				<label v-else-if="validate_name_let">Must conatin only letters!</label></td>
			</tr>
			<tr>
				<td>Lastname:</td>
				<td><input type="text" name="prezime" v-model="kor.prezime"></input></td>
				<td><label v-if="validate_lastname">You're missing field!</label>
				<label v-else-if="validate_lastname_let">Must conatin only letters!</label></td>
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
				<button class="dugme"  type="submit" v-on:click="cancel()">Back</button>
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
		a_clicked(event)
		{
			
			if (confirm('If you go back, your changes won\'t be saved, go back?') == false) {
				event.preventDefault()
			}
		},
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
			if(!kor.ime.match(/^[A-Za-z]+$/))
			{
				this.validate_name_let = true;					
			}
			else
			{
				this.validate_name_let = false;
			}
			
			if(kor.prezime.lenght === 0)
			{
				this.validate_lastname = true;
			}
			else
			{
				this.validate_lastname = false;
			}
			if(!kor.prezime.match(/^[A-Za-z]+$/))
			{
				this.validate_lastname_let = true;					
			}
			else
			{
				this.validate_lastname_let = false;
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
			.post('rest/korisnici/Izmena', {"email":''+kor.email, "ime" : ''+ kor.ime, "prezime":''+kor.prezime, "lozinka":''+kor.lozinka, "uloga":''+kor.uloga}, {params:{emailOld:''+this.email}})
			.then(response => {
					toast('User (' + kor.email + ') information is saved!');
					this.$router.push({ name: 'UserView' })
			}, error =>{});
			
			
			
		},
		
		cancel : function()
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			
			if (confirm('If you go back, your changes won\'t be saved, go back?') == true){
				this.$router.push({ name: 'UserView' })
			}
			
		},
		
		deleteUser : function(email)
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			
			axios.get('rest/korisnici/getActiveUser')
	        .then(response => {
	      	  if (response.data.email === email){
	      		toast('Can\'t delete user!');
	      	  }
	      	  else{
	      		axios
				.post('rest/korisnici/Brisanje', {"email":''+email})
				.then(response=> {
					toast('User (' + email + ') deleted!'),
					this.$router.push({ name: 'UserView' })},
					error => {toast('User doesn\'t exist!')})
				
	      	  }
	        });
		},
		logOut : function(event)
		{
			event.preventDefault()
			if (confirm('Are you sure?') == true) {
				axios.get('rest/logOut')
			}
			
		},
		
		isForbidden : function(active)
		{
			if (active == null)
			{
				this.$router.push({ name: 'forbidden' })
			}
			else if(active.uloga === 'korisnik')
			{
				this.$router.push({ name: 'forbidden' })
			}
			else
			{
			axios
			.post('rest/forbidden', {'salje': 'korisnikIzmena'}).then(response => {
				if(response.data.toString() !== ("OK"))
				{
					this.$router.push({ name: 'forbidden' })
				}
			});
			}
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
				this.kor = response.data;
				this.email = response.data.email;
			},error => {this.$router.push({ name: 'forbidden' })});
		axios
		.get('rest/korisnici/getActiveUser')
		.then(response =>{
			this.active = response.data;
			if (this.active.uloga === "superadmin"){
				this.active_superadmin = true;
			}
			else
			{
				this.active_superadmin = false;
			}
			this.isForbidden(response.data)
		});
	}
	
});