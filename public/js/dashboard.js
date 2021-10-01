const GetHabitsList = async () => {
  // console.log("Get Habit");
  //   const response = await fetch("/api/habits/", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   if (response.ok) {
  //       console.log(response);
  //        addData(myChart, response.body.category, data)        
  //   } else {
  //     alert(response.statusText);
  //   }
};

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  chart.update();
}

//bar chart
var ctx = document.getElementById("barChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Monday", "Tuesday", "Wednesday"],
    datasets: [
      {
        data: [86, 114, 106],
        label: "Total",
        borderColor: "rgb(62,149,205)",
        backgroundColor: "rgb(62,149,205,0.1)",
        borderWidth: 2,
      },
    ],
  },
});
