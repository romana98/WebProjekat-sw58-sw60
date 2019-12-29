Vue.component("izmena-organizacija", {
	data: function()
	{
		return{
			org: null,
			orgOld:null
		}
		
	}
	template:`
	<div>
		<table>
			<tr>
				<td>Ime:<td>
				<td>{{org.ime}}<td>
			</tr>
			<tr>
				<td>Opis:<td>
				<td>{{org.opis}}<td>
			</tr>
			<tr>
				<td>Logo:<td>
				<td>{{org.logo}}<td>
			</tr>
			<tr>
				<td>Korisnici:<td>
				<td>{{org.korisnici}}<td>
			</tr>
			<tr>
				<td>Resursi:<td>
				<td>{{org.resursi}}<td>
			</tr>
		</table>
	<div>
	`
		
	methods: {
		
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