import formatDigits from './formatDigits';

const dateFormater = (date: string) => {
  const [year, month, dayNTime] = date.split('-');
  const day = dayNTime.substring(0, 2);
  const time = dayNTime.substring(3);
  const [hour, minute, second] = time.split(/[:.]/);
  const newDate = new Date(
    +year,
    +month,
    +day,
    +hour,
    +minute,
    +second,
  );
  const simplifiedDate = `${formatDigits(newDate.getDay())}/${formatDigits(newDate.getMonth())}/${newDate.getFullYear()}`;
  return simplifiedDate;
};

export default dateFormater;
