const login = {template: '<login></login>'}
const VMView = {template: '<VMView></VMView>'}
const CategoryView = {template: '<CategoryView></CategoryView>'}
const DiscView = {template: '<DiscView></DiscView>'}
const OrganizationView = {template: '<OrganizationView></OrganizationView>'}
const UserView = {template: '<UserView></UserView>'}
const AddVM = {template: '<AddVM></AddVM>'}
const AddCategory = {template: '<AddCategory></AddCategory>'}
const AddDisc = {template: '<AddDisc></AddDisc>'}
const AddUser = {template: '<AddUser></AddUser>'}
const AddOrganization = {template: '<AddOrganization></AddOrganization>'}
const izmenaOrganizacija = {template: '<izmena-organizacija></izmena-organizacija>'}
const izmenaBrisanjeKorisnika = {template: '<izmena-brisanje-korisnika></izmena-brisanje-korisnika>'}
const izmenaProfila = {template: '<izmena-profila></izmena-profila>'}
const izmenaBrisanjeVM = {template: '<izmena-brisanje-vm></izmena-brisanje-vm>'}
const izmenaBrisanjeDisk = {template: '<izmena-brisanje-disk></izmena-brisanje-disk>'}
const izmenaBrisanjeKategorija = {template: '<izmena-brisanje-kategorija></izmena-brisanje-kategorija>'}
const MesecniRacun = {template: '<mesecni-racun></mesecni-racun>'}
const NotFound = {template: '<not-found></not-found>'}
const Forbidden = {template: '<forbidden></forbidden>'}
const BadRequest = {template: '<badrequest></badrequest>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		  	{ path: '/', name:'login', component: login},
		    { path: '/Organization', name:'organization', component: izmenaOrganizacija }, //params.ime
		    { path: '/User', name:'user', component: izmenaBrisanjeKorisnika }, //params.email
		    { path: '/Profil', name:'profil', component: izmenaProfila },
		    { path: '/Vm', name:'vm', component: izmenaBrisanjeVM }, //params.vm_ime
		    { path: '/Disc', name:'disc', component: izmenaBrisanjeDisk }, //params.disk_ime
		    { path: '/Category', name:'category', component: izmenaBrisanjeKategorija }, //params.kat_ime
		    { path: '/VMView', name:'VMView', component: VMView },
		    { path: '/UserView', name:'UserView', component: UserView },
		    { path: '/OrganizationView', name:'OrganizationView', component: OrganizationView },
		    { path: '/DiscView', name:'DiscView', component: DiscView },
		    { path: '/CategoryView', name:'CategoryView', component: CategoryView },
		    { path: '/AddVM', name:'addVM', component: AddVM},
		    { path: '/AddCategory', name:'addCategory', component: AddCategory},
		    { path: '/AddDisc', name:'addDisc', component: AddDisc},
		    { path: '/AddOrganization', name:'addOrganization', component: AddOrganization},
		    { path: '/AddUser', name:'addUser', component: AddUser},
		    { path: '/MonthlyReceipt', name:'monthly', component: MesecniRacun},
		    { path: '/Forbidden', name:'forbidden', component: Forbidden},
		    { path: '/BadRequest', name:'badrequest', component: BadRequest},
		    { path: '*', name:'notFound', component: NotFound}
	  ]
});

var app = new Vue({
	router,
	el: '#webApp'
});
