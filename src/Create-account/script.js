//Botão up
const btn = document.getElementById('btnTop')

btn.addEventListener('click', () => {
  window.scrollTo(0,0)
  document.removeEventListener('scroll', ocult)
})

const ocult = () => {
  if (window.scrollY > 10) {
    btn.style.display = "flex"
  } else {
    btn.style.display = "none"
  }
}

document.addEventListener("scroll", () =>{
  ocult()
  document.removeEventListener('scroll', ocult)

})

ocult()