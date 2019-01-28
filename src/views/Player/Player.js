import YtWrapper from '../../components/YtWrapper';
import TranscriptPlayer from '../../components/TranscriptPlayer';

export default {
  name: 'player',
  components: {
    YtWrapper: YtWrapper,
    TranscriptPlayer: TranscriptPlayer
  },
  props: [],
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    seek(time) {
      this.$refs.ytWrapper.seek(time);
    }
  }
}
