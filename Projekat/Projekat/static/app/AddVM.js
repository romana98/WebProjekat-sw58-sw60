Vue.component("AddVM", {
	data: function (){
		return {
		niz : [],
		organizacije : null,
		selected_organizacija : null,
		diskovi : null,
		ram : null,
		gpu : null,
		jezgra : null,
		ime : null,
		kategorije : null,
		selected_kategorija : null,
		selected_kategorija_string : null,
		prikazi : false,
		active_superadmin : null,
		active_user : null
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
                    <button v-if="active_superadmin" class="dropbtn">Categories
                    </button>
                    <div class="dropdown-content">
                      <a href="#/CategoryView">View categories</a>
                    </div>
                  </div>
                  <div class="dropdown" v-if="active_admin">
                    <button v-if="active_admin" class="dropbtn">Monthly receipt
                    </button>
                    <div class="dropdown-content">
                      <a href="#/MonthlyReceipt">Get Monthly Receipt</a>
                    </div>
                  </div>
              </div>         
        </div>

        
        <div  style="margin-left: 40%; margin-top: 30px;width: 305px;">
        
          <h2>Add new Virtual Machine</h2><br>
          
          <form action="" style="width: 265px;" onsubmit="return false;">
          
            <label v-if="active_superadmin" style="text-align: right;">Organizacija: </label>
            <select v-if="active_superadmin" id="organizacija" class="addForm" style="width: 160px;" v-model="selected_organizacija" @change="getDiscs">
              <option v-for="organizacija in organizacije">{{organizacija.ime}}</option>
            </select><br><br>

            <label  style="text-align: right;">Ime: </label>
            <input id="ime" class="addForm" type="text" v-model="ime"><br><br>
            

            <label>Diskovi: </label>
            <select id="disk" class="addForm" style="width: 160px;" v-model="niz" multiple>
              <option v-for="disk in diskovi">{{disk}}</option>
            </select><br><br><br><br>
            
            <label>Kategorija: </label>
            <select id="kategorija" class="addForm" style="width: 160px;" v-model="selected_kategorija_string" @change="categoryChange">
              <option v-for="kategorija in kategorije">{{kategorija.ime}}</option>
            </select><br><br>

            <label  style="text-align: right;" >Broj jezgara: </label>
            <input id="brjez" class="addForm" type="text" value="" style="background-color: rgb(216, 216, 216);" readonly><br><br>

            <label  style="text-align: right;">RAM: </label>
            <input id="ram" class="addForm" type="text" value="" style="background-color: rgb(216, 216, 216);" readonly><br><br>

            <label  style="text-align: right;">GPU: </label>
            <input id="gpu" class="addForm" type="text" value="" style="background-color: rgb(216, 216, 216);" readonly><br><br>

            <button style="width: 100px;" v-on:click="back">Back</button>
            <button style="float: right; width: 100px;" v-on:click="addNew">Add</button><br><br>
            
            <label v-if="prikazi" style="color:red">Vec postoji VM sa zadatim imenom!</label>
          </form>
        </div >

        
        
        
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
		
		getDiscs : function()
		{
			axios.get('/rest/organizacije/getOrgDiscs', {params:{
				OrgID: this.selected_organizacija
				

				}}).then(response =>{
					this.diskovi = response.data;

			});		
		},
		
		back : function()
		{
			
			if (confirm('Are you sure?') == true) {
				this.$router.push({ name: 'VMView' })

			}
			
		},

		categoryChange : function(){
			
			axios.get('/rest/kategorije/getKatID', {params:{
				KatID: this.selected_kategorija_string
				

				}}).then(response =>{
					this.selected_kategorija = response.data
					document.getElementById("brjez").setAttribute("value", this.selected_kategorija.br_jezgara);
					document.getElementById("ram").setAttribute("value",this.selected_kategorija.RAM);
					document.getElementById("gpu").setAttribute("value",this.selected_kategorija.GPU);

			});	
			
			

		},
		
		addNew : function(){
			//provera da li su polja popunjena
			var dont = false;
			this.prikazi = false;
			if (this.ime === null || this.ime.length === 0){
				document.getElementById("ime").setAttribute("style","width: 160px; border-color:red");
				console.log("IME JE PRAZNO")
				dont = true;
			}
			else{
				document.getElementById("ime").setAttribute("style","width: 160px; border-color:rgb(216, 216, 216)");

			}
			if (this.selected_organizacija === null){
				document.getElementById("organizacija").setAttribute("style","width: 160px; border-color:red");
				dont = true;
			}
			else{
				if(this.active_superadmin === true){
					document.getElementById("organizacija").setAttribute("style","width: 160px; border-color:rgb(216, 216, 216)");
				}
			}
			if (this.selected_kategorija_string === null){
				document.getElementById("kategorija").setAttribute("style","width: 160px; border-color:red");
				dont = true;
			}
			else{
				document.getElementById("kategorija").setAttribute("style","width: 160px; border-color:rgb(216, 216, 216)");
			}
			
			if(dont === false){
			
			axios
			.post('rest/vm/addVM',  {"ime":'' + this.ime, kategorija:{"ime":''+ this.selected_kategorija_string ,
				"br_jezgara":''+ this.selected_kategorija.br_jezgara, "RAM":'' + this.selected_kategorija.RAM, "GPU":'' + this.selected_kategorija.GPU},
				"diskovi":this.niz},{params:{OrgID: this.selected_organizacija}})
			.then(response => {
				if(response.status === 200){
					this.$router.push({ name: 'VMView' })

					
				}
				else if(response.status === 201){
					this.prikazi = true;
				}
				else{
					this.$router.push({ name: 'badrequest' })

				}
			});	
			}
			
			
			
		},
		
		
		checkForbidden : function(){
			
			axios
			.post('rest/forbidden', {'salje': 'AddVM'}).catch(error => {
				if (error.response.status === 403){
					this.$router.push({ name: 'forbidden' })


				}
			});
			
		}
		
		
	},
	
	mounted(){
		
		this.checkForbidden();
		
		axios
        .get("/rest/organizacije/getOrgs")
        .then(response => {
      	  this.organizacije = response.data;
        });
		
		axios.get('/rest/organizacije/getOrgDiscs').then(response1 =>
		{
				this.diskovi = response1.data;

		});	
		
		
		axios.get('/rest/kategorije/getKategorije').then(response1 =>
		{
				this.kategorije = response1.data;

		});	
		
		axios.get('rest/korisnici/getActiveUser').then(response => {
			this.active_user = response.data;
			if (this.active_user.uloga === "superadmin"){
				this.active_superadmin = true;
				this.active_admin = false;
			}
			else
			{
				this.active_admin = true;
				this.active_superadmin = false;
				this.selected_organizacija = this.active_user.organizacija.ime;
				
				this.getDiscs();
				

			}
			
			
		}); 
		
		
		
		
	}
	 
	
});