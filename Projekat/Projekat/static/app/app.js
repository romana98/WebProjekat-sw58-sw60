const logIn = {}
const pregledVM = {}
//TODO dodati za sve funckionalnosti
const izmenaOrganizacija = {template: '<izmena-organizacija></izmena-organizacija>'}
const izmenaBrisanjeKorisnika = {template: '<izmena-bisanje-korisnika></izmena-bisanje-korisnika>'}
const izmenaProfila = {template: '<izmena-profila></izmena-profila>'}


const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: logIn},
	    { path: '/IzOrg', component: izmenaOrganizacija },
	    { path: '/IzBrKor', component: izmenaBrisanjeKorisnika },
	    { path: '/IzProf', component: izmenaProfila }
	  ]
});

var app = new Vue({
	router,
	el: '#webApp'
});
