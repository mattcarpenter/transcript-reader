const NANOS_PER_MILLIS = 1000000;
const MILLIS_PER_SECOND = 1000;

// TODO:
// - Make more DRY
// - Safe to assume words array is ordered. Instead of map/min|max, just
//   use the first or last item in the array.

export const isLineCurrent = (line, time) => {
  const lineBeginTimeMillis = Math.min.apply(null, 
    line.alternatives[0].words.map(word => 
      (parseInt(word.startTime.seconds) * MILLIS_PER_SECOND)
      + (word.startTime.nanos / NANOS_PER_MILLIS))
  );
  const lineEndMillis = Math.max.apply(null, 
    line.alternatives[0].words.map(word => 
      (parseInt(word.endTime.seconds) * MILLIS_PER_SECOND)
      + (word.endTime.nanos / NANOS_PER_MILLIS))
  );

  return time >= lineBeginTimeMillis && time <= lineEndMillis;
}

export const isWordCurrent = (word, time) => {
  const wordBeginMillis = (parseInt(word.startTime.seconds) * MILLIS_PER_SECOND)
  + (word.startTime.nanos / NANOS_PER_MILLIS);

  const wordEndMillis = (parseInt(word.endTime.seconds) * MILLIS_PER_SECOND)
  + (word.endTime.nanos / NANOS_PER_MILLIS)

  return time >= wordBeginMillis &&  time <= wordEndMillis;
}

export const getWordStartTimeMillis = (word) => {
  return (parseInt(word.startTime.seconds) * MILLIS_PER_SECOND)
  + (word.startTime.nanos / NANOS_PER_MILLIS);
}
