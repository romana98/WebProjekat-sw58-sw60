Vue.component("VMView", {
	data: function (){
		return {
		active_user : null,
		vms : null,
		active_admin : null,
		active_superadmin : null,
		help : null,
		filter : null,
		filter_toggle : true,
		od :null,
		do_ :null,
		naziv : null
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
        
        <h2 style="margin: 15px;float:left;padding-right:700px"><i>Table view</i></h2>
        <h3 class="pretragaForm">Pretraga:</h3>
		<h3 class="pretragaForm">Filtriranje: </h3>
        
        
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
      
      <br><br><br><br>
      
      <form class="pretragaForm" >
        <input type="text" placeholder="Naziv" name="naziv" v-model="naziv"/><br><br>
        <input type="checkbox" name="filter" @click="toggle" checked="this.filter_toggle"> Filtering <br><br>
        <input type="submit"value="Primeni" @click="primeni"></button>
      </form>
      
      <form class="pretragaForm">
        <select style="width: 120px" v-model="filter">
          <option value="br_jezgara">Broj jezgara</option>
          <option value="gpu">GPU</option>
          <option value="ram">RAM</option>
        </select><br><br>
        <input v-model="od" type="text" style="width: 50px" name="od" placeholder="Od"/>
        <label> : </label>
        <input v-model="do_" type="text" style="width: 50px" name="do" placeholder="Do"/>
      </form>  
     
      <div v-if="active_admin" style="clear:left">
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
		},
		
		toggle : function(){
			this.filter_toggle = !this.filter_toggle;
			
		},
		
		primeni : function(){
			event.preventDefault();
			console.log(this.naziv);
			console.log(this.filter);
			console.log(this.filter_toggle);
			console.log(this.od);
			console.log(this.do_);
			
			axios
			.post('rest/filter', {'naziv': this.naziv, 'filter': this.filter, 'filter_toggle':this.filter_toggle, 'od' : this.od,
				'do' : this.do_}).then(response => {
				if(response.data.toString() !== ("200"))
				{
					
				}
			}).catch(error => {
				if (error.response.status === 403){
					

				}
			});
			
			
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