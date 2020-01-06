Vue.component("UserView", {
	data: function (){
		return {
		active_user : null,
		korisnici : null,
		active_admin : null,
		active_superadmin : null,
		help : null
		}
	},
	template:`
	<div>
	<div class="background" v-if="active_user">
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
                  <div class="dropdown" v-if="active_user.uloga === 'admin'">
                    <button class="dropbtn">Monthly receipt
                    </button>
                    <div class="dropdown-content">
                      <a href="#/MonthlyReceipt">Get Monthly Receipt</a>
                    </div>
                  </div>
              </div>           
        </div>
        
        <div style="margin-left: 32%; margin-top: 30px;">
        
        <h2 v-if="active_superadmin" style="margin-left: 22%;margin-bot: 15%;"><i>Users view</i></h2>
        <h2 v-else style="margin-left: 16%;margin-bot: 15%;"><i>Users view</i></h2> 
        
        <table class="viewTable">
          <tr>
          	<th>Email</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th v-if="active_superadmin">Organizacija</th>
          </tr>
          <tr v-for="korisnik in korisnici" @click="sendData(korisnik)">
          	<td>{{korisnik.email}}</td>
            <td>{{korisnik.ime}}</td>
            <td>{{korisnik.prezime}}</td>
            <td v-if="active_superadmin">{{korisnik.organizacija.ime}}</td>
          </tr>
      </table>
      
      <div v-if="active_admin || active_superadmin">
        <button v-if="active_superadmin" @click="addNew" type="submit" style="width: 150px; margin-left: 20%;margin-top: 15px;">Add new user</button>
		<button v-else @click="addNew" type="submit" style="width: 150px; margin-left: 14%;margin-top: 15px;">Add new VM</button>

	 </div>
      
     </div>
        
        
        
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
	
		addNew : function()
		{
			window.location.href = "#/addUser";
		},
		
		sendData : function(korisnik)
		{
			
			this.$router.push({ name: 'user', params: { email: korisnik.email } });
			
		}
		
		
	},
	
	mounted(){
		
		//ovde prilikom slanja zahteva vraca mi se samo za onog trenutnog korisnika sta treba da mu prikaze, sto se tice buttona njega moram rucno skinuti, dakle
		//iskoristicu metodu getactiveuser, pokupiti korisnika i gledati v-if active_user.uloga == "korisnik" onda ne prikazi dugme
		
		axios
        .get('/rest/korisnici/getKorisnici')
        .then(response => {
      	  this.korisnici = response.data;  
        });
		
		axios.get('rest/korisnici/getActiveUser').then(response => {
			this.active_user = response.data;
			if (this.active_user.uloga === "korisnik"){
				this.active_admin = false;
			}
			else
			{
				this.active_admin = true;
			}
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