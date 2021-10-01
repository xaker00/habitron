const newHabitHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const habit = document.querySelector(".new-habit").value.trim();
    console.log(habit);
    
    const response = await fetch("/api/habitRoutes", {
        method: "POST",
        body: JSON.stringify( { habit } ),
        headers: { "Content-Type": "application/json" },
      });
};







document
  .querySelector('.habit-form')
  .addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {newHabitHandler}
    });

