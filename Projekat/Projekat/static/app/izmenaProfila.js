Vue.component("izmena-profila", {
	data: function (){
		return {
		kor: null,
		korOld:null
		}
	},
	template:`
	<div class="poravnaj">
		<table class="tabela">
			<tr>
				<td>Email:</td>
				<td>{{kor.email}}</td>
			</tr>
			<tr>
				<td>Ime:</td>
				<td><intput v-model=kor>{{kor.ime}}</td>
			</tr>
			<tr>
				<td>Prezime:</td>
				<td><intput v-model=kor>{{kor.prezime}}</td>
			</tr>
			<tr>
				<td>Organizacija:</td>
				<td >{{kor.organizacija.ime}}</td>
			</tr>
			<tr>
				<td>Uloga:</td>
				<td>
					<select v-model="selected">
						<option v-for="k in uloge">{{k}}</option>		
					</select>
				</td>
			<tr>
				<td>
					<form action="#/korisnici">
						<button type="submit" v-on:click="sacuvaj">Sacuvaj</button>
					</form>
				</td>
				
				<td>
					<form action="#/korisnici">
						<button type="submit" v-on:click="ponisti" >Ponisti</button>
					</form>
				</td>
			</tr>
		</table>
		<br>
		<form action="#/korisnici">
			<button type="submit" v-on:click="obrisi" >Obrisi korisnika</button>
		</form>
	</div>
	`	
	,
	methods: {
		sacuvaj : function()
		{
			if(this.kor.ime.length === 0 || this.kor.prezime.lenght === 0)
			{
				//toast-bootstrap
			}
			else
			{
				axios
				.post('rest/kosiniciIzmena', {kor})
				//.then(response => (toast())) toast
				
			}
			
		},
		
		ponisti : function()
		{
			axios
			.post('rest/kosinici/Izmena', {korOld})
				//.then(response => (toast())) toast
		}

	},
	mounted()
	{
		axios
			.get('rest/korisnici/getKorisnik')
			.then(response =>{
				this.kor = response.data,
				this.korOld = response.data,
				this.selected = this.kor.uloga;
			});
	}
	
});