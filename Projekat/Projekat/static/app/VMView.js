Vue.component("VMView", {
	data: function (){
		return {
		vms : null
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
        
        <h2 style="margin: 15px;"><i>Table view</i></h2>
        
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
            <td>{{vm.kategorija.br_jezgara}}</td>
            <td>{{vm.kategorija.RAM}}</td>
            <td>{{vm.kategorija.GPU}}</td>
             <td><select style="width: 115px; background-color: rgb(186, 241, 122);">
              <option v-for="disk in vm.diskovi">{{disk}}</option>
            </select></td>
             <td><select style="width: 115px; background-color: rgb(186, 241, 122);">
              <option v-for="datum in vm.datumi">{{datum.start_Date}} do {{datum.finish_Date}}</option>
            </select></td>
          </tr>
      </table>
      
       <form action="#/addVM" style="text-align: center;">
        <button type="submit" style="width: 150px; margin: 10px;">Add new VM</button>

      </form>
        
        
        
        
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