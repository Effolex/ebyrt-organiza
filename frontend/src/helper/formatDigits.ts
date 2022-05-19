const formatDigits = (number: number) => (
  (number < 10) ? `0${number}` : number);

export default formatDigits;
