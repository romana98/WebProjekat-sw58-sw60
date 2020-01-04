Vue.component("izmena-vm", {
	data: function (){
		return {
			disk: null,
			validate_name: false,
			validate_name_exist: false,
			validate_date: false,
			ime:null,
			active:null,
			aktivnostVM:null
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
		<table class="poravnaj"  v-if="disk && active">
			<tr>
				<td>Name:</td>
				<td><input type="text" name="ime" v-model="vm.ime"></input></td>
				<td><label v-if="validate_name">You're missing field!</label>
				<label v-else-if="validate_name_exist">Name already taken!</label></td>
			</tr>
			<tr>
				<td>Disc type:</td>
				<td ></td>
			</tr>
			<tr>
				<td>Capacity:</td>
				<td >{{vm.kategorija.br_jezgara}}</td>
			</tr>
			<tr>
				<td>VM:</td>
				<td >{{disc.vm.ime}</td>
			</tr>
			<tr>
			<td>
				<button class="dugme" :disabled="active.uloga === 'korisnik'" type="submit" v-on:click="save(vm, ime)">Save</button>
			</td>
			<td>
				<button class="dugme" :disabled="active.uloga === 'korisnik'"  type="submit" v-on:click="cancel()">Cancel</button>
			</td>
			</tr>
			<tr>	
			<td>
				<button class="dugme" :disabled="active.uloga === 'korisnik'"  type="submit" v-on:click="deleteVM(vm.ime)">Delete VM</button>
			</td>
			<td v-if="active.uloga === 'admin' && aktivnost === ''">
				<button class="dugme" type="submit" v-on:click="changeStateOff()">Turn off VM</button>
			</td>
			<td v-else-if="active.uloga === 'admin' && aktivnost !== ''">
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
			
			document.getElementById("form").setAttribute("onsubmit","return false;");
			validate_name_exist: false
			
			if(vm.ime.length === 0 )
			{
				this.validate_name = true;					
			}
			else
			{
				this.validate_name = false;
			}

			for(d in vm.datumi)
			{
				let d_s = new Date(vm.datumi[d].start_Date);
				let d_f = new Date(vm.datumi[d].finish_Date);
				let isTrue = d_s.getTime() > d_f.getTime();
				if(isTrue)
				{
					this.validate_date = true;
				}
			}
			
			axios
			.post('rest/vm/Izmena',  {"ime":''+vm.ime, "datumi":vm.datumi}, {params:{"imeOld":''+ime, "datumi":vm.datumi}})
			.then(response => {
				if(response.data.toString() === ("200"))
				{
					toast('VM (' + vm.ime + ') information is saved!');		
				}
				else if(response.data.toString() === ("202"))
				{
					this.validate_name_exist = true; 
				}
			});	
			
		},
		
		cancel : function()
		{
			console.log(this.aktivnost)
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
				this.vm = response.data,
				this.aktivnost = this.vm.datumi[this.vm.datumi.length-1].finish_Date
			});	
		axios
		.get('rest/korisnici/getActiveUser')
		.then(response =>{
			this.active = response.data
		});
	}	
});