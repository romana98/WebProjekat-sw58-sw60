Vue.component("DiscView", {
	data: function (){
		return {
		active_user : null,
		diskovi : null,
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
        
        <h2 style="margin-left: 16%;margin-bot: 15%;"><i>Discs view</i></h2>
        
        <table class="viewTable">
          <tr>
          	<th>Ime</th>
            <th>Kapacitet</th>
            <th>VM</th>
          </tr>
          <tr v-for="disk in diskovi" @click="sendData(disk)">
          	<td>{{disk.ime}}</td>
            <td>{{disk.kapacitet}}</td>
            <td>{{disk.mojaVirtualnaMasina.ime}}</td>
          </tr>
      </table>
      
      <div v-if="active_admin || active_superadmin" style="clear:left">
        <button @click="addNew" type="submit" style="width: 150px; margin-left: 14%;margin-top: 15px;">Add new disc</button>
	

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
			window.location.href = "#/addDisc";
		},
		
		sendData : function(disk)
		{
			
			this.$router.push({ name: 'disc', params: { disk_ime: disk.ime } });
			
		}
		
		
	},
	
	mounted(){
		
		axios
        .get('/rest/diskovi/getDiskovi')
        .then(response => {
      	  this.diskovi = response.data;  
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