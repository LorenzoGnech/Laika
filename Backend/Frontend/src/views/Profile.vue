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
        <CardGrid :cards=computedNews :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="news"/>
        </div>
        <div class="container" id="latestnews" ref="latestnews">
        <h2 class="containertitle">FOLLOWED MISSIONS</h2>
        <CardGrid :cards=computedMissions :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="mission"/>
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
        this.getFollowedMissions();
    },
    computed: {
        computedNews(){
            this.savedNews.forEach( (item, index) => {
                var t = {
                id: item.id,
                header: item.title,
                date: item.date,
                content: item.content.slice(0, 100) + "...",
                fullContent: item.content,
                img: item.img,
                source: item.source,
                tags: item.tags,
                };
            this.cSavedNews.push(t);
            });
            return this.cSavedNews;
        },
        computedMissions(){
            this.followedMissions.forEach( (item, index) => {
                var t = {
                id: item.id,
                header: item.title,
                date: item.date,
                content: item.content.slice(0, 100) + "...",
                fullContent: item.content,
                img: item.img,
                source: item.source,
                tags: item.tags,
                };
            this.cFollowedMissions.push(t)
            });
            return this.cFollowedMissions;
        },
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
        async getSavedNews(){
        axios
            .get('https://laikapp.herokuapp.com/api/v1/news/')
            .then(response => (this.savedNews = response.data));
        },
        async getFollowedMissions(){
        axios
            .get('https://laikapp.herokuapp.com/api/v1/missions/')
            .then(response => (this.followedMissions = response.data));
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