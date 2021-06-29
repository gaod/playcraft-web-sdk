<template>
  <div class="slider">
    <div
      class="slider-rail"
      @pointerdown="handleDrag"
      @pointermove="handleDrag"
      @pointerup="handleDrop"
    >
      <div
        class="slider-track"
        :style="{transform: `translate(${valuePercentage - 100}%)`}"
      ></div>
      <div class="slider-thumb" :style="{left: `${valuePercentage}%`}"></div>
    </div>
  </div>
</template>

<script>
const getPointerData = event => {
  const {pageX: x, pageY: y} =
    event.touches?.[0] || event.changedTouches?.[0] || event
  const {width, left} = event.currentTarget.getBoundingClientRect()
  return {x, y, width, left}
}

export default {
  name: 'Slider',
  props: {
    value: Number,
    max: Number,
    onChange: Function,
    onChangeCommitted: Function,
  },
  data() {
    return {dragPosition: undefined}
  },
  computed: {
    valuePercentage() {
      const value = this.dragPosition >= 0 ? this.dragPosition : this.value
      return (100 * value) / this.max || 0
    },
  },
  methods: {
    handleDrag(event) {
      if (event.type === 'pointerdown') {
        event.currentTarget.setPointerCapture(event.pointerId)
        this.dragging = true
      }
      if (this.dragging) {
        const {x, left, width} = getPointerData(event)
        this.dragPosition = (x - left) / width * this.max
        this.onChange({value: this.dragPosition})
      }
    },
    handleDrop() {
      this.dragging = false
      this.onChangeCommitted({value: this.dragPosition})
      this.dragPosition = undefined
    },
  },
}
</script>

<style scoped>
.slider {
  position: relative;
  height: 1.5rem;
  margin: 0 0.5rem;
  flex: 1;
  display: flex;
  align-items: center;
}
.slider-rail {
  flex: 100%;
  height: 0.4rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.3);
}
.slider-track {
  height: 100%;
  width: 100%;
  background-color: #2c87ef;
}
.slider-thumb {
  position: absolute;
  top: 50%;
  height: 12px;
  width: 12px;
  border-radius: 100%;
  background-color: #fff;
  transform: translate(-50%, -50%);
}
@media (any-pointer: fine) {
  .slider {
    cursor: pointer;
  }
  .slider-thumb {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .slider:hover .slider-thumb {
    opacity: 1;
  }
}
</style>
