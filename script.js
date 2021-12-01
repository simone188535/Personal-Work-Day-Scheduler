let today = moment();
const containerEl = $(".container");
const personalDailySchedulerLocalStorage =
  JSON.parse(localStorage.getItem("personal-daily-scheduler")) || [];

$("#currentDay").text(today.format("MMM Do, YYYY"));

const workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];


function findLSforVal(key, value) {
    return personalDailySchedulerLocalStorage.find(
         (obj) => {
           return obj[key] === value;
         }
       )
 }

$.each(workHours, function (index, workHour) {
  const workHourFormatted = moment(workHour, "h").format("h:mm A");
  const currentHour = today.hour();

  const workTimeData = findLSforVal("workhour", workHour);

  let descriptionClassName;
  if (workHour === currentHour) {
    descriptionClassName = "present";
  } else if (workHour > currentHour) {
    descriptionClassName = "future";
  } else if (workHour < currentHour) {
    descriptionClassName = "past";
  }

  containerEl.append(`
    <div class="row time-block">
        <div class="col-1 hour d-flex align-items-center justify-content-center" data-work-hour="${workHour}">${workHourFormatted}</div>
        <textarea class="col-10 description ${descriptionClassName}">${workTimeData?.description || ''}</textarea>
        <div class="col-1 save-btn saveBtn d-flex align-items-center justify-content-center"><i class="fas fa-save"></i></div>
      </div>`);
});

function saveDescription(event) {
  const savebtnClicked = $(event.target);
  const timeBlockEl = savebtnClicked.closest(".time-block");
  const timeBlockChildEl = timeBlockEl.children();
  const hourEl = timeBlockChildEl.eq(0);
  const workHourDataAttr = Number(hourEl.attr("data-work-hour"));
  const descriptionEl = timeBlockChildEl.eq(1);
  const DescriptionElVal = descriptionEl.val().trim();

  const foundDescForWorkHourInLS = findLSforVal("workhour", workHourDataAttr);

  if (foundDescForWorkHourInLS) {
    foundDescForWorkHourInLS["description"] = DescriptionElVal;
  } else {
    personalDailySchedulerLocalStorage.push({
      workhour: workHourDataAttr,
      description: DescriptionElVal,
    });
  }

  localStorage.setItem(
    "personal-daily-scheduler",
    JSON.stringify(personalDailySchedulerLocalStorage)
  );
}

containerEl.on("click", ".save-btn", saveDescription);
