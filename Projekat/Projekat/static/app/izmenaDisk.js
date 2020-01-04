Vue.component("izmena-disk", {
	data: function (){
		return {
		org: null,
		active:null,
		ime:null,
		validate_name: false,
		validate_desc: false,
		validate_name_exist: false
		}
	},
	template:`
	<div>
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
				      <img :src="org.logo" v-if="org.logo !== 'none'">
				      <p v-else>Nema logo...</p>
				     </output>
				 </td>
			</tr>
			<tr>
				<td>Users:</td>
				<td>
					<select>
						<option v-for="k in org.korisnici">{{k.ime}} {{k.prezime}}</option>		
					</select>
				</td>
			</tr>
			<tr>
				<td>Resurses:</td>
				<td>
					<select>
						<option v-for="r in org.resursi">{{r.ime}}</option>		
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
				<button class="dugme"  type="submit" v-on:click="cancel()">Cancel</button>	
			</td>
			</tr>
			
			</table>
			</form>
		
	</div>
	`	
	,
	methods: {
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
			this.org.logo = "none";
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
					if(response.data.toString() === ("200"))
					{
						toast('Organization (' + org.ime + ') information is saved!');		
					}
					else if(response.data.toString() === ("202"))
					{
						this.validate_name_exist = true; 
					}
				});
				
			
		},
		
		cancel : function()
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			
			if (confirm('Are you sure?') == true) {
				axios
				.post('rest/organizacije/Izmena', {"ime":''})
					.then(response=> {window.location.href = "#/VMView"})
			}	
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
			this.active = response.data
		});
	}
	
});