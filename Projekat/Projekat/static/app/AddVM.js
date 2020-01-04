Vue.component("AddVM", {
	data: function (){
		return {
		organizacije : null,
		selected_organizacija : null,
		diskovi : null,
		ram : null,
		gpu : null,
		jezgra : null,
		ime : null,
		kategorije : null,
		selected_kategorija : null,
		selected_kategorija_string : null
		}
	},
	template:`
	<div>
	<div class="background">
             <div style="text-align: right; font-size: large;">
              <a href="#/IzProf" style="width: 10px;height: 5px; margin: 5px;"> Profil </a>
               <a href="#/login" v-on:click="logOut()" style="width: 10px;height: 5px; margin: 5px;"> Log out </a>
            </div>
            <h1 style="font-size: xx-large; ">Welcome to Cloud</h1>
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
        
        <div  style="margin-left: 40%; margin-top: 30px;width: 305px;">
        
          <h2>Add new Virtual Machine</h2><br>
          
          <form action="" style="width: 265px;">
          
            <label style="text-align: right;">Organizacija: </label>
            <select class="addForm" style="width: 160px;" v-model="selected_organizacija" @change="getDiscs">
              <option v-for="organizacija in organizacije">{{organizacija.ime}}</option>
            </select><br><br>

            <label  style="text-align: right;">Ime: </label>
            <input class="addForm" type="text"><br><br>
            

            <label>Diskovi: </label>
            <select class="addForm" style="width: 160px;">
              <option v-for="disk in diskovi">{{disk}}</option>
            </select><br><br>
            
            <label>Kategorija: </label>
            <select class="addForm" style="width: 160px;" v-model="selected_kategorija_string" @change="categoryChange">
              <option v-for="kategorija in kategorije">{{kategorija.ime}}</option>
            </select><br><br>

            <label  style="text-align: right;" >Broj jezgara: </label>
            <input id="brjez" class="addForm" type="text" value="" style="background-color: rgb(216, 216, 216);" readonly><br><br>

            <label  style="text-align: right;">RAM: </label>
            <input id="ram" class="addForm" type="text" value="" style="background-color: rgb(216, 216, 216);" readonly><br><br>

            <label  style="text-align: right;">GPU: </label>
            <input id="gpu" class="addForm" type="text" value="" style="background-color: rgb(216, 216, 216);" readonly><br><br>

            <button style="width: 100px;">Back</button>
            <button style="float: right; width: 100px;">Add</button>
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
		
		getDiscs : function()
		{
			axios.get('/rest/organizacije/getOrgDiscs', {params:{
				OrgID: this.selected_organizacija
				

				}}).then(response =>{
					this.diskovi = response.data;
					console.log(this.selected_organizacija);
					console.log(response.data[0]);
			});		
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
			
			

		}
		
		
	},
	
	mounted(){
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
	}
	 
	
});