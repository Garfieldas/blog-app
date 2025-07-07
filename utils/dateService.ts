export const displayDate = (date: Date) => {
  const dateObj = new Date(date);
  const toString = dateObj.toLocaleString();
  return toString;
}

export const toDate = (date: Date) => {
  const dateobj = new Date(date)
  return dateobj.getTime();
}