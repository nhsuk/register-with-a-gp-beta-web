export function formatDate(year, month, day) {
  return [day, month, year].map(String).join('/');
}
