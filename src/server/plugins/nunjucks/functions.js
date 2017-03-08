export function formatDate(day, month, year) {
  return [year, month, day].map(String).join('/');
}
