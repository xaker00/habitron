module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    // The custom helper 'format_date' takes in a timestamp
    format_date: (date) => {
      // Using JavaScript Date methods, we get and format the month, date, and year
      // We need to add one to the month since it is returned as a zero-based value
      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var day = days[ date.getDay() ];
      var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      var month = months[ date.getMonth() ];
      return `${day}, ${month} ${new Date(date).getDate()}`;
    },
    dateNow: () => {
      return new Date();
    },
    dateYesterday: () => {
      var d = new Date();
      var y = d.setDate(d.getDate() - 1);
      var yesterday = new Date(y)
      return yesterday;
    },
    dateTwoDay: () => {
      var d = new Date();
      var y = d.setDate(d.getDate() - 2);
      var two = new Date(y)
      return two;
    },
    dateThreeDay: () => {
      var d = new Date();
      var y = d.setDate(d.getDate() - 3);
      var three = new Date(y)
      return three;
    },
    dateFourDay: () => {
      var d = new Date();
      var y = d.setDate(d.getDate() - 4);
      var four = new Date(y)
      return four;
    },
    dateFiveDay: () => {
      var d = new Date();
      var y = d.setDate(d.getDate() - 5);
      var five = new Date(y)
      return five;
    },
    dateSixDay: () => {
      var d = new Date();
      var y = d.setDate(d.getDate() - 6);
      var six = new Date(y)
      return six;
    },
  };
  
>>>>>>> origin/steven-branch
