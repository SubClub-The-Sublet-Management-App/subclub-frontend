// Check if a current assignment is active by checking the dates of the assignment agreement

export default function getAssignmentPeriod(roomAssignment) {
  const today = new Date();
  const startDate = new Date(roomAssignment.startDate);
  const endDate = new Date(roomAssignment.endDate);

  if (startDate <= today && today <= endDate) {
    return 'current';
  } else if (today < startDate) {
    return 'upcoming';
  } else {
    return 'past';
  }
}
