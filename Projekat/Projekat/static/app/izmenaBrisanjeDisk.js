Vue.component("izmena-brisanje-disk", {
	data: function (){
		return {
			disk: null,
			validate_name: false,
			validate_name_exist: false,
			validate_kapacitet_num: false,
			validate_kapacitet: false,
			ime:'',
			active:null,
			aktivnost:null,
			tipovi: ['hdd', 'ssd']
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
                  <div class="dropdown">
                    <button class="dropbtn" v-if="active.uloga !== 'korisnik'">Users
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
		<table class="poravnaj"  v-if="disk && active">
			<tr>
				<td>Name:</td>
				<td  v-if="active.uloga !== 'korisnik'"><input type="text" name="ime" v-model="disk.ime"></input></td>
				<td v-else>{{disk.ime}}</td>
				<td><label v-if="validate_name">You're missing field!</label>
				<label v-else-if="validate_name_exist">Name already taken!</label></td>
			</tr>
			<tr>
				<td>Disc type:</td>
				<td>
					<select v-model="disk.tip">
						<option v-for="t in tipovi">{{t}}</option>		
					</select>
				</td>
			</tr>
			<tr>
				<td>Capacity:</td>
				<td ><input :disabled="active.uloga === 'korisnik'" type="text" name="kapacitet" v-model="disk.kapacitet"></input></td>
				<td><label v-if="validate_kapacitet">You're missing field!</label>
				<label v-else-if="validate_kapacitet_num">Not a number!</label></td>
			</tr>
			<tr>
				<td>VM:</td>
				<td >{{disk.mojaVirtualnaMasina.ime}}</td>
			</tr>
			<tr>
			<td>
				<button class="dugme" :disabled="active.uloga === 'korisnik'" type="submit" v-on:click="save(disk, ime)">Save</button>
			</td>
			<td>
				<button class="dugme" type="submit" v-on:click="cancel()">Back</button>
			</td>
			</tr>
			<tr>	
			<td v-if="active.uloga === 'superadmin'">
				<button class="dugme" type="submit" v-on:click="deleteDisc(disk.ime)">Delete Disc</button>
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
		
		save : function(disk, ime)
		{
			
			document.getElementById("form").setAttribute("onsubmit","return false;");
			validate_name_exist: false
			
			if(disk.ime.length === 0 )
			{
				this.validate_name = true;					
			}
			else
			{
				this.validate_name = false;
			}
			if(disk.kapacitet.length === 0 )
			{
				this.validate_kapacitet = true;					
			}
			else
			{
				this.validate_kapacitet = false;
			}
			
			if(isNaN(disk.kapacitet))
			{
				this.validate_kapacitet_num = true;
			}
			else
			{
				this.validate_kapacitet_num = false;
			
				axios
				.post('rest/diskovi/Izmena',  {ime:''+disk.ime, tip:''+disk.tip, kapacitet:''+disk.kapacitet, mojaVirtualnaMasina: disk.mojaVirtualnaMasina}, {params:{imeOld:''+ime}})
				.then(response => {
						toast('Disc (' + disk.ime + ') information is saved!');	
						this.$router.push({ name: 'DiscView' })
					
				}, error=>{
					if(error.response.data.toString() === ("202"))
				{
					this.validate_name_exist = true; 
				}});	
			}
		},
		
		cancel : function()
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			
			if(this.active.uloga === 'korisnik')
			{
				this.$router.push({ name: 'DiscView' })
			}
			else
			if (confirm('If you go back, your changes won\'t be saved, go back?') == true){
				this.$router.push({ name: 'DiscView' })
			}
			
			
		},
		
		deleteDisc : function(ime)
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
      		
			axios
			.post('rest/diskovi/Brisanje', {"ime":''+ime})
			.then(response=> {
				toast('Disk (' + ime + ') deleted!'),
				this.$router.push({ name: 'DiscView' })},
				error => {toast('Disc doesn\'t exist!')})
		
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
		getDate()
		{
			var date = new Date();
			var day = date.getDate();
			var month = date.getMonth()+1;
			var hours = date.getHours();
			var minutes = date.getMinutes();
			if(date.getMinutes() < 10)
			{
				minutes = '0'+date.getMinutes();
			}
			if(date.getHours() < 10)
			{
				hours = '0'+date.getHours();
			}
			if(date.getDate() < 10)
			{
				day = '0'+date.getDate();
			}
			if(date.getMonth()+1 < 10)
			{
				month = '0'+(date.getMonth()+1);		
			}
			return date.getFullYear()+'-'+month+'-'+day +'T' +hours + ':' + minutes;
		},
		isForbidden : function(active)
		{
			if (active == null)
			{
				this.$router.push({ name: 'forbidden' })
			}
			else
			{
			axios
			.post('rest/forbidden', {'salje': 'diskIzmena'}).then(response => {
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
		
	
		if(this.$route.params.disk_ime) 
		{
			this.ime = this.$route.params.disk_ime;
			
		}
		axios
			.get('rest/diskovi/getDisk', { params: {"ime":''+this.ime}})
			.then(response =>{
				this.disk = response.data,
				this.aktivnost = this.disk.mojaVirtualnaMasina.datumi[this.disk.mojaVirtualnaMasina.datumi.length-1].finish_Date
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