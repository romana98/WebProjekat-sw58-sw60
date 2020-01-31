Vue.component("login", {
	data: function (){
		return {
		active_user : null,
		nadjen_korisnik : null,
		email : '',
		password : '',
		Validation_email : false,
		Validation_password : false,
		returnData : "",
		notification : false
		}
	},
	template:`
	<div class="login">
            <h1 style="font-size: xx-large;">Welcome to Cloud</h1>
            <p>Login</p>
            <form id="form" class="login_form" action="#/VMView" method= "GET">
            	<label v-if="notification">{{returnData}}</label><br><br>
                <input type="text" name="email" placeholder="Email" v-model="email"/>
                <label v-if="Validation_email">You're missing field!</label><br><br>
                <input type="password" name="password" placeholder="Password"  v-model="password"/>
                <label v-if="Validation_password">You're missing field!</label><br> <br>
                <button type="submit" style="width: 150px; height: fit-content;" v-on:click="onSubmit">Login</button><br><br>
            </form>
        </div>
        
	`	
	,
	methods: {
		onSubmit : function()
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			if(this.email.length === 0 ){
				this.Validation_email = true;

			}
			else{
				this.Validation_email = false;
			}
			if(this.password.length === 0){
				this.Validation_password = true;
				
			}
			else{
				this.Validation_password = false;			
				}
			
			
			axios.get('rest/korisnici/getKorisnikByEmail', {params:{
														email : this.email,
														password : this.password
					
			}}).then(response =>{
				if (response.data.toString() === ("200")){
					this.notification = false;
					this.returnData = "";
					this.$router.push({ name: 'VMView' })

				}
				else if(response.data.toString() === ("201")){
					this.notification = false;
					this.returnData = "";
				}
				else{
					this.notification = true;
					this.returnData = response.data;
				}
			});		
			
			
			//sada kada sam proverio da nisu prazna polja treba proveriti da li postoji korisnik
			//to ce se desiti na backendu i ovde cu dobiti korisnika ili cu dobiti null
			//ovde cu samo dobiti ako je sve ok string "true" ili ako nesto fali sta fali i to proslediti u labelu
		}
	},
	mounted(){
		this.Validation_email = false;
		this.nadjeni_korisnik = null;
			
		
		
		axios.get('rest/korisnici/getActiveUser')
	        .then(response => {
	      	  if (response.data === null){
	      		  //iskuliraj
	      	  }
	      	  else{
					this.$router.push({ name: 'VMView' })

	      	  }
	        });
		
		
	}
	
});