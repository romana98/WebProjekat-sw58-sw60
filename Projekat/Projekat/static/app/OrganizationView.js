Vue.component("OrganizationView", {
	data: function (){
		return {
		orgs : null,
		active_admin : null,
		active_superadmin : null,
		active_user : null,
		help : null
		}
	},
	template:`
	<div>
	<div class="background">
             <div style="text-align: right; font-size: large;">
              <a href="#/profil" style="width: 10px;height: 5px; margin: 5px;"> Profil </a>
               <a href="#/login" v-on:click="logOut()" style="width: 10px;height: 5px; margin: 5px;"> Log out </a>
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
                    <button class="dropbtn">Organizations 
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
                    <button class="dropbtn">Categories
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
        
        <div style="margin-left: 30%; margin-top: 30px;"> 
        
        <h2 style="margin-left: 15%;margin-bot: 15%;"><i>Organizations view</i></h2>
        
        <table class="viewTable">
          <tr>
            <th>Ime</th>
            <th>Opis</th>
            <th>Logo</th>
          </tr>
          <tr v-for="org in orgs" @click="sendData(org)">
          	<td>{{org.ime}}</td>
            <td>{{org.opis}}</td>
            <td><output>
				      <img :src="org.logo" v-if="org.logo !== ''">
				      <p v-else>No logo found</p>
				</output>
			</td>
          </tr>
      </table>
      
      <div v-if="active_admin">
        <button @click="addNew" type="submit" style="width: 150px; margin-left: 165px;margin-top: 20px;">Add new organization</button>
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
					.then(response=> {window.location.href = "#/login"})
			}
			
		},
	
		addNew : function()
		{
			window.location.href = "#/AddOrganization";
		},
		
		sendData : function(org)
		{
			
			this.$router.push({ name: 'organization', params: { ime: org.ime} });
			//ovde saljes romani vm :))
		}
		
		
	},
	
	mounted(){
		
		axios
        .get('/rest/organizacije/getOrganizacije')
        .then(response => {
      	  this.orgs = response.data;  
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