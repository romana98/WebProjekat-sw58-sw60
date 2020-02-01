Vue.component("izmena-organizacija", {
	data: function (){
		return {
		org: null,
		active:null,
		ime:'',
		validate_name: false,
		validate_desc: false,
		validate_name_exist: false
		}
	},
	template:`
	<div>
		<div class="background" v-if="active">
             <div style="text-align: right; font-size: large;">
              <a href="#/profil" style="width: 10px;height: 5px; margin: 5px;" v-on:click="a_clicked($event)"> Profil </a>
               <a href="/" v-on:click="logOut($event)" style="width: 10px;height: 5px; margin: 5px;"> Log out </a>
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
		<table class="poravnaj" v-if="org && active">
			<tr>
				<td>Name:</td>
				<td><input type="text" name="ime" v-model="org.ime"></input></td>
				<td><label v-if="validate_name">You're missing field!</label>
				<label v-else-if="validate_name_exist">Name already taken!</label></td>
			</tr>
			<tr>
				<td>Description:</td>
				<td><input type="text" name="opis" v-model="org.opis"></input></td>
				<td><label v-if="validate_desc">You're missing field!</label></td>
			</tr>
			<tr>
				<td>Logo:</td>
				<td>
					<output>
				      <img :src="org.logo" v-if="org.logo !== ''">
				      <p v-else>Nema logo...</p>
				     </output>
				 </td>
			</tr>
			<tr>
				<td>Users:</td>
				<td>
					<select>
						<option v-for="k in org.korisnici">{{k}}</option>		
					</select>
				</td>
			</tr>
			<tr>
				<td>Resurses:</td>
				<td>
					<select>
						<option v-for="r in org.resursi">{{r}}</option>		
					</select>
				</td>
			</tr>
			
			<tr v-if="active.uloga==='superadmin'">
				<td>Upload new logo:</td>
				<td><input type="file" @change="onImg"></input></td>
			</tr>
			<tr v-if="active.uloga==='superadmin'">
				<td>Remove logo:</td>
				<button class="dugme"  type="submit" v-on:click="removeImg()">Remove</button>	
			</tr>
			
			<tr>
			<td>
				<button class="dugme" type="submit" v-on:click="save(org, ime)">Save</button>
			</td>
			<td>
				<button class="dugme"  type="submit" v-on:click="cancel()">Back</button>	
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
		onImg(event)
		{
			 const file = event.target.files[0];
		      if (!file) {
		        return false
		      }
		      if (!file.type.match('image.*')) {
		        return false
		      }
		      const reader = new FileReader()
		      const that = this
		      reader.onload = function (e) {
		        that.org.logo = e.target.result
		      }
		      reader.readAsDataURL(file);
		},
		
		removeImg : function()
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			this.org.logo = "";
		},
		
		save : function(org, ime)
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			this.validate_name_exist = false;
			if(org.ime.length === 0)
			{
				this.validate_name = true; 
			}
			else
			{
				this.validate_name = false; 
			}
			
			if(org.opis.length === 0)
			{
				this.validate_desc = true; 
			}
			else
			{
				this.validate_desc= false;
			}
			
				axios
				.post('rest/organizacije/Izmena', {"ime":''+org.ime, "opis":''+org.opis, "logo":''+org.logo}, {params:{imeOld:''+ime}})
				.then(response => {
					if(response.data.toString() === ("OK"))
						toast('Organization (' + org.ime + ') information is saved!');	
						this.$router.push({ name: 'OrganizationView' })
				}, error=>{
					if(error.response.data.toString() === ("202"))
					{
						this.validate_name_exist = true; 
					}
				});
				
			
		},
		
		cancel : function()
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			if (confirm('If you go back, your changes won\'t be saved, go back?') == true){
				this.$router.push({ name: 'OrganizationView' })
			}

			
		},
		
		logOut : function(event)
		{
			event.preventDefault();
			if (confirm('Are you sure?') == true) {
				axios.get('rest/logOut')
			}
			
		},
		
		isForbidden : function(active)
		{
			if (active == null)
			{
				this.$router.push({ name: 'forbidden' })
			}
			else if(active.uloga === 'korisnik')
			{
				this.$router.push({ name: 'forbidden' })
			}
			else
			{
			axios
			.post('rest/forbidden', {'salje': 'organizacijaIzmena'}).then(response => {
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
		
		if(this.$route.params.ime)
		{
			this.ime = this.$route.params.ime;
		}
		axios
			.get('rest/organizacije/getOrganizacija', { params: {"ime":''+this.ime}})
			
			.then(response =>{
				this.org = response.data
			});
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