export default function formatDate(day, month, year) {
  return [year, month, day].map(String).join('/');
}
