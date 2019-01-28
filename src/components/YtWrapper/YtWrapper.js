const MILLIS_PER_SECOND = 1000;

export default {
  name: 'yt-wrapper',
  components: {},
  props: [],
  data () {
    return {
      startTime: 0,
      interval: null,
      videoId: 'I7A-0cEZsL0',
      playerVars: {
        autoplay: 1
      }
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.interval = setInterval(() => {
        this.$refs.youtube.player.getCurrentTime().then(time => {
          this.$store.dispatch('updatePlayerTime', time * MILLIS_PER_SECOND);
        });
      }, 50);
    });
    // Fake the YT player for now
    /*this.startTime = new Date().getTime();
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.$store.dispatch('updatePlayerTime', new Date().getTime() - this.startTime);
    }, 10);*/
  },
  methods: {
    playing() {
      
    },
    seek(time) {
      this.$refs.youtube.player.seekTo(time / MILLIS_PER_SECOND);
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
}
