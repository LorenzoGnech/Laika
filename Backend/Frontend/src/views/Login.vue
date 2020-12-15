<template>
  <div id="app">
          <div class="sticky" v-sticky="true" sticky-offset="{top: 0, right: 0}" sticky-side="both" on-stick="onStick" sticky-z-index="20">
              <NavMenu/>
          </div>
          <div v-if="!this.$store.getters.isLoggedIn" class="container">
            <div class="row">
              <div class="column">
                <form action="#" method="post" @submit.prevent="Signup">
                  <p class="title"><b>Sign Up</b></p>
                  <input type="email" placeholder="Email" name="email" required>
                  <input type="password" placeholder="Password" name="psw" required>
                  <button type="submit">Sign Up</button>
                </form>
              </div>
              <div class="column" id="signin">
                <form action="#" method="post" @submit.prevent="Signin">
                  <p class="title"><b>Sign In</b></p>
                  <input type="email" placeholder="Email" name="email" required>
                  <input type="password" placeholder="Password" name="psw" required>
                  <button type="submit">Sign In</button>
                </form> 
              </div>
            </div>
          </div>
          <div v-else>
              <div class="container">
                  <h2 class="containertitle" style="margin: 15px;">You are already logged in.</h2>
                  <a href="/#/profile/" id="api-button">Go to your profile page</a>
              </div>
          </div>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import crypto from 'crypto-js'
import axios from 'axios'
import jwt from 'jsonwebtoken'

export default {
  name: 'Login',
  components: {
    NavMenu
  },
  methods: {
    Signup(e){
      let email = e.target.elements.email.value;
      let password = e.target.elements.email.password;
      let hash = crypto.SHA256(password).toString();
      this.SendCredentials(email, hash);
    },
    Signin(e){
      let email = e.target.elements.email.value;
      let password = e.target.elements.email.password;
      let hash = crypto.SHA256(password).toString();
      this.Login(email, hash);
    },
    SendCredentials(email, hash){
      var params = new URLSearchParams();
      params.append('email', email);
      params.append('password', hash);
      axios.post('https://laikapp.herokuapp.com/api/v1/signup/', params)
        .then(response => this.complete_auth(response.data))
        .catch(err => console.warn(err));;
    },
    complete_auth(data){
      this.Login(data.insertedUser.email, data.insertedUser.password)
    },
    Login(email, hash){
      var params = new URLSearchParams();
      params.append('email', email);
      params.append('password', hash);
      axios.post('https://laikapp.herokuapp.com/api/v1/signin/', params)
        .then(response => this.redirect(response.data))
        .catch(err => console.warn(err));;
    },
    redirect(data){
      if (data.success == true){
        var info_login = {
          email: data.email,
          token: data.token,
          id: data.userId,
          admin: false
        };
        console.log(jwt.verify(data.token, process.env.ACCESS_TOKEN_SECRET).is_admin)
        this.$store.commit("_Login", info_login);
        this.$router.push("/");
      }
    }
  },
  data: function(){
    return {
      loginTitle: 'Login',
    }
  },
}
</script>

<style lang="scss" scoped>
 /* Bordered form */
form {
  width: 400px;
  padding: 10px 10px;
}

.title{
  color: #fff;
  font-size: 24px;  
}


/* Full-width inputs */
input[type=text], input[type=password], input[type=email] {
  
  width: 100%;
  height: 20px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 8px 0;
  border: none;
  border-radius: 25px;
  font-size: 16px;
}

form{
  border: solid rgb(219, 211, 211);
  padding: 10px 50px;
}

.box {
	margin: 0em 0em;
}

/* Set a style for all buttons */
button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin: 8px 0;
  cursor: pointer;
  border: none;
  border-radius: 25px;
  width: 200px;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Create two equal columns that sits next to each other */
.column {
  flex: 50%;
}

#signin{
  margin-top: 30px;
}
</style>
