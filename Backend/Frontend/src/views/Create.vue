<template>
  <div id="app" v-if="this.verificato">
    <div class="sticky" v-sticky="true" sticky-offset="{top: 0, right: 0}" sticky-side="both" on-stick="onStick" sticky-z-index="20">
              <NavMenu/>
          </div>
          <form id="post" @submit.prevent="submit">
            <label for="type">Article type:</label>
            <select name="type" id="type">
              <option value="news">News</option>
              <option value="missions">Missions</option>
              <option value="astronauts">Astronauts</option>
              <option value="exoplanets">Exoplanets</option>
              <option value="telescopes">Telescopes</option>
            </select>
            <br>
            <label for="method">Method:</label>
            <select name="method" id="method">
              <option value="post">Post</option>
              <option value="put">Put</option>
              <option value="delete">Delete</option>
            </select>
            <br>
              <textarea :value="this.placeholder" id="textarea" name="textarea" rows="15" cols="100"></textarea>
            <br>
              <textarea id="id" name="id" rows="1" cols="60">Put the ID for PUT or DELETE! (you can find id in the url)</textarea>
            <br>
            <input type="submit" value="Submit">
          </form>
  </div>
  <div id="app" v-else>
    <div class="sticky" v-sticky="true" sticky-offset="{top: 0, right: 0}" sticky-side="both" on-stick="onStick" sticky-z-index="20">
              <NavMenu/>
          </div>
    <h1 id="scritta">YOU DON'T HAVE THE RIGHT PRIVILEGES</h1>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import crypto from 'crypto-js'
import axios from 'axios'

export default {
  name: 'Login',
  components: {
    NavMenu
  },
  mounted() {
    this.create_string();
    this.isVerificato();
  },
  methods: {
    isVerificato(){
      if (this.$store.getters.getUsername == "admin@admin.admin"){
        this.verificato = true;
      }
    },
    create_string(){
      var a = {"date":"23-234-234",
              "title":"32874t",
              "content":"kjnbasdkfj",
              "img_path":"sdf",
              "source_url":"wdfwd",
              "tags": ["sdf","sdf"]}
      this.placeholder = "NEWS:\n" + JSON.stringify(a);
      var a = {"date":"23-234-234",
              "title":"32874t",
              "description":"kjnbasdkfj",
              "img_path":"sdf",
              "source_url":"wdfwd",
              "tags": ["sAAdf","sFFdf"]}
      this.placeholder += "\nMISSIONS:\n" + JSON.stringify(a);
      var a = {"birth":"2020-2-10",
              "name":"SHREK",
              "nationality":"PALUDE",
              "img_path":["sdf"],
              "agency":"ciuchino",
              "tags": ["sAAdf","sFFdf"]}
      this.placeholder += "\nASTRONAUTS:\n" + JSON.stringify(a);
      var a = {"discover_date":"2020-2-10",
              "name":"SHREK",
              "description":"PALUDE",
              "img_path":"sdf",
              "source_url":"ciuchino",
              "tags": ["sAAdf","sFFdf"]}
      this.placeholder += "\nEXOPLANETS:\n" + JSON.stringify(a);
      var a = {"launch_date":"2020-2-10",
              "name":"SHREK",
              "description":"PALUDE",
              "img_path":["sdf"],
              "source_url":"ciuchino",
              "tags": ["sAAdf","sFFdf"]}
      this.placeholder += "\nTELESCOPES:\n" + JSON.stringify(a);
    },
    parser(tipo, obj){
      let params = new URLSearchParams();
      params.append('token', this.$store.getters.getToken);
      switch(tipo){
        case "news":
          params.append('date', obj.date);
          params.append('title', obj.title);
          params.append('content', obj.content);
          params.append('img_path', obj.img_path);
          params.append('source_url', obj.source_url);
          params.append('tags', [obj.tags]);
          break;
        case "missions":
          params.append('date', obj.date);
          params.append('title', obj.title);
          params.append('description', obj.description);
          params.append('img_path', obj.img_path);
          params.append('source_url', obj.source_url);
          params.append('tags', obj.tags);
          break;
        case "astronauts":
          params.append('birth', obj.birth);
          params.append('name', obj.name);
          params.append('nationality', obj.nationality);
          params.append('img_path', obj.img_path);
          params.append('agency', obj.agency);
          params.append('tags', obj.tags);
          break;
        case "exoplanets":
          params.append('discover_date', obj.discover_date);
          params.append('name', obj.name);
          params.append('description', obj.description);
          params.append('img_path', obj.img_path);
          params.append('source_url', obj.source_url);
          params.append('tags', obj.tags);
          break;
        case "telescopes":
          params.append('name', obj.name);
          params.append('description', obj.description);
          params.append('launch_date', obj.launch_date);
          params.append('img_path', obj.img_path);
          params.append('source_url', obj.source_url);
          params.append('tags', obj.tags);
          break;
      }
      return params;
    },
    delete(richiesta){
      let params = new URLSearchParams();
      params.append('token', this.$store.getters.getToken);
      let url = "https://laikapp.herokuapp.com/api/v1/" + richiesta.tipo  + "/" + richiesta.id;
      axios.delete(url)
        .catch(err => console.warn(err));;
    },
    put(richiesta){
      let obj = JSON.parse(richiesta.text);
      var params = this.parser(richiesta.tipo, obj)
      axios.put('http://localhost:3000/api/v1/' + richiesta.tipo  + "/" + richiesta.id, params)
        .catch(err => console.warn(err));;
    },
    post(richiesta){
      let obj = JSON.parse(richiesta.text);
      var params = this.parser(richiesta.tipo, obj)
      axios.post('http://localhost:3000/api/v1/' + richiesta.tipo, params)
        .catch(err => console.warn(err));;
    },
    submit(e){
      var richiesta = {
        tipo: e.target.elements.type.value,
        text: e.target.elements.textarea.value,
        id: e.target.elements.id.value
      }
      let method = e.target.elements.method.value;
      switch(method){
        case "post": this.post(richiesta); break;
        case "put": this.put(richiesta); break;
        case "delete": this.delete(richiesta); break;
      }
    }
  },
  data: function(){
    return {
      loginTitle: 'Login',
      placeholder: "",
      verificato: false,
    }
  },
}
</script>

<style lang="scss" scoped>
 /* Bordered form */

#post{
  margin: 0 auto;
  padding-top: 20px;
  display: block;
}

#textarea{
  margin: 5vh;
}

#method{
  margin: 10px;
}

#scritta{
  padding-top: 30px;
}

</style>
