//POTPUNO NEZAVRSENO
Vue.component("AddUser", {
	data: function (){
		return {
		niz : [],
		organizacije : null,
		selected_organizacija : null,
		ime : null,
		prikazi : false,
		active_superadmin : null,
		active_user : null,
		prezime : null,
		email : null,
		uloga : null,
		sifra : null
		}
	},
	template:`
	<div>
<div class="background" v-if="active_user">
             <div style="text-align: right; font-size: large;">
              <a href="#/profil" style="width: 10px;height: 5px; margin: 5px;"> Profil </a>
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
                    <button class="dropbtn">Organizations 
                    </button>
                    <div class="dropdown-content">
                      <a href="#/OrganizationView" v-on:click="a_clicked($event)">View organizations</a>
                    </div>
                  </div>
                  <div class="dropdown">
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
                    <button class="dropbtn">Categories
                    </button>
                    <div class="dropdown-content">
                      <a href="#/CategoryView" v-on:click="a_clicked($event)">View categories</a>
                    </div>
                  </div>
                  <div class="dropdown" v-if="active_user.uloga === 'admin'">
                    <button class="dropbtn">Monthly receipt
                    </button>
                    <div class="dropdown-content">
                      <a href="#/MonthlyReceipt" v-on:click="a_clicked($event)">Get Monthly Receipt</a>
                    </div>
                  </div>
              </div>           
        </div>

        
        <div  style="margin-left: 40%; margin-top: 30px;width: 305px;">
        
          <h2>Add new user</h2><br>
          
          <form action="" style="width: 265px;" onsubmit="return false;">
          
            <label v-if="active_superadmin" style="text-align: right;">Organizacija: </label>
            <select v-if="active_superadmin" id="organizacija" class="addForm" style="width: 160px;" v-model="selected_organizacija" @change="getOrganizacija">
              <option v-for="organizacija in organizacije">{{organizacija.ime}}</option>
            </select><br><br>
            
            <label>Email: </label>
            <input id="email" class="addForm" type="text" v-model="email"><br><br>

            <label>First name: </label>
            <input id="ime" class="addForm" type="text" v-model="ime"><br><br>
            
            <label>Last name: </label>
            <input id="prezime" class="addForm" type="text" v-model="prezime"><br><br>
            
            <label>Password: </label>
            <input id="sifra" class="addForm" type="text" v-model="sifra"><br><br>
            
            <label v-if="active_superadmin" style="text-align: right;">Uloga: </label>
            <select v-if="active_superadmin" id="uloga" class="addForm" style="width: 160px;" v-model="uloga">
            	<option value="korisnik">Korisnik</option>
              	<option value="admin">Admin</option>
            </select><br><br>

            <button style="width: 100px;" v-on:click="back">Back</button>
            <button style="float: right; width: 100px;" v-on:click="addNew">Add</button><br><br>
            
            <label v-if="prikazi" style="color:red">User with that email already exists!</label>
          </form>
        </div >

        
        
        
    </div>
	`	
	,
	methods: {
		
		logOut : function()
		{
			
			if (confirm('Are you sure?') == true) {
				axios.get('rest/logOut')
					.then(response=> {window.location.href = "#/login"})
			}
			
		},
		
		
		back : function()
		{
			
			if (confirm('Are you sure?') == true) {
				window.location.href = "#/VMView";
			}
			
		},
		
		addNew : function(){
			// provera da li su polja popunjena
			var dont = false;
			this.prikazi = false;

			if (this.ime === null || this.ime.length === 0){
				document.getElementById("ime").setAttribute("style","border-color:red");
				dont = true;
			}
			else{
				document.getElementById("ime").setAttribute("style"," border-color:none");

			}
			if (this.prezime === null || this.prezime.length === 0){
				document.getElementById("prezime").setAttribute("style","border-color:red");
				dont = true;
			}
			else{
				document.getElementById("prezime").setAttribute("style"," border-color:none");
				
			}
			if (this.email === null || this.email.length === 0){
				document.getElementById("email").setAttribute("style"," border-color:red");
				dont = true;
			}
			else{
				document.getElementById("email").setAttribute("style","border-color:none");
				
			}
			if (this.sifra === null || this.sifra.length === 0){
				document.getElementById("sifra").setAttribute("style","border-color:red");
				dont = true;
			}
			else{
				document.getElementById("sifra").setAttribute("style","border-color:none");
				
			}
			
			if (this.selected_organizacija === null || this.selected_organizacija.length === 0){
				document.getElementById("organizacija").setAttribute("style","width: 160px;border: 1px solid red;");
				dont = true;
			}
			else{
				if(this.active_superadmin === false){
					document.getElementById("organizacija").setAttribute("style","width: 160px;border: 1px solid black;)");
				}
			}
			
			if (this.uloga === null || this.uloga.length === 0){
				document.getElementById("uloga").setAttribute("style","width: 160px;border: 1px solid red;");
				dont = true;
			}
			else{
				document.getElementById("uloga").setAttribute("style","width: 160px;border: 1px solid black;");
				
			}
			
			
			
			if(dont === false){

				
			axios.post('rest/korisnici/addUser',  {"ime":'' + this.ime, organizacija:{"ime":'' + this.selected_organizacija_type.ime, 
					"opis":'' + this.selected_organizacija_type.opis, "logo":''+this.selected_organizacija_type.logo},
					"prezime" : this.prezime,"email" : this.email ,"lozinka" : this.sifra},{params:{email: this.email}})
				.then(response => {
					if(response.data.toString() === "200"){
						window.location.href = "#/UserView";
						
					}
					else{
						this.prikazi = true;
					}
				});	
				}
			
			
			
		},
		
		getOrganizacija : function()
		{
			axios.get('/rest/organizacije/getOrgID', {params:{
				OrgID: this.selected_organizacija
				

				}}).then(response =>{
					this.selected_organizacija_type = response.data;
					
			});	
		}
		
		
	},
	
	mounted(){
		axios
        .get("/rest/organizacije/getOrgs")
        .then(response => {
      	  this.organizacije = response.data;
        });
		
		axios.get('rest/korisnici/getActiveUser').then(response => {
			this.active_user = response.data;
			if (this.active_user.uloga === "superadmin"){
				this.active_superadmin = true;
			}
			else
			{
				this.active_superadmin = false;
				
			}
			
		}); 
		
		
		
		
	}
	 
	
});