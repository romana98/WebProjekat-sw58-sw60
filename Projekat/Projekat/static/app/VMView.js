Vue.component("VMView", {
	data: function (){
		return {
		vms : null
		}
	},
	template:`
	<div>
	<div class="background">
            
            <h1 style="font-size: xx-large; ">Welcome to Cloud</h1>
            <span>
            <button type="submit" v-on:click="cancel()">Log out</button>
            <a href="#/IzProf"> Profil </a>          
           	</span>
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
        
        <table class="viewTable">
          <tr>
            <th>Ime</th>
            <th>Kategorija</th>
            <th>Broj jezgara</th>
            <th>RAM</th>
            <th>GPU</th>
            <th>Lista diskova</th>
            <th>Datumi koriscenja</th>
          </tr>
          <tr v-for="vm in vms">
          	<td>{{vm.ime}}</td>
            <td>{{vm.kategorija.ime}}</td>
            <td>Broj jezgara</td>
            <td>RAM</td>
            <td>GPU</td>
            <td>Lista diskova</td>
            <td>Datumi koriscenja</td>
          </tr>
          <tr>
            <td>Ime</td>
            <td>Kategorija</td>
            <td>Broj jezgara</td>
            <td>RAM</td>
            <td>GPU</td>
            <td>Lista diskova</td>
            <td>Datumi koriscenja</td>
          </tr>
      </table>
        
        
        
        
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
			
		}
		
		
	},
	
	mounted(){
		axios
        .get('/rest/virtuelne/VM')
        .then(response => {
      	  this.vms = response.data;
      	  console.log(this.vms);      	  
        });
	}
	
	
});