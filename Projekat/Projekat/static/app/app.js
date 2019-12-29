const logIn = {}
const pregledVM = {}
//TODO dodati za sve funckionalnosti
const izmenaOrganizacije = {template: '<izmena-ogranizacija></izmena-ogranizacija>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: logIn},
	    { path: '/IzOrg', component: izmenaOrganizacija }
	  ]
});

var app = new Vue({
	router,
	el: '#webApp'
});
