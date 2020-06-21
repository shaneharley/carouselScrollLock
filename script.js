//GLOBAL VARIABLES
/////////////////////////////////////////

//work out what half the screen height is
let moveAmount = window.innerHeight * .45

//And here I'm saying that we're at heading position 1 at the start
let currentHeading = 1

//saying that the carousel is currently fixzed
let carouselFixed = true

//finding items I'm going to call on a lot
const fixedSection = document.querySelector("section.fullHeight")
const headings = document.querySelectorAll('.carouselItem h1')
const numOfHeadings = document.querySelectorAll('.carouselItem h1').length


//FUNCTIONS
/////////////////////////////////////////

//this is the function that loops through each item and slides it up
const shiftItemUp = () => {
  headings.forEach(heading => {
    heading.style.transform = `translateY(-${moveAmount}px)`
  })
  currentHeading++
  moveAmount = moveAmount * 2
}

//this is the function that runs and unfixes the page
const unfixPage = () => {
  //if carouselFixed is true, then make sure we've scrolled to the top of the window and then unfix it
  if (carouselFixed) {
    window.scrollTo(0, 0);
    fixedSection.style.position = "absolute"
    carouselFixed = false
  }
}

//this applies the active class to the new heading
const applyActive = (position) => {
  let newActive = document.querySelectorAll('.carouselItem h1')[position]
  newActive.classList.add("active")
}

//this removes the active class from the current heading
const removeActive = (position) => {
  let currentActive = document.querySelector('.carouselItem h1.active')
  currentActive.classList.remove("active")
}

//this is how I shift the carousel
const moveCarousel = () => {

  if ((currentHeading == numOfHeadings)) {
    unfixPage()
  } else {
    removeActive()
    applyActive(currentHeading)
    shiftItemUp()
  }
}





//EVENT LISTENERS
/////////////////////////////////////////

//this is how I slow down my scroll calls
const throttle = (functionToRun, wait) => {
  let time = Date.now();
  return () => {
    if ((time + wait - Date.now()) < 0) {
      functionToRun();
      time = Date.now();
    }
  }
}

window.addEventListener('wheel', throttle(moveCarousel, 1000));

window.addEventListener('load', () => {
  applyActive(0)
  createObserver()
})


//SCROLL OBSERVER
/////////////////////////////////////////

const createObserver = () => {
  let observer

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1
  }

  observer = new IntersectionObserver(handleIntersect, options)
  observer.observe(fixedSection)
}

const handleIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio == 1) {
      fixedSection.style.position = "fixed"
      console.log("it ran")
    }
  })
}

