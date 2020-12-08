<template>
    <div class="card-wrap"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card" :style="cardStyle" :width="this.width" :height="this.height">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <h1>{{header}}</h1>
          <div class="blueline"></div>
          <p>{{content}}</p>
          <slot name="content"></slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'HCard',
  data: function(){
      return{
          mouseX: 0,
          mouseY: 0,
      }
  },
  props: {
    img: String,
    width: Number,
    height: Number,
    header: String,
    content: String,
    type: String,
    id: Number,
  },
  mounted(){
  },
  computed: {
    cardStyle() {
      const rX = this.mousePX * 30;
      const rY = this.mousePY * -30;
      return {
        'transform': `rotateY(${rX}deg) rotateX(${rY}deg)`,
        '--width': this.width + 'px',
        '--height': this.height + 'px'
      };
    },
    cardBgTransform() {
      const tX = this.mousePX * -40;
      const tY = this.mousePY * -40;
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)`
      }
    },
    cardBgImage() {
      if(this.img == ""){
        return {
          backgroundImage: `url(https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2120&q=80)`
        }
      }
      return {
        backgroundImage: `url(${this.img})`
      }
    }
  },
  methods: {
    handleClick(e){
      let host = document.location.origin;
      let url =  this.type + '/' + this.id;
      this.$router.push(url);
    },
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width/2;
      this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height/2;
    },
    handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    },
    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(()=>{
        this.mouseX = 0;
        this.mouseY = 0;
      }, 100);
    }
  }
}
</script>

<style lang="scss" scoped>
$hoverEasing: cubic-bezier(0.24, 1, 0.315, 1);
$returnEasing: cubic-bezier(0.44, 0.05, 0.56, 0.95);

.card-wrap {
  margin: 2vh;
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;
  // background-color: #fff;
  
  &:hover {
    .card {
      transition:
        0.6s $hoverEasing,
        box-shadow 2s $hoverEasing;
      box-shadow:
        rgba(white, 0.2) 0 0 40px 5px,
        rgba(white, 1) 0 0 0 1px,
        rgba(black, 0.66) 0 30px 60px 0,
        inset #333 0 0 0 5px,
        inset white 0 0 0 6px;
    }
  }
}

.blueline{
    width: 98%;
    height: 2px;
    background-color: #00ffff;
}

.card {
  position: relative;
  width: var(--width);
  height: var(--height);
  background-color: rgba(51, 51, 51, 0.5);
  overflow: hidden;
  border-radius: 10px;
  box-shadow:
    rgba(black, 0.66) 0 30px 60px 0,
    inset #333 0 0 0 5px,
    inset rgba(white, 0.5) 0 0 0 6px;
  transition: 1s $returnEasing;
}

.card-bg {
  opacity: 1;
  position: absolute;
  top: -20px; left: -20px;
  width: 20%;
  height: 100%;
  padding: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition:
    1s $returnEasing,
    opacity 5s 1s $returnEasing;
  pointer-events: none;
}

.card-info {
  right: 0;
  position: absolute;
  margin-top: 2vh;
  margin-bottom: 2vh;
  width: 78%;
  color: #fff;
  
  p {
    margin-top: 2vh;
    margin-bottom: 2vh;
    margin-left: 1vw;
    margin-right: 1vw;
    text-align: left;
  }
  
  * {
    position: relative;
    z-index: 1;
  }
  
  &:after {
    content: '';
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
}

.card-info h1 {
  margin-bottom: 2vh;
  margin: 15px;
  font-size: 28px;
  font-weight: 700;
  text-align: left;
  text-shadow: rgba(black, 0.5) 0 10px 10px;
}
</style>
