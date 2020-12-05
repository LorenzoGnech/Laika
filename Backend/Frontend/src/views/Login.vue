<template>
  <div id="app">
          <div class="sticky" v-sticky="true" sticky-offset="{top: 0, right: 0}" sticky-side="both" on-stick="onStick" sticky-z-index="20">
              <NavMenu/>
          </div>
          <div class="container">
            <div class="row">
              <div class="column">
                <form action="#" method="post">
                  <p class="title"><b>Sign Up</b></p>
                  <input type="email" placeholder="Email" name="email" required>
                  <input type="password" placeholder="Password" name="psw" required>
                  <button type="submit">Sign Up</button>
                </form>
              </div>
              <div class="column" id="signin">
                <form action="#" method="post">
                  <p class="title"><b>Sign In</b></p>
                  <input type="email" placeholder="Email" name="email" required>
                  <input type="password" placeholder="Password" name="psw" required>
                  <button type="submit">Sign In</button>
                </form> 
              </div>
            </div>
          </div>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'

export default {
  name: 'Login',
  components: {
    NavMenu
  },
  data: function(){
    return {
      loginTitle: 'Login'
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
