//GLOBAL VARIABLES
/////////////////////////////////////////

//finding items I'm going to call on a lot
const fixedSection = document.querySelector("section.fullHeight")
const headings = document.querySelectorAll('.carouselItem h1')
const numOfHeadings = document.querySelectorAll('.carouselItem h1').length
const carouselWrapper = document.querySelector('.carouselWrapper')

//setting global variables
let soFarTranslatedY = 0
let currentHeading = 0
let carouselFixed = true
let scrollingDown = true


//FUNCTIONS
/////////////////////////////////////////

//this changes the classes and applies 
const changeCarouselItemsStyles = (position) => {

  //this applies the amount to transform
  carouselWrapper.style.transform = `translateY(-${soFarTranslatedY}px)`

  //remove the current active class
  let currentActive = document.querySelector('.carouselItem h1.active')
  currentActive.classList.remove("active")

  //add the new active class
  let newActive = document.querySelectorAll('.carouselItem h1')[position]
  newActive.classList.add("active")
}

//function to get the height of something
const getElementHeight = (elem) => {
  let height = window.getComputedStyle(document.querySelector(elem));
  height = parseFloat(height.getPropertyValue("height"));
  return height
}


const moveCarousel = (position) => {

  let headingHeight = getElementHeight("h1")

  if (scrollingDown == true) {
    soFarTranslatedY = soFarTranslatedY + headingHeight
    changeCarouselItemsStyles(position)
  }

  else {
    soFarTranslatedY = soFarTranslatedY - headingHeight
    changeCarouselItemsStyles(position)
  }
}


const unfixFixedSection = () => {
  if (carouselFixed && scrollingDown == true) {
    window.scrollTo(0, 0);
    fixedSection.classList.remove("fixed")
    carouselFixed = false

  } else if (carouselFixed == false && scrollingDown == false) {
    fixedSection.classList.add("fixed")
    carouselFixed = true
  }
}


//this is the logic to decide whether to shift at all depending on scroll direction, whether the carousel is currently fixed
const carousel = () => {
  if ((currentHeading == numOfHeadings - 1 && scrollingDown && carouselFixed)) {
    unfixFixedSection()
  }
  else if (scrollingDown == true && carouselFixed == true) {
    currentHeading++
    moveCarousel(currentHeading)
  } else if (scrollingDown == false && currentHeading != 0 && carouselFixed) {
    currentHeading = currentHeading - 1
    moveCarousel(currentHeading)
  }
}


//EVENT LISTENERS
/////////////////////////////////////////

//this is how I'm detecting which way the user is scrolling
window.addEventListener('wheel', (event) => {
  let delta = event.deltaY
  if (delta > 1) {
    scrollingDown = true
    console.log("scrolling down")
  } else if (delta < 0) {
    scrollingDown = false
    console.log("scrolling up")
  }
})

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

window.addEventListener('wheel', throttle(carousel, 900));


// SCROLL OBSERVER
///////////////////////////////////////

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
      carouselFixed = true
      fixedSection.classList.add("fixed")
    }
  })
}

window.addEventListener('load', () => {
  createObserver()
})

