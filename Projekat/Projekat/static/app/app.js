const login = {template: '<login></login>'}
const VMView = {template: '<VMView></VMView>'}
const AddVM = {template: '<AddVM></AddVM>'}
const izmenaOrganizacija = {template: '<izmena-organizacija></izmena-organizacija>'}
const izmenaBrisanjeKorisnika = {template: '<izmena-bisanje-korisnika></izmena-bisanje-korisnika>'}
const izmenaProfila = {template: '<izmena-profila></izmena-profila>'}


const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		  { path: '/login', name:'login', component: login},
		    { path: '/organization', name:'organization', component: izmenaOrganizacija }, //params.o
		    { path: '/user', name:'user', component: izmenaBrisanjeKorisnika },
		    { path: '/profil', name:'profil', component: izmenaProfila },
		    //{ path: '/vm', name:'vm', component: izmenaVM },
		    //{ path: '/disck', name:'disck', component: izmenaDisk },
		    //{ path: '/category', name:'category', component: izmenaKategorija },
		    { path: '/VMView', name:'VMView', component: VMView },
	    { path: '/addVM', name:'addVM', component: AddVM}
	  ]
});

var app = new Vue({
	router,
	el: '#webApp'
});
