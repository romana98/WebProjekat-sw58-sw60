Vue.component("AddOrganization", {
	data: function (){
		return {
		opis : null,
		logo : '',
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
        
          <h2>Add new Organization</h2><br>
          
          <form action="" style="width: 225px;" onsubmit="return false;">


            <label  style="text-align: right;">Ime: </label>
            <input id="ime" class="addForm" type="text" v-model="ime"><br><br>
            
            <label  style="text-align: right;">Opis: </label>
            <input id="opis" class="addForm" type="text" v-model="opis"><br><br>
            
            <label  style="text-align: right;align-top: 100%">Logo: </label>
           	<label class="addForm" style="width:165px">  <output>
				      <img :src="logo" v-if="logo !== ''">
				     </output>
			</label><br><br>
            
			<input id="logo" type="file" @change="onImg"><br><br>
            
            <button style="width: 100px;" v-on:click="back">Back</button>
            <button style="float: right; width: 100px;" v-on:click="addNew">Add</button><br><br>
            
            <label v-if="prikazi" style="color:red">Vec postoji organizacija sa zadatim imenom!</label>
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
				this.$router.push({ name: 'OrganizationView' })

			}
			
		},
		
		
		addNew : function(){
			//provera da li su polja popunjena
			var dont = false;
			this.prikazi = false;
			if (this.ime === null || this.ime.length === 0){
				document.getElementById("ime").setAttribute("style","width: 160px; border-color:red");
				dont = true;
			}
			else{
				document.getElementById("ime").setAttribute("style","width: 160px; border-color:rgb(216, 216, 216)");

			}
			if (this.opis === null){
				document.getElementById("opis").setAttribute("style","width: 160px; border-color:red");
				dont = true;
			}
			else{
				
				document.getElementById("opis").setAttribute("style","width: 160px; border-color:rgb(216, 216, 216)");
				
			}
			
			if(dont === false){
			
			axios
			.post('rest/organizacije/addOrganizacija',  {"ime":'' + this.ime, "opis":'' + this.opis, "logo":''+this.logo })
			.then(response => {
				if(response.data.toString() === "200"){
					this.$router.push({ name: 'OrganizationView' })

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
			.post('rest/forbidden', {'salje': 'AddOrganization'}).catch(error => {
				if (error.response.status === 403){
					this.$router.push({ name: 'forbidden' })


				}
			});
			
		}
		
		
	},
	
	mounted(){
		
		this.checkForbidden();
		
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