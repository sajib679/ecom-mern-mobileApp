const formatDate = (date) => {
  if (date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }
  return "";
};
const formatDate2 = (date) => {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (date) {
    const d = new Date(date);
    return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }
};

export { formatDate, formatDate2 };
