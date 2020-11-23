<template>
    <div class="grid-wrap">
        <div class="grid">
            <li v-for="card in cards" :key="card.id">
                <Card :img=card.img :width="getCardWidth" :height="getCardHeight" :header=card.header :content=card.content />
            </li>
        </div>
    </div>
</template>

<script>
import Card from './Card.vue'

export default {
  name: 'CardGrid',
  components: {
    Card
  },
  data: function(){
      return{
          cardHeight: 450,
          cardWidth: 230,
          parentHeight: 0,
          parentWidth: 0
      }
  },
  props: {
      cards: Object,
      cardsHeight: Number,
      cardsWidth: Number
  },
  mounted(){
      this.parentHeight = this.$parent.$el.offsetHeight;
      this.parentWidth = this.$parent.$el.offsetWidth;
  },
  computed: {
      getMaxWidthValue(){
          return Math.max(801, this.parentWidth/2.5);
      },
      getMinWidthValue(){
          return Math.max(190, this.parentWidth/10);
      },
      getMaxheightValue(){
          return 800;
      },
      getMinHeightValue(){
          return 150;
      },
      getCardHeight(){
          if(this.cardsHeight != null){
              return this.cardsHeight;
          }
          return this.cardHeight*1;
      },
      getCardWidth(){
          if(this.cardsWidth != null){
              return this.cardsWidth;
          }
          return this.cardWidth*1;
      }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

li{
    list-style-type: none;
}

.sliders{
    display:flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
}

.grid{
    display:flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
}

.grid-wrap{
    text-align: center;
}

.label{
    margin: 20px;
    font-weight: bold;
    font-size: 20px;
}

#widthRange, #heightRange{
    width: 100%;
}

.slider {
  -webkit-appearance: none;
  width: 50%;
  height: 10px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: black;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #4CAF50;
  cursor: pointer;
}

</style>
