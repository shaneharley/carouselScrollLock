//GLOBAL VARIABLES
/////////////////////////////////////////

//work out what half the screen height is

//And here I'm saying that we're at heading position 1 at the start
let currentHeading = 1

//saying that the carousel is currently fixzed
let carouselFixed = true

//finding items I'm going to call on a lot
const fixedSection = document.querySelector("section.fullHeight")
const headings = document.querySelectorAll('.carouselItem h1')
const numOfHeadings = document.querySelectorAll('.carouselItem h1').length
const carouselWrapper = document.querySelector('.carouselWrapper')


//FUNCTIONS
/////////////////////////////////////////

//this is the function that loops through each item and slides it up


//this is the function that runs and unfixes the page
const unfixPage = () => {
  //if carouselFixed is true, then make sure we've scrolled to the top of the window and then unfix it
  if (carouselFixed) {
    window.scrollTo(0, 0);
    fixedSection.style.position = "absolute"
    carouselFixed = false
  }
}

let soFarTranslatedY = 0



const getHeadingActualHeight = (compute) => {
  let heading = window.getComputedStyle(document.querySelector(compute), null);
  let height = parseFloat(heading.getPropertyValue("height"));
  let padding = parseFloat(heading.getPropertyValue("padding-bottom"));
  heading = height - padding
  return heading
}

const calculateComputedBottomPadding = (compute) => {
  let paddingBottom = parseFloat(window.getComputedStyle(compute).paddingBottom)
  return paddingBottom
}


const moveCarousel = position => {
  //this runs my calculateBottomPadding function
  let paddingBottom = calculateComputedBottomPadding(headings[0])

  //this takes the amount translated so far, adds the bottom padding, AND the height of the heading and applies that to the transform
  soFarTranslatedY = soFarTranslatedY + paddingBottom + getHeadingActualHeight("h1")

  //this applies the amount to transform
  carouselWrapper.style.transform = `translateY(-${soFarTranslatedY}px)`

  //increases the counter of currentHeader
  currentHeading++



  //add the new active class
  let newActive = document.querySelectorAll('.carouselItem h1')[position]
  newActive.classList.add("active")

  //remove the current active
  let currentActive = document.querySelector('.carouselItem h1.active')
  currentActive.classList.remove("active")
}



//this is how I shift the carousel
const carousel = () => {
  //if the position of the current heading is at the same position as the number of headings there are, then we're at the end of the list
  if ((currentHeading == numOfHeadings)) {
    unfixPage()
  } else {
    //else continue to move the carousel
    moveCarousel(currentHeading)
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

window.addEventListener('wheel', throttle(carousel, 1000));

window.addEventListener('load', () => {
  headings[0].classList.add("active")
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

