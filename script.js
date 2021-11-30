let today = moment();
const containerEl = $(".container");

$("#currentDay").text(today.format("MMM Do, YYYY"));

const workHours = ['9:00 AM' , '10:00 AM', '11:00 AM', '12:00 PM', '13:00 PM', '14:00 PM', '15:00 PM', '16:00 PM', '17:00 PM'];

$.each(workHours, function (index, value) {
  // console.log( index + ": " + value );
  // .format("h:mm A")
  console.log(moment(value, "h:mm A").hour(), today.hour());
  const workHour = moment(value, "h:mm A");
// //   const workHour = moment(value, 'h');
  const workHourFormatted = workHour.format("h:mm A");
//   const workHourToISO = workHour.toISOString();
  const currentHourFormatted = today.format("h:mm A");

  let descriptionClassName; 
  if (currentHourFormatted === workHourFormatted) {
    descriptionClassName = 'present';
  } 
  else if ((workHourFormatted).isBefore(currentHourFormatted)) {
    descriptionClassName = 'future';
  } else if ((workHourFormatted).isAfter(currentHourFormatted)) {
    descriptionClassName = 'past';
  }

  containerEl.append(`
    <div class="row">
        <div class="col-2 time-block d-flex align-items-center justify-content-center" data-time-block="${workHourFormatted}">${workHourFormatted}</div>
        <div class="col-8 description ${descriptionClassName}"></div>
        <div class="col-2 saveBtn d-flex align-items-center justify-content-center"><i class="fas fa-save"></i></div>
      </div>`);
});
