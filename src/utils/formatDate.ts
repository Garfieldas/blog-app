const formatDate = (date: Date) => {
  const dateObj = new Date(date);
  const toString = dateObj.toLocaleString();
  return toString;
}

export const displayDate = (date1: Date, date2: Date) => {
  const dateobj1 = new Date(date1)
  const dateobj2 = new Date(date2);
  if (dateobj1.getTime() > dateobj2.getTime()){
    return {
        label: 'Created_at',
        date: formatDate(date1)
    }
  }
  else if(dateobj1.getTime() < dateobj2.getTime()){
    return {
        label: 'Updated_at',
        date: formatDate(date2)
    }
  }
  else{
    return {
        label: 'Created_at',
        date: formatDate(date1)
    }
  }
}