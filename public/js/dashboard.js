console.log("dashboard.js")

const GetHabitsList = async () => {
  console.log("Get Habit");
    const response = await fetch("/api/chart/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  if (response.ok) {
    const data = await response.json();
    const entry_date = [];
    const entry_count = [];
    for (var record in data) {
      console.log(data[record].entry_date);
      entry_date.push({ entry_date: data[record].entry_date });
      entry_count.push({ entry_date: data[record].records });
      addData(myChart, data[record].entry_date, data[record].records);
    }

     addData(myChart, entry_date, entry_count)
  } else {
      alert(response.statusText);
    }
};

GetHabitsList()

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
    labels: [],
    datasets: [
      {
        data: [],
        label: "Total entry count by date",
        borderColor: "rgb(62,149,205)",
        backgroundColor: "rgb(62,149,205,0.1)",
        borderWidth: 2,
      },
    ],
  },
});
