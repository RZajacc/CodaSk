const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-US');
};

const formatDateAndTime = (dateAndTime: Date | string) => {
  const date = new Date(dateAndTime).toLocaleDateString();
  const time = new Date(dateAndTime).toLocaleTimeString();
  return (
    <>
      {date}, {time}
    </>
  );
};

// TO FIX
const formatInputDate = (date: Date | string) => {
  console.log('DATE', date);
  const formattedDate = new Date().toISOString().split('T')[0];
  return formattedDate;
};

export {formatDate, formatDateAndTime, formatInputDate};
