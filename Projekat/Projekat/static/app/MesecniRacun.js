Vue.component("mesecni-racun", {
	data: function (){
		return {
			d:{start_Date:'', finish_Date:''},
			validate_date: false,
			today:'',
			today_text:'',
			active:null,
			resursi:null,
			suma:0,
			isDates:false,
			message:''
		}
	},
	template:`
	<div >
	<div class="background" v-if="active">
             <div style="text-align: right; font-size: large;">
              <a href="#/profil" style="width: 10px;height: 5px; margin: 5px;"> Profil </a>
               <a href="#/login" v-on:click="logOut()" style="width: 10px;height: 5px; margin: 5px;"> Log out </a>
            </div>
            <h1 style="font-size: xx-large; ">Welcome to Cloud</h1>
            <div class="navbar">
                <div class="dropdown">
                  <button class="dropbtn">Virtual Machines
                  </button>
                  <div class="dropdown-content">
                    <a href="#/VMView" >View VM's</a>
                  </div>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Organizations 
                    </button>
                    <div class="dropdown-content">
                      <a href="#/OrganizationView" >View organizations</a>
                    </div>
                  </div>
                  <div class="dropdown">
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
                    <button class="dropbtn">Categories
                    </button>
                    <div class="dropdown-content">
                      <a href="#/CategoryView" >View categories</a>
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
			<tr>
			<td>
				<button class="dugme" type="submit" v-on:click="getTable(d)">Submit</button>
			</td>
			</tr>
		</table>
		
		<br><br>
		
		<table class="poravnaj TableView"  v-if="isDates">
			<tr>
	            <th>Ime</th>
	            <th>Cena</th>
	        </tr>
	        <tr v-for="[ime, cena] of resursi">	
	        <td>{{ime}}</td>
            <td>{{cena}}</td>
			</tr>
			<tr>
			<td>
				<button class="dugme" type="submit" v-on:click="cancel()">Back</button>
			</td>
			</tr>
		</table>
	</form>
	
	</div>
	`	
	,
	methods: {
		logOut : function()
		{
			
			if (confirm('Are you sure?') == true) {
				axios.get('rest/logOut')
			}
		},
		getTable(d)
		{
			document.getElementById("form").setAttribute("onsubmit","return false;");
			this.validate_date = false;
			
			let d_s = new Date(d.start_Date);
			let d_f = new Date(d.finish_Date);
			let isTrue = d_s.getTime() > d_f.getTime();
			if(isTrue)
			{
				this.validate_date = true;
			}
			
			if(!this.validate_date)
			{
				axios
				.post('rest/mesecni/getMesecniRacun',  {"start_Date":d.start_Date, "finish_Date":d.finish_Date})
				.then(response => {
					if(response.data.toString() === ("201"))
					{
						this.message = "There are no reports for selected period!";
					}
					else
					{
						this.resursi = response.data;
					}
				});	
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
			if(active.uloga !== 'admin')
			{
				window.location.href = "#/Forbidden"
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
			this.active = response.data,
			this.isForbidden(response.data)
		});
	}	
});