Vue.component("CategoryView", {
	data: function (){
		return {
		active_user : null,
		kategorije : null,
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
               <a href="/" v-on:click="logOut()" style="width: 10px;height: 5px; margin: 5px;"> Log out </a>
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
                    <button v-if="active_superadmin" class="dropbtn">Organizations 
                    </button>
                    <div class="dropdown-content">
                      <a href="#/OrganizationView">View organizations</a>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button v-if="active_admin" class="dropbtn">Users
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
                    <button v-if="active_superadmin" class="dropbtn">Categories
                    </button>
                    <div class="dropdown-content">
                      <a href="#/CategoryView">View categories</a>
                    </div>
                  </div>
                  <div class="dropdown" v-if="active_user.uloga === 'admin'">
                    <button v-if="active_admin" class="dropbtn">Monthly receipt
                    </button>
                    <div class="dropdown-content">
                      <a href="#/MonthlyReceipt">Get Monthly Receipt</a>
                    </div>
                  </div>
              </div>              
        </div>
        
        <div style="margin-left: 32%; margin-top: 30px;">
        
        <h2 v-if="active_superadmin" style="margin-left: 22%;margin-bot: 15%;"><i>Category view</i></h2>
        <h2 v-else style="margin-left: 16%;margin-bot: 15%;"><i>Users view</i></h2> 
        
        <table class="viewTable">
          <tr>
          	<th>Ime</th>
            <th>Broj jezgara</th>
            <th>RAM</th>
            <th>GPU</th>
          </tr>
          <tr v-for="kategorija in kategorije" @click="sendData(kategorija)">
          	<td>{{kategorija.ime}}</td>
            <td>{{kategorija.br_jezgara}}</td>
            <td>{{kategorija.RAM}}</td>
            <td>{{kategorija.GPU}}</td>
          </tr>
      </table>
      
      <div v-if="active_admin || active_superadmin">
        <button v-if="active_superadmin" @click="addNew" type="submit" style="width: 150px; margin-left: 20%;margin-top: 15px;">Add new category</button>

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
			}
			
		},
	
		addNew : function()
		{
			window.location.href = "#/addCategory";
		},
		
		sendData : function(kategorija)
		{
			
			this.$router.push({ name: 'category', params: { kat_ime: kategorija.ime } });
			
		},
		
		checkForbidden : function(){
			
			axios
			.post('rest/forbidden', {'salje': 'CategoryView'}).then(response => {
				if(response.data.toString() !== ("200"))
				{
					window.location.href = "#/Forbidden"
				}
			}).catch(error => {
				if (error.response.status === 403){
					window.location.href = "#/Forbidden"

				}
			});
			
		}
		
	},
	
	mounted(){
		
		//ovde prilikom slanja zahteva vraca mi se samo za onog trenutnog korisnika sta treba da mu prikaze, sto se tice buttona njega moram rucno skinuti, dakle
		//iskoristicu metodu getactiveuser, pokupiti korisnika i gledati v-if active_user.uloga == "korisnik" onda ne prikazi dugme
		
		axios
        .get('/rest/kategorije/getKategorije')
        .then(response => {
      	  this.kategorije = response.data;  
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
			this.checkForbidden();
		});
		
		
	}
	
	
});