Vue.component("VMView", {
	data: function (){
		return {
		active_user : null,
		vms : null,
		active_admin : null,
		active_superadmin : null,
		help : null,
		filterRAM : true,
		odRAM :null,
		doRAM :null,
		filterGPU : true,
		odGPU :null,
		doGPU :null,
		filterCORE : true,
		odCORE :null,
		doCORE :null,
		naziv : null,
		noResult : false
		}
	},
	template:`
	<div>
	<div class="background" v-if="active_user">
             <div style="text-align: right; font-size: large;">
              <router-link to="/profil" style="width: 10px;height: 5px; margin: 5px;"> Profil </router-link>
               <router-link to="/" v-on:click.native="logOut($event)" style="width: 10px;height: 5px; margin: 5px;"> Log out </router-link>
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
        
        <h2 style="margin: 15px;float:left;padding-right:600px"><i>Table view</i></h2>
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
        <input type="submit"value="Primeni" @click="primeni"></button><br><br>
        <label v-if="noResult" style="color:red">Nema rezultata.</label>
      </form>
      
      <form class="pretragaForm">       
		<input type="checkbox" name="filter" @click="toggle('ram')" checked="this.filterRAM"> RAM &nbsp&nbsp       
        <input v-model="odRAM" type="text" style="width: 50px" id="odRAM" placeholder="od"/>
        <label> : </label>
        <input v-model="doRAM" type="text" style="width: 50px" id="doRAM" placeholder="do"/><br><br>
        <input type="checkbox" name="filter" @click="toggle('gpu')" checked="this.filterGPU"> GPU &nbsp&nbsp&nbsp
        <input v-model="odGPU" type="text" style="width: 50px" id="odGPU" placeholder="od"/>
        <label> : </label>
        <input v-model="doGPU" type="text" style="width: 50px" id="doGPU" placeholder="do"/><br><br>
        <input type="checkbox" name="filter" @click="toggle('core')" checked="this.filterCORE"> Cores &nbsp&nbsp
        <input v-model="odCORE" type="text" style="width: 50px" id="odCORE" placeholder="od"/>
        <label> : </label>
        <input v-model="doCORE" type="text" style="width: 50px" id="doCORE" placeholder="do"/>
      </form>  
     
      <div v-if="active_admin" style="clear:left">
        <button @click="addNew" type="submit" style="width: 150px; margin: 10px;">Add new VM</button>
	 </div>
     
      
     
      
        
        
        
    </div>
	`	
	,
	methods: {
		
		logOut : function(event)
		{
			if (confirm('Are you sure?') == true) {
				axios.get('rest/logOut')
			}
			else
			{
				event.preventDefault();
			}
			
		},
	
		addNew : function()
		{
			this.$router.push({ name: 'addVM' })
		},
		
		sendData : function(VM)
		{
			
			this.$router.push({ name: 'vm', params: { vm_ime: VM.ime.split('&')[0] } });
			//ovde saljes romani vm :))
		},
		
		toggle : function(filter){
			if(filter === "ram"){
				this.filterRAM = !this.filterRAM;
			}
			else if(filter === "gpu"){
				this.filterGPU = !this.filterGPU;
			}
			else{
				this.filterCORE = !this.filterCORE;
			}
			
		},
		
		primeni : function(){
			
			event.preventDefault();
			//frontend zastita - za svako polje od do proveriti ukoliko je cekiran da li su popunjena i to brojevima
			var dontRAM = false;
			var dontGPU = false;
			var dontCORE = false;
			this.prikazi = false;
			if (this.filterRAM){
				
				if (this.odRAM === null || this.odRAM.length === 0 || isNaN(this.odRAM)){
					document.getElementById("odRAM").setAttribute("style","border-color:red;width: 50px");
					dontRAM = true;
				}
				else{
					document.getElementById("odRAM").setAttribute("style","border-color:none;width: 50px");
					dontRAM = false;
				}
				if(this.doRAM === null || this.doRAM.length == 0 || isNaN(this.doRAM)){
					document.getElementById("doRAM").setAttribute("style","border-color:red;width: 50px");
					dontRAM = true;
				}
				else
				{
					document.getElementById("doRAM").setAttribute("style","border-color:none;width: 50px");
					dontRAM = false;
				}
			}
			else{
				document.getElementById("doRAM").setAttribute("style","border-color:none;width: 50px");
				document.getElementById("odRAM").setAttribute("style","border-color:none;width: 50px");
				dontRAM = false;
			}
				
			if (this.filterGPU){
				
				if(this.doGPU === null || this.doGPU.length == 0 || isNaN(this.doGPU)){
					document.getElementById("doGPU").setAttribute("style","border-color:red;width: 50px");
					dontGPU = true;
				}
				else
				{
					document.getElementById("doGPU").setAttribute("style","border-color:none;width: 50px");
					dontGPU = false;
				}
				if(this.odGPU === null || this.odGPU.length == 0 || isNaN(this.odGPU)){
					document.getElementById("odGPU").setAttribute("style","border-color:red;width: 50px");
					dontGPU = true;
				}
				else
				{
					document.getElementById("odGPU").setAttribute("style","border-color:none;width: 50px");
					dontGPU = false;
				}
			}
			else{
				document.getElementById("odGPU").setAttribute("style","border-color:none;width: 50px");
				document.getElementById("doGPU").setAttribute("style","border-color:none;width: 50px");
				dontGPU = false;
			}
				
			if(this.filterCORE){
				
				
				if(this.doCORE === null || this.doCORE.length == 0|| isNaN(this.doCORE)){
					document.getElementById("doCORE").setAttribute("style","border-color:red;width: 50px");
					dontCORE = true;
				}
				else
				{
					document.getElementById("doCORE").setAttribute("style","border-color:none;width: 50px");
					dontCORE = false;
				}
				if(this.odCORE === null || this.odCORE.length == 0|| isNaN(this.odCORE)){
					document.getElementById("odCORE").setAttribute("style","border-color:red;width: 50px");
					dontCORE = true;
				}
				else
				{
					document.getElementById("odCORE").setAttribute("style","border-color:none;width: 50px");
					dontCORE = false;
				}
			}
			else{
				document.getElementById("odCORE").setAttribute("style","border-color:none;width: 50px");
				document.getElementById("doCORE").setAttribute("style","border-color:none;width: 50px");
				dontCORE = false;
			}
				
			
			
			if(!(dontRAM || dontGPU || dontCORE)){
			
			
			axios
			.get('rest/filter', {params: {
				naziv: this.naziv, 
				filterRAM : this.filterRAM, 
				odRAM : this.odRAM,
				doRAM : this.doRAM,
				filterGPU : this.filterGPU, 
				odGPU : this.odGPU,
				doGPU : this.doGPU,
				filterCORE : this.filterCORE, 
				odCORE : this.odCORE,
				doCORE : this.doCORE 
				}}).then(response => {
				if(response.status === 200)
				{
						//sve ok
						this.noResult = false;
						this.vms = response.data;
				}
				else{
					//toggle neki ispis da nema rezultata
					this.noResult = true;
					this.vms = response.data;
				}
			}).catch(error => {
				if (error.response.status === 400){
					this.$router.push({ name: 'badrequest' })

				}
			});
			
			}
		},
		
		checkForbidden : function(){
			
			axios
			.post('rest/forbidden', {'salje': 'VMView'}).catch(error => {
				if (error.response.status === 403){
					this.$router.push({ name: 'forbidden' })


				}
			});
			
		}
		
	},
	
	mounted(){
		
		//ovde prilikom slanja zahteva vraca mi se samo za onog trenutnog korisnika sta treba da mu prikaze, sto se tice buttona njega moram rucno skinuti, dakle
		//iskoristicu metodu getactiveuser, pokupiti korisnika i gledati v-if active_user.uloga == "korisnik" onda ne prikazi dugme
		this.checkForbidden();
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