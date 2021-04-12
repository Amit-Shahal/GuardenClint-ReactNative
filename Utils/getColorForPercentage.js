export default function getColorForPercentage(percentage) {
  let red = 255;
  let green = 255;
  if (percentage < 0) {
    percentage = 0;
  }
  if (percentage > 1) {
    percentage = 1;
  }
  if (percentage >= 0 && percentage <= 0.5) {
    green = 510 * percentage;
  } else if (percentage > 0.5 && percentage <= 1) {
    red = -510 * percentage + 510;
  }

  return "rgb(" + [red, green, 150].join(",") + ")";
}
