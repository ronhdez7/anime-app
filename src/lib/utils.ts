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

export function convertToSearchParams(params?: object): string {
  if (!params) return "";

  const options = {};
  const keys = Object.keys(params) as (keyof typeof params)[];
  for (const key of keys) {
    if (!(key in params)) continue;
    if (params[key] === undefined) continue;

    options[key] = params[key];
  }

  return new URLSearchParams(options).toString();
}
