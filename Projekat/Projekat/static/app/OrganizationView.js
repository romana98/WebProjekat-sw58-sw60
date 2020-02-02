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
        
        <div style="margin-left: 25%; margin-top: 30px;"> 
        
        <h2 style="margin-left: 20%;margin-bot: 15%;"><i>Organizations view</i></h2>
        
        <table class="viewTable">
          <tr>
            <th>Ime</th>
            <th style = "width: 300px">Opis</th>
            <th>Logo</th>
          </tr>
          <tr align="center" v-for="org in orgs" @click="sendData(org)">
          	<td>{{org.ime}}</td>
            <td >{{org.opis}}</td>
            <td><output>
				      <img :src="org.logo" v-if="org.logo !== ''">
				      <p v-else>No logo found</p>
				</output>
			</td>
          </tr>
      </table>
      
      <div v-if="active_admin" style="clear:left">
        <button @click="addNew" type="submit" style="width: 150px; margin-left: 240px;margin-top: 15px;">Add new organization</button>
	 </div>
      
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
			this.$router.push({ name: 'addOrganization' })
		},
		
		sendData : function(org)
		{
			
			this.$router.push({ name: 'organization', params: { ime: org.ime} });
			//ovde saljes romani vm :))
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
		
		axios
        .get('/rest/organizacije/getOrganizacije')
        .then(response => {
      	  this.orgs = response.data;  
        });
		

		axios.get('rest/korisnici/getActiveUser').then(response => {
			this.active_user = response.data;
			console.log(this.active_user);
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