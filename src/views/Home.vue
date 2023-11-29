<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      background="#ababab"
      img-width="1920"
      img-height="600"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        style="max-width: 1920px; max-height: 600px;"
        :img-src="require('../assets/img/image1.jpg')"
      ></b-carousel-slide>

      <b-carousel-slide style="max-width: 1920px; max-height: 600px;" :img-src="require('../assets/img/image2.jpg')">
      </b-carousel-slide>

      <b-carousel-slide style="max-width: 1920px; max-height: 600px;" :img-src="require('../assets/img/image3.jpg')"></b-carousel-slide>
      
    </b-carousel>
  </div>
</template>

<script>
export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>

<style>

</style>