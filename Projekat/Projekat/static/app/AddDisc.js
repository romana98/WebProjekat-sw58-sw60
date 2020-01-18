Vue.component("AddDisc", {
	data: function (){
		return {
		ime : null,
		active_superadmin : null,
		active_user : null,
		prikazi : false,
		kapacitet : null,
		virtm : null,
		vms : null,
		selected_vm : null
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
                  <div class="dropdown" v-if="active_admin">
                    <button class="dropbtn">Monthly receipt
                    </button>
                    <div class="dropdown-content">
                      <a href="#/MonthlyReceipt" v-on:click="a_clicked($event)">Get Monthly Receipt</a>
                    </div>
                  </div>
              </div>           
        </div>

        
        <div  style="margin-left: 40%; margin-top: 30px;width: 305px;">
        
          <h2>Add new disc</h2><br>
          
          <form action="" style="width: 250Spx;" onsubmit="return false;">


            <label  style="text-align: right;">Ime: </label>
            <input id="ime" class="addForm" style="width: 160px" type="text" v-model="ime"><br><br>
            
            <label  style="text-align: right;">Kapacitet: </label>
            <input id="kapacitet" class="addForm" type="text" style="width: 160px" v-model="kapacitet"><br><br>
            
            <label v-if="active_superadmin" style="text-align: right;">Virtualna masina: </label>
            <select v-if="active_superadmin" id="virtm" class="addForm" style="width: 160px;" v-model="virtm" @change="onVMChange">
            	<option v-for="vm in vms">{{vm.ime.split('&')[0]}}</option>
            </select><br><br>
            
            <button style="width: 100px;" v-on:click="back">Back</button>
            <button style="float: right; width: 100px;" v-on:click="addNew">Add</button><br><br>
            
            <label v-if="prikazi" style="color:red">Vec postoji disk sa zadatim imenom!</label>
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
				window.location.href = "#/OrganizationView";
			}
			
		},
		
		onVMChange : function(){

			axios.get('/rest/virtualne/getVMID', {params:{
				VMID: this.virtm
				

				}}).then(response =>{
					this.selected_vm = response.data;
					console.log(this.selected_vm);
					
			});	
			
			
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
				document.getElementById("ime").setAttribute("style","border-color:none");

			}
			if (this.kapacitet === null || this.kapacitet.length === 0){
				document.getElementById("kapacitet").setAttribute("style","border-color:red");
				dont = true;
				
			}
			else{
				if(isNaN(this.kapacitet)){
					document.getElementById("kapacitet").setAttribute("style","border-color:red");
					dont = true;
				}else{
				document.getElementById("kapacitet").setAttribute("style","border-color:none");
				}
			}
			
			if (this.selected_vm === null){
				document.getElementById("virtm").setAttribute("style","border: 1px solid red");
				dont = true;
			}
			else{
				
				document.getElementById("virtm").setAttribute("style"," border: 1px solid black");
				
			}
			
			if(dont === false){
			
			axios
			.post('rest/diskovi/addDisk',  {"ime":'' + this.ime, "kapacitet":'' + this.kapacitet,
				mojaVirtualnaMasina:{"ime": this.selected_vm.ime, kategorija:{"ime": this.selected_vm.kategorija.ime, "br_jezgara" : this.selected_vm.kategorija.br_jezgara
					,"RAM" : this.selected_vm.kategorija.RAM,"GPU" : this.selected_vm.kategorija.GPU}} })
			.then(response => {
				if(response.data.toString() === "200"){
					window.location.href = "#/DiscView"
					this.prikazi = false;
				}
				else{
					this.prikazi = true;
				}
			});	
			}
			
			
			
		}
		
		
	},
	
	mounted(){
		
		
		axios
        .get("/rest/virtuelne/VM")
        .then(response => {
      	  this.vms = response.data;
      	  console.log
        });
		
		axios.get('rest/korisnici/getActiveUser').then(response => {
			this.active_user = response.data;
			if (this.active_user.uloga === "admin"){
				this.active_admin = true;
				this.active_superadmin = false;
			}
			else
			{
				this.active_admin = false;
				this.active_superadmin = true;

			}
			
		}); 
		
		
		
		
	}
	 
	
});