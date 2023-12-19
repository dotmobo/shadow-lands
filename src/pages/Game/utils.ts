export function strtoHex(str: string) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  if (result.length % 2 == 1) {
    result = '0' + result;
  }
  return result;
}

export function numtoHex(num: number) {
  let result = num.toString(16);
  if (result.length % 2 == 1) {
    result = '0' + result;
  }
  return result;
}
