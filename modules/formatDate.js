export default function formatDate(date) {
  let year = date.getFullYear();
  let month;
  let day;

  if (date.getMonth() < 9) {
    month = "0" + (date.getMonth() + 1);
  } else {
    month = date.getMonth() + 1;
  }

  if (date.getDate() < 9) {
    day = "0" + date.getDate();
  } else {
    day = date.getDate();
  }

  return day + "/" + month + "/" + year;

}
