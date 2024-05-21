export function clamp(num: number, max: number, min: number = 0): number {
  if (num > max) return max;
  else if (num < min) return min;
  else return num;
}
