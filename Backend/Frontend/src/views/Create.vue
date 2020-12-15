<template>
  <div id="app" v-if="this.verificato">
    <div class="sticky" v-sticky="true" sticky-offset="{top: 0, right: 0}" sticky-side="both" on-stick="onStick" sticky-z-index="20">
              <NavMenu/>
          </div>
          <form id="post" @submit.prevent="submit">
            <label for="type">Article type:</label>
            <select name="type" id="type" @change="changetype">
              <option value="news">News</option>
              <option value="missions">Missions</option>
              <option value="astronauts">Astronauts</option>
              <option value="exoplanets">Exoplanets</option>
              <option value="telescopes">Telescopes</option>
            </select>
            <br>
            <label for="method">Method:</label>
            <select name="method" id="method" @change="change">
              <option value="post">Post</option>
              <option value="put">Put</option>
              <option value="delete">Delete</option>
            </select>
            <br>
            <div class="campi" v-if="this.delet">
              <div>
                <label id="date" class="label" for="textarea">DATE:</label>
              </div>
              <textarea id="textarea" name="date" rows="1" cols="60"></textarea>
            </div>
            <div class="campi" v-if="this.delet">
              <div>
                <label id="title" class="label" for="title">TITLE:</label>
              </div>
              <textarea id="textarea" name="title" rows="1" cols="60"></textarea>
            </div>
            <div class="campi" v-if="this.delet">
              <div>
                <label id="content" class="label" for="content">CONTENT:</label>
              </div>
              <textarea id="textarea" name="content" rows="1" cols="60"></textarea>
            </div>
            <div class="campi" v-if="this.delet">
              <div>
                <label id="img" class="label" for="img">PICTURE:</label>
              </div>
              <textarea id="textarea" name="img" rows="1" cols="60"></textarea>
            </div>
            <div class="campi" v-if="this.delet">
              <div>
                <label id="source" class="label" for="source">SOURCE:</label>
              </div>
              <textarea id="textarea" name="source" rows="1" cols="60"></textarea>
            </div>
            <div class="campi" v-if="this.delet">
              <div>
                <label id="tags" class="label" for="tags">TAGS:</label>
              </div>
              <textarea placeholder="Separati da virgola senza spazi" id="textarea" name="tags" rows="1" cols="60"></textarea>
            </div>
            <div class="campi" id="idbox" v-if="this.id">
              <div>
                <label class="label" for="id">ID NOTIZIA:</label>
              </div>
              <textarea placeholder="You can find id in the url" id="id" name="id" rows="1" cols="60"></textarea>
            </div>
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
    this.isVerificato();
  },
  methods: {
    changetype(){
      switch(document.getElementById("type").value){
        case "news":
          document.getElementById("date").innerHTML = "DATA:";
          document.getElementById("title").innerHTML = "TITLE:";
          document.getElementById("content").innerHTML = "CONTENT:";
          document.getElementById("img").innerHTML = "PICTURE:";
          document.getElementById("source").innerHTML = "SOURCE:";
          break;
        case "missions":
          document.getElementById("date").innerHTML = "DATA:";
          document.getElementById("title").innerHTML = "TITLE:";
          document.getElementById("content").innerHTML = "DESCRIPTION:";
          document.getElementById("img").innerHTML = "PICTURE:";
          document.getElementById("source").innerHTML = "SOURCE:";
          break;
        case "astronauts":
          document.getElementById("date").innerHTML = "BIRTH:";
          document.getElementById("title").innerHTML = "NAME:";
          document.getElementById("content").innerHTML = "NATIONALITY:";
          document.getElementById("img").innerHTML = "PICTURE:";
          document.getElementById("source").innerHTML = "AGENCY:";
          break;
        case "exoplanets":
          document.getElementById("date").innerHTML = "DISCOVER DATE:";
          document.getElementById("title").innerHTML = "NAME:";
          document.getElementById("content").innerHTML = "DESCRIPTION:";
          document.getElementById("img").innerHTML = "PICTURE:";
          document.getElementById("source").innerHTML = "SOURCE:";
          break;
        case "telescopes":
          document.getElementById("date").innerHTML = "LAUNCH DATE:";
          document.getElementById("title").innerHTML = "NAME:";
          document.getElementById("content").innerHTML = "DESCRIPTION:";
          document.getElementById("img").innerHTML = "PICTURE:";
          document.getElementById("source").innerHTML = "SOURCE:";
          break;
      }
    },
    change(){
      if (document.getElementById("method").value == "post"){
        this.id = false;
        this.delet = true;
      } else {
        if (document.getElementById("method").value == "delete"){
          this.delet = false;
        } else {
          this.delet = true;
        }
        this.id = true;
      }
    },
    isVerificato(){
      if (this.$store.getters.getUsername == "admin@admin.admin"){
        this.verificato = true;
      }
    },
    parser(tipo, obj){
      let params = new URLSearchParams();
      params.append('token', this.$store.getters.getToken);
      switch(tipo){
        case "news":
          params.append('date', obj.date);
          params.append('title', obj.title);
          params.append('content', obj.content);
          params.append('img_path', obj.img);
          params.append('source_url', obj.source);
          params.append('tags', [obj.tags]);
          break;
        case "missions":
          params.append('date', obj.date);
          params.append('title', obj.title);
          params.append('description', obj.content);
          params.append('img_path', obj.img);
          params.append('source_url', obj.source);
          params.append('tags', obj.tags);
          break;
        case "astronauts":
          params.append('birth', obj.date);
          params.append('name', obj.title);
          params.append('nationality', obj.content);
          params.append('img_path', obj.img);
          params.append('agency', obj.source);
          params.append('tags', obj.tags);
          break;
        case "exoplanets":
          params.append('discover_date', obj.date);
          params.append('name', obj.title);
          params.append('description', obj.content);
          params.append('img_path', obj.img);
          params.append('source_url', obj.source);
          params.append('tags', obj.tags);
          break;
        case "telescopes":
          params.append('launch_date', obj.date);
          params.append('name', obj.title);
          params.append('description', obj.content);
          params.append('img_path', obj.img);
          params.append('source_url', obj.source);
          params.append('tags', obj.tags);
          break;
      }
      console.log(obj);
      return params;
    },
    delete(richiesta){
      let params = new URLSearchParams();
      console.log("richiesta.id")
      params.append('token', this.$store.getters.getToken);
      let url = "https://laikapp.herokuapp.com/api/v1/" + richiesta.tipo  + "/" + richiesta.id;
      axios.delete(url)
        .catch(err => console.warn(err));;
    },
    put(richiesta){
      var params = this.parser(richiesta.tipo, richiesta)
      axios.put('https://laikapp.herokuapp.com/api/v1/' + richiesta.tipo  + "/" + richiesta.id, params)
        .catch(err => console.warn(err));;
    },
    post(richiesta){
      var params = this.parser(richiesta.tipo, richiesta)
      axios.post('https://laikapp.herokuapp.com/api/v1/' + richiesta.tipo, params)
        .catch(err => console.warn(err));;
    },
    submit(e){
      var _id = 0
      if (document.getElementById("method").value != "delete"){
        _id = 0;
        var richiesta = {
          tipo: e.target.elements.type.value,
          id: _id,
          date: e.target.elements.date.value,
          title: e.target.elements.title.value,
          content: e.target.elements.content.value,
          img: e.target.elements.img.value,
          source:e.target.elements.source.value,
          tags: [e.target.elements.tags.value.split(",")],
        }
      } else {
        _id = e.target.elements.id.value;
        var richiesta = {
          tipo: e.target.elements.type.value,
          id: _id,
        }
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
      id: false,
      delet: true,
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
  margin: 0;
}

#method{
  margin: 10px;
}

.campi{
  vertical-align: middle;
  margin: 2vh;
  display: block;
}

.label{
  color: white;
}

</style>
