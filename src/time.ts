const getTimeString = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const seconds = date.getSeconds();
  const time = `${date.getHours()}:${date.getMinutes()}:${
    seconds < 10 ? `0${seconds}` : seconds
  }:${date.getMilliseconds()}`;
  // Format: 'DD.MM.YYYY HH:mm:ss:SSS'
  return `${year}-${month}-${day} ${time}`;
};

export { getTimeString };
