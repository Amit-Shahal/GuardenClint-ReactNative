export default function calculatPostDateAndTypeFunc(time) {
  let type = "";

  time /= 1000;
  time < 3600
    ? ((type = "minuts"), (time /= 60))
    : time < 86400
    ? ((type = "hours"), (time /= 60 * 60))
    : time < 2592000
    ? ((type = "days"), (time /= 60 * 60 * 24))
    : time < 31556952
    ? ((type = "months"), (time /= 60 * 60 * 24 * 30))
    : ((type = "years"), (time /= 60 * 60 * 24 * 30 * 12));
  time = Math.floor(time);
  return { type, time };
}
