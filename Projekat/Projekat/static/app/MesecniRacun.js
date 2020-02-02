Vue.component("mesecni-racun", {
	data: function (){
		return {
			d:{start_Date:'', finish_Date:''},
			validate_date: false,
			validate_date_s: false,
			validate_date_f: false,
			today:'',
			today_text:'',
			active:null,
			resursi:null,
			suma:0,
			isDates:false,
			message:'',
			sum:0
		}
	},
	template:`
	<div >
	<div class="background" v-if="active">
             <div style="text-align: right; font-size: large;">
              <router-link to="/profil" style="width: 10px;height: 5px; margin: 5px;" v-on:click.native="a_clicked($event)"> Profil </router-link>
               <router-link to="/" v-on:click.native="logOut($event)" style="width: 10px;height: 5px; margin: 5px;"> Log out </router-link>
            </div>
            <h1 style="font-size: xx-large; ">Welcome to Cloud</h1>
            <div class="navbar">
                <div class="dropdown">
                  <button class="dropbtn">Virtual Machines
                  </button>
                  <div class="dropdown-content">
                    <a href="#/VMView">View VM's</a>
                  </div>
                </div>
                <div class="dropdown">
                    <button v-if="active_superadmin" class="dropbtn">Organizations 
                    </button>
                    <div class="dropdown-content">
                      <a href="#/OrganizationView">View organizations</a>
                    </div>
                  </div>
                  <div class="dropdown" v-if="active.uloga !== 'korisnik'">
                    <button class="dropbtn">Users
                    </button>
                    <div class="dropdown-content">
                      <a href="#/UserView">View users</a>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button class="dropbtn">Discs
                    </button>
                    <div class="dropdown-content">
                      <a href="#/DiscView">View discs</a>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button v-if="active_superadmin" class="dropbtn">Categories
                    </button>
                    <div class="dropdown-content">
                      <a href="#/CategoryView">View categories</a>
                    </div>
                  </div>
                  <div class="dropdown" v-if="active.uloga === 'admin'">
                    <button class="dropbtn">Monthly receipt
                    </button>
                    <div class="dropdown-content">
                      <a href="#/MonthlyReceipt">Get Monthly Receipt</a>
                    </div>
                  </div>
              </div>            
        </div>

		<form id="form" class="login_form" method="post">
		<table class="poravnaj"  v-if="active">
			<tr>
			<td style="font-weight: bold;" colspan=2>Note: Date can't be later then: {{today_text}}</td>
			</tr>
			<tr>
				<td>Start date:</td>
				<td>Finish date:</td>
			</tr>
			<tr>
				<td><input type="datetime-local" :max="today" v-model="d.start_Date"></input></td>
				<td><input type="datetime-local" :max="today" v-model="d.finish_Date"></input></td>	
			</tr>
			<tr v-if="validate_date">
				<td  colspan=2><label>Finish date can't be before start date!</label></td>
			</tr>
			<tr v-if="validate_date_s">
				<td  colspan=2><label>Start date is invalid!</label></td>
			</tr>
			<tr v-if="validate_date_f">
				<td  colspan=2><label>Finish date is invalid!</label></td>
			</tr>
			<tr>
			<td>
				<button class="dugme" type="submit" v-on:click="getTable(d)">Submit</button>
			</td>
			</tr>
		</table>
		
		<br><br>
		
		<table class="poravnajOboj"  v-if="isDates && resursi">
			<tr>
	            <th>Ime</th>
	            <th>Cena</th>
	        </tr>
	        <tr v-for="(value, key) in resursi">	
	        <td>{{key}}</td>
	        <td>{{value}}</td>
			</tr>
			<tr>
				<td style="font-weight: bold;">SUM:</td>
				<td>{{sum}}</td>
			</tr>
		</table>
		<br><br>
	</form>
	<div class="poravnajDiv">
	<button class="dugme" type="submit" v-on:click="cancel()">Back</button>
	</div>
	</div>
	`	
	,
	methods: {
		logOut : function(event)
		{
			if (confirm('Are you sure?') == true) {
				axios.get('rest/logOut')
			}
			else
			{
				event.preventDefault();
			}
		},
		cancel()
		{
			this.$router.push({ name: 'VMView' })
		},
		getTable(d)
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			this.validate_date = false;
			this.isDates = false;
			
			let d_s = new Date(d.start_Date);
			let d_f = new Date(d.finish_Date);
			let isTrue = d_s.getTime() > d_f.getTime();
			if(isTrue)
			{
				this.validate_date = true;
			}
			if(d_s.toDateString() ==='Invalid Date')
			{
				this.validate_date_s = true;
			}
			else
			{
				this.validate_date_s = false;
			}
			if(d_f.toDateString() ==='Invalid Date')
			{
				this.validate_date_f = true;
			}
			else
			{
				this.validate_date_f = false;
			}
			
			
			if(!this.validate_date && d_s.toDateString() !=='Invalid Date' && d_f.toDateString() !=='Invalid Date')
			{
				axios
				.post('rest/mesecni/getMesecniRacun',  {"start_Date":d.start_Date, "finish_Date":d.finish_Date})
				.then(response => {
						this.resursi = response.data;
						this.isDates = true;
						for (var key in this.resursi) {
							this.sum += this.resursi[key];
						}
				}, error=>{this.message = "There are no reports for selected period!";});	
			}
		},
		getDate()
		{
			var date = new Date();
			var day = date.getDate();
			var month = date.getMonth()+1;
			var hours = date.getHours();
			var minutes = date.getMinutes();
			if(date.getMinutes() < 10)
			{
				minutes = '0'+date.getMinutes();
			}
			if(date.getHours() < 10)
			{
				hours = '0'+date.getHours();
			}
			if(date.getDate() < 10)
			{
				day = '0'+date.getDate();
			}
			if(date.getMonth()+1 < 10)
			{
				month = '0'+(date.getMonth()+1);		
			}
			return date.getFullYear()+'-'+month+'-'+day +'T' +hours + ':' + minutes;
		},
		
		isForbidden : function(active)
		{
			if (active == null)
			{
				this.$router.push({ name: 'forbidden' })
			}
			else if(active.uloga !== 'admin')
			{
				this.$router.push({ name: 'forbidden' })
			}
			else
			{
			axios
			.post('rest/forbidden', {'salje': 'mesecni'}).then(response => {
				if(response.data.toString() !== ("OK"))
				{
					this.$router.push({ name: 'forbidden' })
				}
			});
			}
			
		}
		
	},
	mounted()
	{
		
		this.today = this.getDate();
		let date_time = this.today.split('T');
		this.today_text = date_time[0] + ', ' + date_time[1];
		
		
		axios
		.get('rest/korisnici/getActiveUser')
		.then(response =>{
			this.active = response.data;
			if (this.active.uloga === "superadmin"){
				this.active_superadmin = true;
			}
			else
			{
				this.active_superadmin = false;
			}
			this.isForbidden(response.data)
		});
	}	
});