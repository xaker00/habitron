//handles the new habit thing
const newHabitHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const habit = document.querySelector(".new-habit").value.trim();
    console.log(habit);
    
    const response = await fetch("/api/habit", {
        method: "POST",
        body: JSON.stringify( { habit } ),
        headers: { "Content-Type": "application/json" },
      });
};

// handle checkbox changes
const onHabitCheckboxChange = (event) => {
  const target = $(event.target);
  const logId = target.prop("id");
  const habitId = target.data("habit-id");
  const day = +target.data("day") || 0; // get day and convert to number
  const checked = target.prop("checked");
  let status = checked ? "Done" : undefined;

  let data = {
    habit_id: habitId,
    status: status,
    entry_date: localDateWithOffset(day),
  };

  console.log("checkbox data", data);

  if (logId) {
    // habit has a log entry already
    return;
  } else {
    // no log entry for this habit
  }

  $.ajax({
    // The URL for the request
    url: "/api/log/",
    data: data,
    type: "POST",
    dataType: "json",
  })
    // Code to run if the request succeeds (is done);
    // The response is passed to the function
    .done((json) => {
      // done
    })
    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    .fail((xhr, status, errorThrown) => {
      // fail
    })
    .always((xhr, status) => {
      // always
    });
};


// Convert date into a local date with day offset
const localDateWithOffset = (offset) => {
  console.log("offset", offset);

  // YYYYY-MM-DD
  let t = new Date();
  console.log("t", t);

  // convert the local time zone offset from minutes to milliseconds
  const z = t.getTimezoneOffset() * 60 * 1000;



  
  tLocal = new Date(t - z + // apply timezone shift
    offset * 24 *60* 60 * 1000 // apply day shift
    );
  console.log("tLocal", tLocal);

  // convert to ISO format string
  let iso = tLocal.toISOString();

  // drop the everything except YYYY-MM-DD
  iso = iso.slice(0, 10);
  return iso;
};




//adding event listener to the new habit form
document
  .querySelector('.habit-form')
  .addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {newHabitHandler}
    });


// add event listener to habit checkboxes
$(".habit-grid").on("click", ":checkbox", (event) => {
  console.log(event);
  onHabitCheckboxChange(event);
});