const login = {template: '<login></login>'}
const VMView = {template: '<VMView></VMView>'}
const AddVM = {template: '<AddVM></AddVM>'}
const izmenaOrganizacija = {template: '<izmena-organizacija></izmena-organizacija>'}
const izmenaBrisanjeKorisnika = {template: '<izmena-bisanje-korisnika></izmena-bisanje-korisnika>'}
const izmenaProfila = {template: '<izmena-profila></izmena-profila>'}
const izmenaVM = {template: '<izmena-vm></izmena-vm>'}
const izmenaDisk = {template: '<izmena-disk></izmena-disk>'}


const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		  { path: '/login', name:'login', component: login},
		    { path: '/organization', name:'organization', component: izmenaOrganizacija }, //params.ime
		    { path: '/user', name:'user', component: izmenaBrisanjeKorisnika }, //params.email
		    { path: '/profil', name:'profil', component: izmenaProfila },
		    { path: '/vm', name:'vm', component: izmenaVM }, //params.vm_ime
		    { path: '/disc', name:'disc', component: izmenaDisk }, //params.disk_ime
		    //{ path: '/category', name:'category', component: izmenaKategorija },
		    { path: '/VMView', name:'VMView', component: VMView },
	    { path: '/addVM', name:'addVM', component: AddVM}
	  ]
});

var app = new Vue({
	router,
	el: '#webApp'
});
