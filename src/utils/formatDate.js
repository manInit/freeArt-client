export default dateString => {
  const date = new Date(dateString + 'Z')

  return date.toLocaleTimeString() + ' ' + date.toLocaleDateString()
}