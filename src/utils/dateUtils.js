/**
 * Formats a JavaScript Date object into a readable string format.
 * @param {Date} date - The date to format.
 * @return {string} - The formatted date string.
 */
const formatDate = (date) => {
  const d = new Date(date);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const hour = d.getHours() % 12 || 12; // Convert 24h to 12h format and treat 0 as 12
  const minute = d.getMinutes().toString().padStart(2, "0"); // Ensure two digits
  const ampm = d.getHours() < 12 ? "AM" : "PM";

  return `${day} ${month} ${year}, ${hour}:${minute} ${ampm}`;
};

export { formatDate };
