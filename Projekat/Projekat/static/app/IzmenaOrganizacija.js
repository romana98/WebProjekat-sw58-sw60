Vue.component("izmena-organizacija", {
	data: function (){
		return {
		org: null,
		orgOld: null
		}
	},
	template:`
	<div class="poravnaj">
		<table class="tabela" border="1">
			<tr>
				<td>Ime:</td>
				<td><input type="text" name="ime" v-model=org>{{org.ime}}</input></td>
			</tr>
			<tr>
				<td>Opis:</td>
				<td><input type="text" name="opis" v-model=org>{{org.opis}}</input></td>
			</tr>
			<tr>
				<td>Logo:</td>
				<td><img src="{{org.logo}}"></td>
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
						<option v-for="o in org.resursi">{{o.ime}}</option>		
					</select>
				</td>
			</tr>	
			<tr>
				<td>
					<form action="#/organizacije">
						<button type="submit" v-on:click="sacuvaj">Sacuvaj</button>
					</form>
				</td>
				
				<td>
					<form action="#/organizacije">
						<button type="submit" v-on:click="ponisti" >Ponisti</button>
					</form>
				</td>
			</tr>
		</table>
		<br>
		<p>Nov logo:</p>
		<input type="file" @change="onImg"></input>
		
	</div>
	`	
	,
	methods: {
		onImg(event)
		{
			//dodati if else u odnosu na korisnika
			const file = event.target.files;
			this.createImg(file[0]);
		},
		
		createImg(file)
		{
			let image = new Image();
			let reader = new FileReader();
			
			reader.onload = function(event) {
				this.org.logo = event.target.result;
			};
			
			reader.readAsDataURL(file);
		},
		
		sacuvaj : function()
		{
			if(this.org.ime.length === 0 || this.org.opis.lenght === 0)
			{
				//toast-bootstrap
			}
			else
			{
				axios
				.post('rest/organizacije/Izmena', {org})
				//.then(response => (toast())) toast
				
			}
			
		},
		
		ponisti : function()
		{
			axios
				.post('rest/organizacije/Izmena', {orgOld})
				//.then(response => (toast())) toast
				
		}
		
	},
	mounted()
	{
		axios
			.get('rest/organizacije/getOrganizacija')
			.then(response =>{
				this.org = response.data,
				this.orgOld = response.data;
			});
	}
	
});