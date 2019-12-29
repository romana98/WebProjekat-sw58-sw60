const logIn = {}
const pregledVM = {}
//TODO dodati za sve funckionalnosti
const izmenaOrganizacije = {template: '<izmena-ogranizacija></izmena-ogranizacija>'}
const izmenaBrisanjeKorisnika = {template: '<izmena-bisanje-korisnik></izmena-bisanje-korisnik>'}
const izmenaProfila = {template: '<izmena-profila></izmena-profila>'}


const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: logIn},
	    { path: '/IzOrg', component: izmenaOrganizacija }
	    { path: '/IzBrKor', component izmenaBrisanjeKorisnika }
	    { patj: '/IzProf', component izmenaProfila }
	  ]
});

var app = new Vue({
	router,
	el: '#webApp'
});
