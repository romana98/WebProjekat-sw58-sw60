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
                  <div class="dropdown" v-if="active_user.uloga === 'admin'">
                    <button v-if="active_admin" class="dropbtn">Monthly receipt
                    </button>
                    <div class="dropdown-content">
                      <a href="#/MonthlyReceipt">Get Monthly Receipt</a>
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
		
		back : function()
		{
			
			if (confirm('Are you sure?') == true) {
				this.$router.push({ name: 'DiscView' })

			}
			
		},
		
		onVMChange : function(){

			axios.get('/rest/virtualne/getVMID', {params:{
				VMID: this.virtm
				

				}}).then(response =>{
					this.selected_vm = response.data;
					
					
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
					this.$router.push({ name: 'DiscView' })

					this.prikazi = false;
				}
				else{
					this.prikazi = true;
				}
			});	
			}
			
			
			
		},
		
		checkForbidden : function(){
			
			axios
			.post('rest/forbidden', {'salje': 'AddDisc'}).catch(error => {
				if (error.response.status === 403){
					this.$router.push({ name: 'forbidden' })


				}
			});
			
		}
		
		
	},
	
	mounted(){
		
		this.checkForbidden();
		
		axios
        .get("/rest/virtuelne/VM")
        .then(response => {
        	if(response.status === 200){
        		this.vms = response.data;
        	}
        	else{
        		this.$router.push({ name: 'forbidden' })
        	}
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