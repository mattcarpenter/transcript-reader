import Vue from 'vue'
import Vuex from 'vuex'
import { isLineCurrent, isWordCurrent, getWordStartTimeMillis } from './lib/utils';
import sampleTranscript from './data/out.json';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player: {
      transcript: sampleTranscript,
      currentTime: 0
    }
  },

  mutations: {
    updatePlayerTime(state, time) {
      let transcript = state.player.transcript.slice(0);

      state.player.currentTime = time;

      // Annotate current alternatives and times
      var foundCurrent = false;
      var nextLineIndex = 0;
      var timeUntilNextLine = getWordStartTimeMillis(transcript[transcript.length-1].alternatives[0].words[0]);

      transcript.forEach((line, index) => {
        transcript[index] = {
          isCurrent: isLineCurrent(line, state.player.currentTime),
          alternatives: line.alternatives
        };

        let timeUntil = getWordStartTimeMillis(transcript[index].alternatives[0].words[0]) - time;

        if (timeUntil > 0 && timeUntil <= timeUntilNextLine) {
          timeUntilNextLine = timeUntil;
          nextLineIndex = index;
        }

        foundCurrent = foundCurrent || transcript[index].isCurrent;

        transcript[index].alternatives[0].words.forEach((word, wordIndex) => {
          let isCurrentOld = word.isCurrent;
          let isCurrentNew = isWordCurrent(word, state.player.currentTime);
          
          if (isCurrentNew !== isCurrentOld) {
            transcript[index].alternatives[0].words[wordIndex] = {
              ...word,
              isCurrent: isCurrentNew
            };
          }
        });
      });

      if (!foundCurrent) {
        // No lines are currently active. Set the closest line to current
        transcript[nextLineIndex].isCurrent = true;
      }

      Vue.set(state.player, 'transcript', transcript);
    }
  },

  actions: {
    updatePlayerTime({ commit }, time) {
      commit('updatePlayerTime', time);
    }
  }
})
