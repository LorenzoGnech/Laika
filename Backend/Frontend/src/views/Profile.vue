<template>
  <div id="profile-wrapper">
    <div class="sticky" v-sticky="true" sticky-offset="{top: 0, right: 0}" sticky-side="both" on-stick="onStick" sticky-z-index="20">
        <NavMenu/>
    </div>
    <div v-if="this.$store.getters.isLoggedIn">
        <div class="personal-info">
            <img class="avatar" :src=getAvatar />
            <h1 class="name">{{this.$store.getters.getUsername}}</h1>
        </div>
        <div class="container" id="latestnews" ref="latestnews">
        <h2 class="containertitle">SAVED NEWS</h2>
        <CardGrid :cards=coso_bello :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="news"/>
        </div>
        <div class="container" id="latestnews" ref="latestnews">
        <h2 class="containertitle">FOLLOWED MISSIONS</h2>
        <CardGrid :cards=coso_bellissimo :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="mission"/>
        </div>
        <div class="container">
        <a @click=handleLogout id="api-button">LOGOUT</a>
        </div>
    </div>
    <div v-else>
        <div class="container">
            <h2 class="containertitle" style="margin: 15px;">You are not logged in.</h2>
            <a href="/#/Signin/" id="api-button">Go to Login page</a>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CardGrid from '../components/CardGrid.vue'
import NavMenu from '../components/NavMenu.vue'

export default {
    name: 'Profile',
    components: {
        CardGrid,
        NavMenu
    },
    data: function(){
        return{
            avatar: "",
            cSavedNews: [],
            savedNews: [],
            followedMissions: [],
            cFollowedMissions: [],
            temp: [],
            coso_bello: [],
            coso_bellissimo: []
        }
    },
    props: {
    },
    mounted(){
        /*
        if(!this.$store.getters.isLoggedIn){
            console.log("cicc");
            this.$router.push("/");
        } else{   
            this.getSavedNews();
            this.getFollowedMissions();
        }
        */
        this.getSavedNews();
        this.computedNews();
        this.getFollowedMissions();
        this.computedMissions();
    },
    computed: {
        getAvatar(){
            if(this.avatar == ""){
                return "https://www.teatro.it/old/2016-11/nobody_m.original.jpg"
            } else{
                return this.avatar;
            }
        },
        getCardsHeight(){
            return window.innerHeight/2.1;
        },
        getCardsWidth(){
            return window.innerWidth/6.4;
        }
        },
    methods: {
        computedMissions(){
            this.followedMissions.forEach( (item, index) => {
                axios
                    .get('https://laikapp.herokuapp.com/api/v1/missions/' + item.missionId)
                    .then(response => {
                        var t = {
                            id: response.data._id,
                            header: response.data.title,
                            date: response.data.date,
                            content: response.data.description.slice(0, 100) + "...",
                            fullContent: response.data.description,
                            img: response.data.img_path[0],
                            source: response.data.source_url,
                            tags: response.data.tags,
                        };
                        this.coso_bellissimo.push(t)
                    });
            });
            },
        computedNews(){
            this.savedNews.forEach( (item, index) => {
                axios
                    .get('https://laikapp.herokuapp.com/api/v1/news/' + item.newsId)
                    .then(response => {
                        var t = {
                            id: response.data._id,
                            header: response.data.title,
                            date: response.data.date,
                            content: response.data.content.slice(0, 100) + "...",
                            fullContent: response.data.content,
                            img: response.data.img_path,
                            source: response.data.source_url,
                            tags: response.data.tags,
                            };
                        this.coso_bello.push(t)
                    });
            });
        },
        async getSavedNews(){
        axios
            .get('https://laikapp.herokuapp.com/api/v1/news/favourite/' + this.$store.getters.getId)
            .then(response => {
                this.savedNews = response.data;
                this.computedNews();
                });
        },
        async getFollowedMissions(){
        axios
            .get('http://laikapp.herokuapp.com/api/v1/missions/followed/' + this.$store.getters.getId)
            .then(response => {
                this.followedMissions = response.data;
                this.computedMissions();
                });
        },
        handleLogout(){
            this.$store.commit("_Logout");
            this.$router.push("/");
        },
    }
  }
</script>

<style lang="scss" scoped>

.personal-info{
    padding-top: 10vh;
    padding-bottom: 5vh;
    width: 60%;
    margin: 0 auto;
    display: flex;
}

.avatar{
    margin: 0 auto;
    height: 17vw;
    border-radius: 2vw;
}

.name{
    color: white;
    font-size: 3vw;
    margin: 0 auto;
    line-height: 17vw;
}

#api-button{
    cursor: pointer;
    background-color: #d33737;
	border-bottom: 5px solid #ff0303;
	text-shadow: 0px -2px #ff0303;
}

</style>