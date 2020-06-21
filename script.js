let windowHeight = window.innerHeight;
let moveAmount = windowHeight / 3
let headingCounter = 1


const shiftItem = () => {
  const headings = document.querySelectorAll('.carouselItem h1')
  const headingLength = headings.length

  headings.forEach(heading => {
    heading.style.transform = `translateY(-${moveAmount}px)`
  })
  headingCounter++
  moveAmount = moveAmount * 2
}

const unfixPage = () => {
  const fixedSection = document.querySelector("section.fullHeight")
  fixedSection.style.position = "relative"
}

const applyActive = (position) => {
  let newActiveHeading = document.querySelectorAll('.carouselItem h1')
  newActiveHeading = newActiveHeading[position]
  newActiveHeading.classList.add("active")
}

const removeActive = (position) => {
  let currentActiveHeading = document.querySelector('.carouselItem h1.active')
  currentActiveHeading.classList.remove("active")
}

const initialLoad = () => {
  //this is setting thee first heading 
  applyActive(0)
}

let currentPosition = 1



const throttle = (fn, wait) => {
  let time = Date.now();
  return () => {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

const moveCarousel = () => {
  let headingNum = document.querySelectorAll('.carouselItem h1').length

  if ((currentPosition == headingNum)) {
    unfixPage()
  } else {
    removeActive()
    applyActive(currentPosition)
    shiftItem()
    currentPosition++
  }
}




window.addEventListener('wheel', throttle(moveCarousel, 1000));










window.addEventListener('load', () => {
  initialLoad()
})

