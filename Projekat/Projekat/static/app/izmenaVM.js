Vue.component("izmena-vm", {
	data: function (){
		return {
			vm: null,
			validate_name: false,
			name:'',
			today:''
		}
	},
	template:`
	<div >
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

		<form id="form" class="login_form" method="post">
		<table class="poravnaj"  v-if="vm">
			<tr>
				<td>Name:</td>
				<td><input type="text" name="ime" v-model="vm.ime"></input></td>
				<td><label v-if="validate_name">You're missing field!</label></td>
			</tr>
			<tr>
				<td>Category:</td>
				<td >{{vm.kategorija.ime}}</td>
			</tr>
			<tr>
				<td>Cores:</td>
				<td >{{vm.kategorija.br_jezgara}}</td>
			</tr>
			<tr>
				<td>RAM:</td>
				<td >{{vm.kategorija.RAM}}</td>
			</tr>
			<tr>
				<td>GPU:</td>
				<td >{{vm.kategorija.GPU}}</td>
			</tr>
			<tr>
				<td>Discs:</td>
				<td>
					<select>
						<option v-for="d in vm.diskovi">{{d}}</option>		
					</select>
				</td>	
			</tr>
			
			<tr>
				<td>Dates:</td>
			</tr>
			<tr v-for="d in vm.datumi">
				<td>{{d.start_Date}}</td>
				 <td>{{d.finish_Date}}</td>	
			</tr>
			
			<tr>	
			<td>
				 <input type="datetime-local" value="today"></input>
			</td>
			</tr>
			
			<tr>
			<td>
				<button class="dugme" type="submit" v-on:click="save(vm)">Save</button>
			</td>
			<td>
				<button class="dugme"  type="submit" v-on:click="cancel()">Cancel</button>
			</td>
			</tr>
			<tr>	
			<td>
				<button class="dugme"  type="submit" v-on:click="deleteVM(vm.ime)">Delete VM</button>
			</td>
			</tr>
			</table>
			</form>
	
	</div>
	`	
	,
	methods: {
		save : function(vm)
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			
			if(vm.ime.length === 0 )
			{
				this.validate_name = true;					
			}
			else
			{
				this.validate_name = false;
			}
			
			axios
			.post('rest/korisnici/Izmena', {"ime" : ''+ vm.ime})
			.then(response => {
				if(response.data.toString() === ("200"))
				{
					toast('VM (' + vm.ime + ') information is saved!');		
				}
			});	
			
		},
		
		cancel : function()
		{
			
			document.getElementById("form").setAttribute("onsubmit","return false;");
			
			if (confirm('Are you sure?') == true) {
				axios
				.post('rest/vm/Izmena', {"ime":''})
					.then(response=> {window.location.href = "#/VMView"})
			}
		},
		
		deleteVM : function(ime)
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
      		
			axios
			.post('rest/vm/Brisanje', {"ime":''+ime})
			.then(response=> {
				toast('VM (' + ime + ') deleted!'),
				window.location.href = "#/VMView"})
		
		},
	
		logOut : function()
		{
			
			if (confirm('Are you sure?') == true) {
				axios.get('rest/logOut')
			}
		}
			
	},
	mounted()
	{
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth()+1;
		
		if(date.getDate() < 10)
		{
			day = '0'+date.getDate();
		}
		if(date.getMonth()+1 < 10)
		{
			month = '0'+(date.getMonth()+1);		
		}
		
			this.today = date.getFullYear()+'-'+month+'-'+day +'T' +date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
		console.log(this.today);
		
		if(this.$route.params.vm_ime) 
		{
			this.ime = this.$route.params.vm_ime;
		}
		axios
			.get('rest/virtualne/getVM', { params: {"ime":''+this.ime}})
			.then(response =>{
				this.vm = response.data
			});
	}	
});