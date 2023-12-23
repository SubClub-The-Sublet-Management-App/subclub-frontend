// Helper function to format the date of birth
function formattedDateForBackend(initialDate) {
  const date = new Date(initialDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default formattedDateForBackend;
