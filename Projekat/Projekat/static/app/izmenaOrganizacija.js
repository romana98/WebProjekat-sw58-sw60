Vue.component("izmena-organizacija", {
	data: function (){
		return {
		org: null,
		}
	},
	template:`
	<div class="poravnaj">
		<table  v-if="org">
			<tr>
				<td>Ime:</td>
				<td><input type="text" name="ime" v-model="org.ime"></input></td>
			</tr>
			<tr>
				<td>Opis:</td>
				<td><input type="text" name="opis" v-model="org.opis"></input></td>
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
				<td>Korisnici:</td>
				<td>
					<select>
						<option v-for="k in org.korisnici">{{k.ime}} + " " + {{k.prezime}}</option>		
					</select>
				</td>
			</tr>
			<tr>
				<td>Resursi:</td>
				<td>
					<select>
						<option v-for="r in org.resursi">{{r.ime}}</option>		
					</select>
				</td>
			</tr>
			</table>
			<br />	
			
		<form action="#/organizacije" @submit="sacuvaj(org)" methods="post">
			<input type="submit" value="Sacuvaj"></input>
		</form>
		<form action="#/organizacije" @submit="ponisti()" methods="post">
			<input type="submit" value="Ponisti"></input>
		</form>
		
		<br>
		<input type="file" @change="onImg"></input>
		
		
		
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
		
		sacuvaj : function(org)
		{
			if(this.org.ime.length === 0 || this.org.opis.lenght === 0)
			{
				//toast-bootstrap
			}
			else
			{
				axios
				.post('rest/organizacije/Izmena', {"ime":''+org.ime, "opis":''+org.opis, "logo":''+org.logo})
				//.then(response => (toast())) toast
				
			}
			
		},
		
		ponisti : function()
		{
			axios
				.post('rest/organizacije/Izmena', {"ime":''})
				//.then(response => (toast())) toast
				
		}
		
	},
	mounted()
	{
		axios
			.get('rest/organizacije/getOrganizacija')
			.then(response =>{
				this.org = response.data
			});
	}
	
});