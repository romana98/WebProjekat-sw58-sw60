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
		validate_name_let: false,
		validate_lastname: false,
		validate_lastname_let: false,
		validate_match: false,
		validate_email_form: false,
		validate_email_exist: false,
		email: '',
		oldLoz:''
		}
	},
	template:`
	<div>
	
	<div class="background" v-if="active">
             <div style="text-align: right; font-size: large;">
              <a href="#/profil" style="width: 10px;height: 5px; margin: 5px;" v-on:click="a_clicked($event)"> Profil </a>
               <a href="/" v-on:click="logOut()" style="width: 10px;height: 5px; margin: 5px;"> Log out </a>
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
				<td><label v-if="validate_name">You're missing field!</label>
				<label v-else-if="validate_name_let">Must conatin only letters!</label></td>
			</tr>
			<tr>
				<td>LastName:</td>
				<td><input v-model=kor.prezime></input></td>
				<td><label v-if="validate_lastname">You're missing field!</label>
				<label v-else-if="validate_lastname_let">Must conatin only letters!</label></td>
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
				<button class="dugme"  type="submit" v-on:click="cancel()">Back</button>	
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
			
			if(this.loz.length === 0 && kor.lozinka != this.oldLoz)
			{
				this.validate_loz_nd = true; 
			}
			else
			{
				this.validate_loz_nd = false;
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
			
			if(!kor.email.includes('@') || !kor.email.includes('.') || kor.email.indexOf('@') > kor.email.indexOf('.'))
			{
				this.validate_email_form = true; 
			}
			else
			{
				this.validate_email_form = false; 
			}
			
			axios.post('rest/korisnici/Izmena', {"email":''+kor.email, "ime" : ''+ kor.ime, "prezime":''+kor.prezime, "lozinka":''+kor.lozinka}, {params:{emailOld:''+this.email, pass_nd:''+this.loz}})
				.then(response => {
					if(this.validate_match === false)
					{
						toast('User (' + kor.email + ') information is saved!');	
						this.email = kor.email;
					}
				}, error=>{
					if(error.response.data.toString() === ("202"))
					{
						this.validate_email_exist = true; 
					}
				});
			
		},
		
		cancel : function()
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			if (confirm('If you go back, your changes won\'t be saved, go back?') == true){
				this.$router.push({ name: 'VMView' })
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
			
		},
		
		isForbidden : function(active)
		{
			if (active == null)
			{
				this.$router.push({ name: 'forbidden' })
			}
			else
			{
			axios
			.post('rest/forbidden', {'salje': 'profil'}).then(response => {
				if(response.data.toString() !== ("200"))
				{
					this.$router.push({ name: 'forbidden' })
				}
			});
			}
		}


	},
	
	mounted()
	{
		axios
			.get('rest/korisnici/getActiveUser')
			.then(response =>{
				this.kor = response.data;
				this.active = response.data;
				this.email = response.data.email;
				this.oldLoz = response.data.lozinka;
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