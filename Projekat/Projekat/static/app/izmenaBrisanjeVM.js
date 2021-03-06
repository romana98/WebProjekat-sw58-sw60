Vue.component("izmena-brisanje-vm", {
	data: function (){
		return {
			vm: null,
			validate_name: false,
			validate_name_exist: false,
			validate_date: false,
			validate_date1: false,
			validate_date2: false,
			name:'',
			ime:null,
			today:'',
			today_text:'',
			active:null,
			aktivnost:null,
			active_superadmin : null
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
		<table class="poravnaj"  v-if="vm && active">
			<tr>
				<td>Name:</td>
				<td v-if="active.uloga !== 'korisnik'"><input type="text" name="ime" v-model="vm.ime"></input></td>
				<td v-else>{{vm.ime}}</td>
				<td><label v-if="validate_name">Field can't be empty!</label>
				<label v-else-if="validate_name_exist">Name already taken!</label></td>
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
				<td><label v-if="validate_date">Finish date can't be before start date!</label>
				<label v-else-if="validate_date1">Finish date missing!</label>
				<label v-else-if="validate_date2">Start date missing!</label></td>
			</tr>
			<tr v-for="(d, index) in vm.datumi">
				<td ><input  type="datetime-local" :disabled="active.uloga !== 'superadmin'" :max="today" v-model="d.start_Date"></input></td>
				
				<td><input type="datetime-local" :disabled="active.uloga !== 'superadmin'" :max="today" v-model="d.finish_Date"></input></td>	
				
			</tr>
			<tr>
			<td>
				<button class="dugme" :disabled="active.uloga === 'korisnik'" type="submit" v-on:click="save(vm, ime)">Save</button>
			</td>
			<td>
				<button class="dugme" type="submit" v-on:click="cancel()">Back</button>
			</td>
			</tr>
			<tr>	
			<td>
				<button class="dugme" :disabled="active.uloga === 'korisnik'"  type="submit" v-on:click="deleteVM(vm.ime)">Delete VM</button>
			</td>
			<td v-if="active.uloga !== 'korisnik' && aktivnost === ''">
				<button class="dugme" type="submit" v-on:click="changeStateOff()">Turn off VM</button>
			</td>
			<td v-else-if="active.uloga !== 'korisnik' && aktivnost !== ''">
				<button class="dugme" type="submit" v-on:click="changeStateOn()">Turn on VM</button>
			</td>
			</tr>
			<tr>
			<td style="font-weight: bold;" colspan=2>Note: Date can't be later then: {{today_text}}</td>
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
		
		changeStateOn : function()
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			var new_dates = {start_Date: "", finish_Date: ""};
			new_dates.start_Date = this.getDate();
			this.vm.datumi.push(new_dates);
			this.aktivnost = "";
			
		},
		
		changeStateOff : function()
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			this.vm.datumi[this.vm.datumi.length-1].finish_Date = this.getDate();
			this.aktivnost = "off";
		},
		
		save : function(vm, ime)
		{
			var go = true;
			document.getElementById("form").setAttribute("onsubmit","return false;");
			this.validate_date = false;
			this.validate_date1 = false;
			this.validate_date2 = false;
			this.validate_name_exist = false;
			
			if(vm.ime.length === 0 )
			{
				this.validate_name = true;	
				go = false;
			}
			else
			{
				this.validate_name = false;
			}

			let iterations = vm.datumi.length-1
			for(d in vm.datumi)
			{
				let d_s = new Date(vm.datumi[d].start_Date);
				let d_f = new Date(vm.datumi[d].finish_Date);
				let isTrue = d_s.getTime() > d_f.getTime();
			
				if(isTrue)
				{
					this.validate_date = true;
					go = false;
				}
				
				if (d_f == 'Invalid Date' && --iterations && d_s != 'Invalid Date')
				{
					this.validate_date1 = true;
					go = false;
				}
				if (d_s == 'Invalid Date' && d_f != 'Invalid Date')
				{
					this.validate_date2 = true;
					go = false;
				}
			        
			}
			if(go)
			{
				axios
				.post('rest/vm/Izmena',  {"ime":''+vm.ime, "datumi":vm.datumi}, {params:{"imeOld":''+ime}})
				.then(response => {
						toast('VM (' + vm.ime + ') information is saved!');
						this.$router.push({ name: 'VMView' })
				}, error=>{
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
			console.log(this.active)
			if(this.active.uloga === 'korisnik')
			{
				this.$router.push({ name: 'VMView' })
			}
			else
			if (confirm('If you go back, your changes won\'t be saved, go back?') == true){
				this.$router.push({ name: 'VMView' })
			}
			
		},
		
		deleteVM : function(ime)
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
      		
			axios
			.post('rest/vm/Brisanje', {"ime":''+ime})
			.then(response=> {
				toast('VM (' + ime + ') deleted!'),
				this.$router.push({ name: 'VMView' })},
				error => {toast('VM doesn\'t exist!')})
		
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
			.post('rest/forbidden', {'salje': 'vmIzmena'}).then(response => {
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
		
		this.today = this.getDate();
		let date_time = this.today.split('T');
		this.today_text = date_time[0] + ', ' + date_time[1];
		
		if(this.$route.params.vm_ime) 
		{
			this.ime = this.$route.params.vm_ime;
		}
		axios
			.get('rest/virtualne/getVM', { params: {"ime":''+this.ime}})
			.then(response =>{
				this.vm = response.data;
				if(response.data.datumi.length !== 0)
				{
					this.aktivnost = response.data.datumi[this.vm.datumi.length-1].finish_Date
				}
				else
				{
					this.aktivnost = "off";
				}
				
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