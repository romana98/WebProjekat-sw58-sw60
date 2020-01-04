Vue.component("izmena-kategorija", {
	data: function (){
		return {
			kat: null,
			validate_name: false,
			validate_name_exist: false,
			validate_br_jez_num: false,
			validate_br_jez: false,
			validate_ram_num: false,
			validate_ram: false,
			validate_gpu: false,
			ime:''
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
		<table class="poravnaj"  v-if="kat">
			<tr>
				<td>Name:</td>
				<td><input type="text" name="ime" v-model="kat.ime"></input></td>
				<td><label v-if="validate_name">You're missing field!</label>
				<label v-else-if="validate_name_exist">Name already taken!</label></td>
			</tr>
			<tr>
				<td>Num of Cores:</td>
				<td><input type="text" name="jezgra" v-model="kat.br_jezgara"></input></td>
				<td><label v-if="validate_br_jez">You're missing field!</label>
				<label v-else-if="validate_br_jez_num">Not a number!</label></td>
			</tr>
			<tr>
				<td>RAM:</td>
				<td><input type="text" name="ram" v-model="kat.RAM"></input></td>
				<td><label v-if="validate_ram">You're missing field!</label>
				<label v-else-if="validate_ram_num">Not a number!</label></td>
			</tr>
			<tr>
				<td>GPU:</td>
				<td><input type="text" name="gpu" v-model="kat.GPU"></input></td>
				<td><label v-if="validate_gpu">You're missing field!</label></td>
			</tr>
			<tr>
			<td>
				<button class="dugme" type="submit" v-on:click="save(kat, ime)">Save</button>
			</td>
			<td>
				<button class="dugme" type="submit" v-on:click="cancel()">Cancel</button>
			</td>
			</tr>
			<tr>	
			<td>
				<button class="dugme" type="submit" v-on:click="deleteKat(kat.ime)">Delete Category</button>
			</td>
			</tr>
			</table>
		</form>
	
	</div>
	`	
	,
	methods: {
		
		save : function(kat, ime)
		{
			
			document.getElementById("form").setAttribute("onsubmit","return false;");
			validate_name_exist: false
			
			if(kat.ime.length === 0 )
			{
				this.validate_name = true;					
			}
			else
			{
				this.validate_name = false;
			}
			
			if(kat.br_jezgara.length === 0 )
			{
				this.validate_br_jez = true;					
			}
			else
			{
				this.validate_br_jez = false;
			}
			
			if(kat.RAM.length === 0 )
			{
				this.validate_ram = true;					
			}
			else
			{
				this.validate_ram = false;
			}
			
			if(kat.GPU.length === 0 )
			{
				this.validate_gpu = true;					
			}
			else
			{
				this.validate_gpu = false;
			}
			
			if(isNaN(kat.br_jezgara))
			{
				this.validate_br_jez_num = true;
			}
			else
			{
				this.validate_br_jez_num = false;
			}

			if(isNaN(kat.RAM))
			{
				this.validate_ram_num = true;
			}
			else
			{
				this.validate_ram_num = false;
			}
			
			if(!this.validate_br_jez_num && !this.validate_ram_num)
			{
				axios
				.post('rest/katerogije/Izmena',  {ime:''+kat.ime, br_jezgara: kat.br_jezgara, RAM: kat.RAM, GPU: kat.GPU}, {params:{imeOld:''+ime}})
				.then(response => {
					if(response.data.toString() === ("200"))
					{
						toast('Category (' + kat.ime + ') information is saved!');		
					}
					else if(response.data.toString() === ("202"))
					{
						this.validate_name_exist = true; 
					}
				});	
			}
			
		},
		
		cancel : function()
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			
			if (confirm('Are you sure?') == true) {
				axios
				.post('rest/kategorije/Izmena', {"ime":''})
					.then(response=> {window.location.href = "#/VMView"})
			}
		},
		
		deleteKat : function(ime)
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
      		
			axios
			.post('rest/kategorije/Izmena', {"ime":''+ime})
			.then(response=> {
				toast('Category (' + ime + ') deleted!'),
				window.location.href = "#/DicsView"})
		
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
		if(this.$route.params.kat_ime) 
		{
			this.ime = this.$route.params.kat_ime;
			
		}
		this.ime = "PrvaKategorija";
		axios
			.get('rest/kategorije/getKategorija', { params: {"ime":''+this.ime}})
			.then(response =>{
				this.kat = response.data
		});	
	}	
});