export default {
  name: 'transcript-word',
  components: {},
  props: [
    'word',
    'onClick'
  ],
  data () {
    return {

    }
  },
  computed: {
    renderedWord() {
      return this.word.furiganized || this.word.word.split('|')[0];
    }
  },
  mounted () {

  },
  methods: {
    clickHandler() {
      (this.$props.onClick || function () {})(this.word);
    }
  }
}
