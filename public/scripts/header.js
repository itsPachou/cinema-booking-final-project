const hamburgerBtn = document.getElementById('hamburger-btn')
const menu = document.getElementById('menu')

hamburgerBtn.addEventListener('click', function () {
    hamburgerBtn.classList.toggle('is-active')
    menu.classList.toggle('is-active')
})
