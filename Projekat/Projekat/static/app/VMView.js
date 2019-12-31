Vue.component("VMView", {
	data: function (){
		return {
		email: "",
		user : null
		}
	},
	template:`
	<div class="login">
            <h1 style="font-size: xx-large;">Welcome to Cloud</h1>
            <p>Login</p>
            <form id="form" class="login_form" action="false" method= "GET">
            	<label>User {{this.user}} is logged in</label>
            </form>
        </div>
        
	`	
	,
	methods: {
		
		
	},
	
	mounted(){
		axios
        .get('rest/korisnici/getActiveUser')
        .then(response => {
      	  this.user = response.data;
        });
	}
	
	
});