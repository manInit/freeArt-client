export default theme => {
  localStorage.setItem('theme', theme)
  document.body.setAttribute('data-theme', theme)
}