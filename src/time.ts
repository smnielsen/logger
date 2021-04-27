const getTimeString = () => {
  const date = new Date();
  console.log('Test now', date.toUTCString());
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const seconds = date.getSeconds();
  const time = `${date.getHours()}:${date.getMinutes()}:${
    seconds < 10 ? `0${seconds}` : seconds
  }:${date.getMilliseconds()}`;
  // Format: 'DD.MM.YYYY HH:mm:ss:SSS'
  return `${year}-${month}-${day} ${time}`;
};

export { getTimeString };
