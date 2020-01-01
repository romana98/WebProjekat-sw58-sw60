const login = {template: '<login></login>'}
const VMView = {template: '<VMView></VMView>'}
const izmenaOrganizacija = {template: '<izmena-organizacija></izmena-organizacija>'}
const izmenaBrisanjeKorisnika = {template: '<izmena-bisanje-korisnika></izmena-bisanje-korisnika>'}
const izmenaProfila = {template: '<izmena-profila></izmena-profila>'}


const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/login', component: login},
	    { path: '/IzOrg', component: izmenaOrganizacija },
	    { path: '/IzBrKor', component: izmenaBrisanjeKorisnika },
	    { path: '/IzProf', component: izmenaProfila },
	    { path: '/VMView', component: VMView }
	  ]
});

var app = new Vue({
	router,
	el: '#webApp'
});
