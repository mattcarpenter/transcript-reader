import TranscriptWord from '../TranscriptWord';
import { mapState } from 'vuex';
import { getWordStartTimeMillis } from '../../lib/utils';

export default {
  name: 'transcript-player',
  components: {
    TranscriptWord: TranscriptWord
  },
  props: [
    'onSeek'
  ],
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      transcript: state => state.player.transcript
    })
  },
  mounted () {

  },
  methods: {
    wordClicked(word) {
      let time = getWordStartTimeMillis(word);
      (this.$props.onSeek || function () {})(time);
    }
  },
  watch: {
    transcript (newTranscript, oldTranscript) {
      newTranscript.forEach((line, index) => {
        if (line.isCurrent && !oldTranscript[index].isCurrent) {
          this.$refs.transcriptPane.children[index].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      });
    }
  }
}
