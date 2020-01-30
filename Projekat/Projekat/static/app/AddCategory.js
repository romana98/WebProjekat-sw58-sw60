Vue.component("AddCategory", {
	data: function (){
		return {
		ram : null,
		gpu : null,
		br_jezgara : null,
		ime : null,
		active_superadmin : null,
		active_user : null,
		prikazi : false
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
        
          <h2>Add new Organization</h2><br>
          
          <form action="" style="width: 285px;" onsubmit="return false;">


            <label  style="text-align: right;">Ime: </label>
            <input id="ime" class="addForm" type="text" v-model="ime"><br><br>
            
            <label  style="text-align: right;">Broj jezgara: </label>
            <input id="br_jezgara" class="addForm" type="text" v-model="br_jezgara"><br><br>
            
            <label  style="text-align: right;">RAM: </label>
            <input id="ram" class="addForm" type="text" v-model="ram"><br><br>
            
            <label  style="text-align: right;">GPU: </label>
            <input id="gpu" class="addForm" type="text" v-model="gpu"><br><br>
            
			
            
            <button style="width: 100px;" v-on:click="back">Back</button>
            <button style="float: right; width: 100px;" v-on:click="addNew">Add</button><br><br>
            
            <label v-if="this.prikazi" style="color:red">Vec postoji kategorija sa zadatim imenom!</label>
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
			}
			
		},
		
		
		onImg(event)
		{
			 const file = event.target.files[0];
		      if (!file) {
		        return false
		      }
		      if (!file.type.match('image.*')) {
		        return false
		      }
		      const reader = new FileReader()
		      const that = this
		      reader.onload = function (e) {
		        that.logo = e.target.result
		      }
		      reader.readAsDataURL(file);
		},
		
		back : function()
		{
			
			if (confirm('Are you sure?') == true) {
				window.location.href = "#/CategoryView";
			}
			
		},
		
		
		addNew : function(){
			//provera da li su polja popunjena
			var dont = false;
			this.prikazi = false;
			if (this.ime === null || this.ime.length === 0){
				document.getElementById("ime").setAttribute("style"," border-color:red");
				dont = true;
			}
			else{
				document.getElementById("ime").setAttribute("style"," border-color:rgb(216, 216, 216)");

			}
			if (this.br_jezgara === null || this.br_jezgara.length === 0){
				document.getElementById("br_jezgara").setAttribute("style"," border-color:red");
				dont = true;
			}
			else{
				if(isNaN(this.br_jezgara)){
					document.getElementById("br_jezgara").setAttribute("style"," border-color:red");
				}
				else{
					document.getElementById("br_jezgara").setAttribute("style"," border-color:none");
				}
			}
			
			if (this.ram === null || this.ram.length === 0){
				document.getElementById("ram").setAttribute("style"," border-color:red");
				dont = true;
			}
			else{
				if(isNaN(this.ram)){
					document.getElementById("ram").setAttribute("style"," border-color:red");
					dont = true;
				}
				else{
					document.getElementById("ram").setAttribute("style"," border-color:none");
				}
				
			}
			
			if (this.gpu === null || this.gpu.length === 0){
				document.getElementById("gpu").setAttribute("style"," border-color:red");
				dont = true;
			}
			else{
				
				if(isNaN(this.gpu)){
					document.getElementById("gpu").setAttribute("style"," border-color:red");
					dont = true;
				}
				else{
					document.getElementById("gpu").setAttribute("style"," border-color:none");
				}				
			}
			
			if(dont === false){
			
			axios
			.post('rest/kategorije/addKategorija',  {"ime":'' + this.ime, "br_jezgara":'' + this.br_jezgara, "RAM":''+this.ram, "GPU":''+this.gpu})
			.then(response => {		
				if(response.status === 200){
					window.location.href = "#/CategoryView"
					this.prikazi = false;
				}
				
				
				
			}).catch(error => {
				
				if(error.response.status === 400){
					window.location.href = "#/BadRequest"
				}
				else if(error.response.status === 403){
					window.location.href = "#/Forbidden"
				}
				else{
					this.prikazi = true;
				}
				
			});	
			}
			
			
			
		},
		
		checkForbidden : function(){
			
			axios
			.post('rest/forbidden', {'salje': 'AddCategory'}).then(response => {
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
		
		axios.get('rest/korisnici/getActiveUser').then(response => {
			this.active_user = response.data;
			if (this.active_user.uloga === "superadmin"){
				this.active_admin = false;
				this.active_superadmin = true;
			}
			else
			{
				this.active_admin = true;
				this.active_superadmin = false;
			}
			this.checkForbidden();
			
			
		}); 
		
		
		
		
	}
	 
	
});