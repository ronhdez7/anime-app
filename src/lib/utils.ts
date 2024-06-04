export function clamp(num: number, max: number, min: number = 0): number {
  if (num > max) return max;
  else if (num < min) return min;
  else return num;
}

export function convertSeconds(secs: number) {
  return {
    seconds: `0${secs % 60}`.slice(-2),
    minutes: `0${Math.floor(secs / 60).toString()}`.slice(-2),
    hours: Math.floor(secs / 3600).toString(),
  };
}

export function convertSecondsToTime(secs: number) {
  const { hours, minutes, seconds } = convertSeconds(secs);
  return `${Number(hours) ? `${hours}:` : ""}${minutes}:${seconds}`;
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

export function convertToVariables(params?: object): object {
  if (!params) return {};

  const vars = {};
  const keys = Object.keys(params) as (keyof typeof params)[];
  for (const key of keys) {
    if (!(key in params)) continue;
    if (params[key] === undefined || params[key] === null) continue;

    vars[key] = params[key];
  }

  return vars;
}

export const createFormDataWithImage = (uri: string) => {
  const fileName = uri.split("/").pop() as string;
  const fileType = fileName.split(".").pop();
  const formData = new FormData();

  // react native has a different type (FormDataValue) for appending form data
  formData.append("file", {
    uri,
    name: fileName,
    type: `image/${fileType}`,
  } as any);

  return formData;
};

export function getInfiniteData<T>(data?: T[] | { pages: T[][] }): T[] {
  return (
    (Array.isArray(data) ? data : data?.pages.flatMap((page) => page)) ??
    Array(5)
  );
}
