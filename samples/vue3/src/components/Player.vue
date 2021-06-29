<template>
  <div class="player-ui">
    <div ref="playerContainer">
      <video ref="video" />
    </div>
    <div class="player-controls">
      <div class="seekbar" v-if="playerState.duration > 0">
        {{ currentTime }}
        <Slider
          :value="seekbarPosition"
          :max="playerState.duration"
          @change="handleSeekbarMove"
          @changeCommitted="handleSeek"
        />
        {{ duration }}
      </div>
      <button
        :class="playerState.paused ? 'play' : 'pause'"
        @click="playOrPause"
      ></button>
    </div>
  </div>
</template>

<script>
import {loadPlayer, subscribeMediaState} from 'playcraft/core'
import {formatTime} from '../utils'
import Slider from './Slider'

export default {
  name: 'Player',
  components: {
    Slider,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      playerState: {
        currentTime: 0,
        paused: true,
      },
      seekTime: undefined,
    }
  },
  computed: {
    currentTime() {
      return formatTime(this.seekbarPosition)
    },
    duration() {
      return formatTime(this.playerState.duration)
    },
    seekbarPosition() {
      return this.seekTime >= 0 ? this.seekTime : this.playerState.currentTime
    }
  },
  methods: {
    playOrPause() {
      if (this.playerState.paused) {
        this.player.play()
      } else {
        this.player.pause()
      }
    },
    handleSeekbarMove(event) {
      this.seekTime = event.value
    },
    handleSeek(event) {
      this.playerState.currentTime = event.value
      this.$refs.video.currentTime = event.value
      this.player.seek(event.value)
      this.seekTime = undefined
    },
  },
  async mounted() {
    this.player = await loadPlayer(this.$refs.video, {
      container: this.$refs.playerContainer,
      autoplay: true,
      bitmovin: {
        key: '',
      },
    })
    subscribeMediaState(this.$refs.video, state => (this.playerState = state))
    this.player.load({
      dash:
        'http://amssamples.streaming.mediaservices.windows.net/f1ee994f-fcb8-455f-a15d-07f6f2081a60/SintelMultiAudio.ism/manifest(format=mpd-time-csf)',
      hls:
        'http://amssamples.streaming.mediaservices.windows.net/f1ee994f-fcb8-455f-a15d-07f6f2081a60/SintelMultiAudio.ism/manifest(format=m3u8-aapl-v3)',
    })
  },
  unmounted() {
    this.player.destroy()
    this.player = null
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.player-controls {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
}
.player-controls button {
  height: 3rem;
  width: 3rem;
  border: none;
  background-color: transparent;
}
.player-controls button.play {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCI+PGRlZnM+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxNTAlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIiByZXN1bHQ9Im9mZnNldGJsdXIiLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJsaW5lYXIiIHNsb3BlPSIuNyIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVNZXJnZT48ZmVNZXJnZU5vZGUvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik01IDR2NDBsMzgtMjB6Ii8+PC9nPjwvc3ZnPg==');
}
.player-controls button.pause {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCI+PGRlZnM+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxNTAlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIiByZXN1bHQ9Im9mZnNldGJsdXIiLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJsaW5lYXIiIHNsb3BlPSIuNyIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVNZXJnZT48ZmVNZXJnZU5vZGUvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiPjxyZWN0IHdpZHRoPSIxMiIgaGVpZ2h0PSI0MiIgeD0iNiIgeT0iMyIgcng9IjIiLz48cmVjdCB3aWR0aD0iMTIiIGhlaWdodD0iNDIiIHg9IjMwIiB5PSIzIiByeD0iMiIvPjwvZz48L3N2Zz4=');
}
.seekbar {
  margin: 0.5rem 0;
  flex: 100%;
  height: 1.5rem;
  display: flex;
  align-items: center;
}
</style>
