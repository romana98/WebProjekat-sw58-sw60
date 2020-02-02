Vue.component("izmena-brisanje-kategorija", {
	data: function (){
		return {
			kat: null,
			active: null,
			validate_name: false,
			validate_name_exist: false,
			validate_br_jez_num: false,
			validate_br_jez_sign: false,
			validate_br_jez: false,
			validate_ram_num: false,
			validate_ram_sign: false,
			validate_ram: false,
			validate_gpu: false,
			validate_gpu_num: false,
			validate_gpu_sign: false,
			ime:''
		}
	},
	template:`
	<div >
	<div class="background" v-if="active">
             <div style="text-align: right; font-size: large;">
              <router-link to="/profil" style="width: 10px;height: 5px; margin: 5px;" v-on:click.native="a_clicked($event)"> Profil </router-link>
               <router-link to="/" v-on:click.native="logOut($event)" style="width: 10px;height: 5px; margin: 5px;"> Log out </router-link>
            </div>
            <h1 style="font-size: xx-large; ">Welcome to Cloud</h1>
            <div class="navbar">
                <div class="dropdown">
                  <button class="dropbtn">Virtual Machines
                  </button>
                  <div class="dropdown-content">
                    <a href="#/VMView" v-on:click="a_clicked($event)">View VM's</a>
                  </div>
                </div>
                <div class="dropdown">
                    <button v-if="active_superadmin" class="dropbtn">Organizations 
                    </button>
                    <div class="dropdown-content">
                      <a href="#/OrganizationView" v-on:click="a_clicked($event)">View organizations</a>
                    </div>
                  </div>
                  <div class="dropdown" v-if="active.uloga !== 'korisnik'">
                    <button class="dropbtn">Users
                    </button>
                    <div class="dropdown-content">
                      <a href="#/UserView" v-on:click="a_clicked($event)">View users</a>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button class="dropbtn">Discs
                    </button>
                    <div class="dropdown-content">
                      <a href="#/DiscView" v-on:click="a_clicked($event)">View discs</a>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button v-if="active_superadmin" class="dropbtn">Categories
                    </button>
                    <div class="dropdown-content">
                      <a href="#/CategoryView" v-on:click="a_clicked($event)">View categories</a>
                    </div>
                  </div>
                  <div class="dropdown" v-if="active.uloga === 'admin'">
                    <button class="dropbtn">Monthly receipt
                    </button>
                    <div class="dropdown-content">
                      <a href="#/MonthlyReceipt">Get Monthly Receipt</a>
                    </div>
                  </div>
              </div>            
        </div>

		<form id="form" class="login_form" method="post">
		<table class="poravnaj"  v-if="kat">
			<tr>
				<td>Name:</td>
				<td><input type="text" name="ime" v-model="kat.ime"></input></td>
				<td><label v-if="validate_name">Field can't be empty!</label>
				<label v-else-if="validate_name_exist">Name already taken!</label></td>
			</tr>
			<tr>
				<td>Num of Cores:</td>
				<td><input type="text" name="jezgra" v-model="kat.br_jezgara"></input></td>
				<td><label v-if="validate_br_jez">Field can't be empty!</label>
				<label v-else-if="validate_br_jez_num">Not a number!</label>
				<label v-else-if="validate_br_jez_sign">Number can't be negative or 0!</label></td>
			</tr>
			<tr>
				<td>RAM:</td>
				<td><input type="text" name="ram" v-model="kat.RAM"></input></td>
				<td><label v-if="validate_ram">Field can't be empty!</label>
				<label v-else-if="validate_ram_num">Not a number!</label>
				<label v-else-if="validate_ram_sign">Number can't be negative or 0!</label></td>
			</tr>
			<tr>
				<td>GPU:</td>
				<td><input type="text" name="gpu" v-model="kat.GPU"></input></td>
				<td><label v-if="validate_gpu">Field can't be empty!</label>
				<label v-else-if="validate_gpu_num">Not a number!</label>
				<label v-else-if="validate_gpu_sign">Number can't be negative or 0!</label></td>
			</tr>
			<tr>
			<td>
				<button class="dugme" type="submit" v-on:click="save(kat, ime)">Save</button>
			</td>
			<td>
				<button class="dugme" type="submit" v-on:click="cancel()">Back</button>
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
		a_clicked(event)
		{
			
			if (confirm('If you go back, your changes won\'t be saved, go back?') == false) {
				event.preventDefault()
			}
		},
		
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
			if(isNaN(kat.GPU))
			{
				this.validate_gpu_num = true;
			}
			else
			{
				this.validate_gpu_num = false;
			}
			
			if(!this.validate_br_jez_num && !this.validate_ram_num && !this.validate_gpu_num)
			{
				if(parseInt(kat.br_jezgara) <= 0)
				{
					this.validate_br_jez_sign = true;
				}
				else
				{
					this.validate_br_jez_sign = false;
				}
				
				if(parseInt(kat.RAM) <= 0)
				{
					this.validate_ram_sign = true;
				}
				else
				{
					this.validate_ram_sign = false;
				}
				
				if(parseInt(kat.GPU) <= 0)
				{
					this.validate_gpu_sign = true;
				}
				else
				{
					this.validate_gpu_sign = false;
				}
				axios
				.post('rest/kategorije/Izmena', {ime:''+kat.ime, br_jezgara: kat.br_jezgara, RAM: kat.RAM, GPU: kat.GPU}, {params:{imeOld:''+ime}})
				.then(response => {
						toast('Category (' + kat.ime + ') information is saved!');
						this.$router.push({ name: 'CategoryView' });
						
				}, error =>{
					if(error.response.data.toString() === ("202"))
					{
						this.validate_name_exist = true; 
					}
					
				});	
			}
			
		},
		
		cancel : function()
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			
			if (confirm('If you go back, your changes won\'t be saved, go back?') == true){
				this.$router.push({ name: 'CategoryView' });
			}
			
		},
		
		deleteKat : function(ime)
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
      		console.log(ime)
			axios
			.post('rest/kategorije/Brisanje', {"ime":''+ime})
			.then(response=> {
				if(response.data.toString() === ("OK"))
				{
					toast('Category (' + ime + ') is deleted!');
					this.$router.push({ name: 'CategoryView' });
				}
			}, error => {toast('Category (' + ime + ') can\'t be deleted!');})
		
		},
	
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
		isForbidden : function(active)
		{
			if (active == null)
			{
				this.$router.push({ name: 'forbidden' })
			}
			else if(active.uloga !== 'superadmin')
			{
				this.$router.push({ name: 'forbidden' })
			}
			else
			{
			axios
			.post('rest/forbidden', {'salje': 'kategorijaIzmena'}).then(response => {
				if(response.data.toString() !== ("OK"))
				{
					this.$router.push({ name: 'forbidden' })
				}
			});
			}
		}
	},
	mounted()
	{	
		if(this.$route.params.kat_ime) 
		{
			this.ime = this.$route.params.kat_ime;
			
		}
		axios
			.get('rest/kategorije/getKategorija', { params: {"ime":''+this.ime}})
			.then(response =>{
				this.kat = response.data
		},error => {this.$router.push({ name: 'forbidden' })});	
		
		axios
		.get('rest/korisnici/getActiveUser')
		.then(response =>{
			this.active = response.data;
			if (this.active.uloga === "superadmin"){
				this.active_superadmin = true;
			}
			else
			{
				this.active_superadmin = false;
			}
			this.isForbidden(response.data)
		});
	}
});