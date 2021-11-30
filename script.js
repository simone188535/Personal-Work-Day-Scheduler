let today = moment();
const containerEl = $(".container");

$("#currentDay").text(today.format("MMM Do, YYYY"));

const workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

$.each(workHours, function (index, workHour) {
    // https://stackoverflow.com/a/40351347/6195136
  // console.log( index + ": " + value );
  // .format("h:mm A")
//   console.log(moment(value, "h:mm A").hour(), today.hour());
// ADD TODAYS DATE IN STRING
//   const workHour = moment(value, "h").hour();
  const workHourFormatted = moment(workHour, "h").format("h:mm A");
//   const workHourFormatted = moment(value, "h").format("h:mm A");
  const currentHour = today.hour();

  console.log('workHour', workHour, 'currentHour', currentHour);

  let descriptionClassName; 
  if (workHour === currentHour) {
    descriptionClassName = 'present';
  } else if (workHour > currentHour) {
    descriptionClassName = 'future';
  } else if (workHour < currentHour) {
    descriptionClassName = 'past';
  }

  containerEl.append(`
    <div class="row time-block">
        <div class="col-1 hour d-flex align-items-center justify-content-center" data-time-block="${workHour}">${workHourFormatted}</div>
        <textarea class="col-10 description ${descriptionClassName}"></textarea>
        <div class="col-1 btn saveBtn d-flex align-items-center justify-content-center"><i class="fas fa-save"></i></div>
      </div>`);
});
