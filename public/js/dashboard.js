const GetHabitsList = async () => {
  console.log("Get Habit");
    const response = await fetch("/api/habits/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        console.log(response);
         addData(myChart1, response.body.category, data)        
    } else {
      alert(response.statusText);
    }
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
var ctx2 = document.getElementById("barChart").getContext("2d");
var myChart2 = new Chart(ctx2, {
  type: "bar",
  data: {
    labels: [ `${GetHabitsList}`,],
    datasets: [
      {
        data: [86, 114, 106, 106, 107, 111, 133],
        label: "Total",
        borderColor: "rgb(62,149,205)",
        backgroundColor: "rgb(62,149,205,0.1)",
        borderWidth: 2,
      },
    ],
  },
});

// pie chart
var ctx1 = document.getElementById("pieChart").getContext("2d");
var myChart1 = new Chart(ctx1, {
  type: "pie",
  data: {
    labels: `${GetHabitsList}`,
    datasets: [
      {
        data: [70, 10, 6],
        borderColor: ["#3cba9f", "#ffa500", "#c45850"],
        backgroundColor: [
          "rgb(60,186,159,0.1)",
          "rgb(255,165,0,0.1)",
          "rgb(196,88,80,0.1)",
        ],
        borderWidth: 2,
      },
    ],
  },
  options: {
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
  },
});
