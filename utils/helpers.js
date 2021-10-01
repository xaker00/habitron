module.exports = {
  format_date: (date) => {
    // console.log(date);
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  date_count: (data) => {
    // console.log(data.length);
    return data.length == 0;
  },
};
