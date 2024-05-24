export function clamp(num: number, max: number, min: number = 0): number {
  if (num > max) return max;
  else if (num < min) return min;
  else return num;
}

export function convertSeconds(secs: number) {
  return {
    seconds: `0${secs % 60}`.slice(-2),
    minutes: Math.floor(secs / 60).toString(),
    hours: Math.floor(secs / 3600).toString(),
  };
}
