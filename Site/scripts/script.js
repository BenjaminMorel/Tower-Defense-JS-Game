const nav = document.getElementById('nav')
const hamburger = document.getElementById('hamburger')

nav.addEventListener('click', handleNav)
hamburger.addEventListener('click', handleNav)

function handleNav() {
  if(!nav.classList.contains('nav--active')){
    nav.classList.add('nav--active')
    hamburger.classList.add('hamburger--active')
  } else {
    nav.classList.remove('nav--active')
    hamburger.classList.remove('hamburger--active')
  }
}