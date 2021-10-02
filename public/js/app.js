

const newHabitHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const habit = document.querySelector(".new-habit").value.trim();
  console.log(habit);

  if (habit) {
    const response = await fetch("/api/habits", {
      method: "POST",
      body: JSON.stringify({ habit }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

// document
//   .querySelector(".habit-form")
//   .addEventListener("keypress", function (e) {
//     if (e.key === "Enter") {
//       newHabitHandler;
//     }
//   });

  document
    .querySelector(".btn-post-add")
    .addEventListener("click", newHabitHandler);