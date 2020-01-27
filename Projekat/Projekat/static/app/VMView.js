Vue.component("VMView", {
	data: function (){
		return {
		active_user : null,
		vms : null,
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
                    <button v-if="active_admin" class="dropbtn">Organizations 
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
                    <button v-if="active_admin" class="dropbtn">Categories
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
        
        <h2 style="margin: 15px;"><i>Table view</i></h2>
        
        <table class="viewTable">
          <tr>
            <th>Ime</th>
            <th>Kategorija</th>
            <th>Broj jezgara</th>
            <th>RAM</th>
            <th>GPU</th>
            <th v-if="active_superadmin">Organizacija</th>
          </tr>
          <tr v-for="vm in vms" @click="sendData(vm)">
          	<td>{{vm.ime.split('&')[0]}}</td>
            <td>{{vm.kategorija.ime}}</td>
            <td>{{vm.kategorija.br_jezgara}}</td>
            <td>{{vm.kategorija.RAM}}</td>
            <td>{{vm.kategorija.GPU}}</td>
            <td v-if="active_superadmin">{{vm.ime.split('&')[1]}}</td>
          </tr>
      </table>
      
      <div v-if="active_admin">
        <button @click="addNew" type="submit" style="width: 150px; margin: 10px;">Add new VM</button>
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
			window.location.href = "#/AddVM";
		},
		
		sendData : function(VM)
		{
			
			console.log("Stisnut i poslat: " + VM.ime);
			this.$router.push({ name: 'vm', params: { vm_ime: VM.ime.split('&')[0] } });
			//ovde saljes romani vm :))
		}
		
		
	},
	
	mounted(){
		
		//ovde prilikom slanja zahteva vraca mi se samo za onog trenutnog korisnika sta treba da mu prikaze, sto se tice buttona njega moram rucno skinuti, dakle
		//iskoristicu metodu getactiveuser, pokupiti korisnika i gledati v-if active_user.uloga == "korisnik" onda ne prikazi dugme
		
		axios
        .get('/rest/virtuelne/VM')
        .then(response => {
      	  this.vms = response.data;  
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