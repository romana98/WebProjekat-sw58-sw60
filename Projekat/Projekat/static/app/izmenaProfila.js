Vue.component("izmena-profila", {
	data: function (){
		return {
		kor: null,
		loz: '',
		uloge: ['superadmin', 'admin', 'korisnik']
		}
	},
	template:`
	<div class="poravnaj">
		<table class="tabela"   v-if="kor">
			<tr>
				<td>Email:</td>
				<td>{{kor.email}}</td>
			</tr>
			<tr>
				<td>Ime:</td>
				<td><input v-model=kor.ime></input></td>
			</tr>
			<tr>
				<td>Prezime:</td>
				<td><input v-model=kor.prezime></input></td>
			</tr>
			<tr>
				<td>Lozinka:</td>
				<td><input v-model=kor.lozinka></input></td>
			</tr>
			<tr>
				<td>Lozinka ponovi:</td>
				<td><input v-model=loz></input></td>
			</tr>
			<tr>
				<td>Organizacija:</td>
				<td >{{kor.organizacija.ime}}</td>
			</tr>
			<tr>
				<td>Uloga:</td>
				<td>
					<select v-model="kor.uloga">
						<option v-for="k in uloge">{{k}}</option>		
					</select>
				</td>
			</tr>
		</table>
		<br/>
		<form action="#/korisnici" @submit="sacuvaj(kor, loz)" methods="post">
			<input type="submit" value="Sacuvaj"></input>
		</form>
		<form action="#/korisnici" @submit="ponisti()" methods="post">
			<input type="submit" value="Ponisti"></input>
		</form>
	</div>
	`	
	,
	methods: {
		sacuvaj : function(kor, loz)
		{
			if(kor.ime.length === 0 || kor.prezime.lenght === 0 || kor.lozinka.lenght === 0)
			{
				//toast-bootstrap
			}
			else
			{
				if(kor.lozinka !== loz)
				{
					axios
					.post('rest/korisnici/Izmena', {"email":''+kor.email, "ime" : ''+ kor.ime, "prezime":''+kor.prezime, "lozinka":''+kor.lozinka, "uloga":''+kor.uloga})
					//.then(response => (toast())) toast
									
				}
				else
				{
				
				}	
			}	
		},
		
		ponisti : function()
		{
			axios
			.post('rest/korisnici/Izmena', {"email":''})
				//.then(response => (toast())) toast
		}

	},
	mounted()
	{
		axios
			.get('rest/korisnici/getKorisnik')
			.then(response =>{
				this.kor = response.data
			});
	}
	
});