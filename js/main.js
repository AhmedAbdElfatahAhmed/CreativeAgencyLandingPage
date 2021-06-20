let backgroundOption;
let backgroundInterval;
// start to show and hide settings-box
let spinner = document.querySelector(".spinner");
let spinnerI = document.querySelector(".spinner i");
let settingsBox = document.querySelector(".settings-box");
spinner.onclick = () => {
  // Toggle class opened for opening and closing settings-box
  settingsBox.classList.toggle("opened");
  // Toggle class opened for moving spinner with settings-box
  spinner.classList.toggle("opened");
  // Toggle class fa-spin for rotation spinner if settings-box is opened
  spinnerI.classList.toggle("fa-spin");
};
// End to show and hide settings-box

// Start to handle All Active button
function handleActiveLink(event) {
  event.target.parentElement
    .querySelectorAll(".active")
    .forEach((classRemoved) => {
      classRemoved.classList.remove("active");
    });
  event.target.classList.add("active");
}
// End to handle Active Link

// Localstorage
function mainColorInlocalStorage() {
  //Start switch colors in website
  let getColor = localStorage.getItem("mainColor");

  if (getColor !== null) {
    // set color in Root
    document.documentElement.style.setProperty("--mainColor", `${getColor}`); // from search in google
    document
      .querySelectorAll(".settings-box .setting-colors .colors span")
      .forEach((element) => {
        element.classList.remove("active");
        if (element.dataset.color == getColor) {
          // add active class
          element.classList.add("active");
        }
      });
    //End switch colors in website
    backgroundAndBulletsInlocalStorage();
  } else {
    backgroundAndBulletsInlocalStorage();
  }
}
mainColorInlocalStorage();
function backgroundAndBulletsInlocalStorage() {
  //Start save random background in Localstorage
  let getBackgroundOption = localStorage.getItem("Background_option");
  document
    .querySelectorAll(".setting-backgrounds .buttons span")
    .forEach((element) => {
      element.classList.remove("active");
      if (element.dataset.randombackground == getBackgroundOption) {
        // add active class
        element.classList.add("active");
      }
    });
  if (getBackgroundOption == "Yes") {
    backgroundOption = true;
    randomizeImgs();
  } else {
    clearInterval(backgroundInterval);
  }
  //End save random background in Localstorage

  //Start save bullets in Localstorage
  let getBulletOption = localStorage.getItem("bullet_option");
  document
    .querySelectorAll(".setting-bullets .buttons span")
    .forEach((element) => {
      element.classList.remove("active");
      if (element.dataset.bullets == getBulletOption) {
        // add active class
        element.classList.add("active");
      }
    });
  if (getBulletOption == "Yes") {
    document.querySelector(".nav-bullets").classList.remove("bullet-removed");
  } else {
    document.querySelector(".nav-bullets").classList.add("bullet-removed");
  }
  //End save bullets in Localstorage
}
const mainColor = document.querySelectorAll(
  ".settings-box .setting-colors .colors span"
);
mainColor.forEach((el) => {
  el.onclick = (e) => {
    localStorage.setItem("mainColor", el.getAttribute("data-color"));
    mainColorInlocalStorage();
    // remove active class from span
    // e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    //   element.classList.remove("active");
    // });
    // // add active class from span
    // el.classList.add("active");
    handleActiveLink(e);
  };
});

// select landing page Element
let landingHeader = document.querySelector("header");
// Get Array of Images
ImagesList = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
function randomizeImgs() {
  if (backgroundOption) {
    backgroundInterval = setInterval(() => {
      let RandomKey = Math.floor(Math.random() * ImagesList.length);
      landingHeader.style.backgroundImage = `url(images/${ImagesList[RandomKey]})`;
    }, 5000);
  }
}

// stop or not random background in website
const settingBackgrounds = document.querySelectorAll(
  ".setting-backgrounds span"
);

settingBackgrounds.forEach((span) => {
  span.onclick = (e) => {
    if (e.target.innerHTML === "Yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("Background_option", "Yes");
    } else {
      clearInterval(backgroundInterval);
      localStorage.setItem("Background_option", "No");
    }
    // e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    //   element.classList.remove("active");
    // });
    // // add active class from span
    // span.classList.add("active");
    handleActiveLink(e);
  };
});

// Start show and hide bullets
const settingBullets = document.querySelectorAll(".setting-bullets span");

settingBullets.forEach((span) => {
  span.onclick = (e) => {
    if (e.target.innerHTML === "Yes") {
      document.querySelector(".nav-bullets").classList.remove("bullet-removed");
      localStorage.setItem("bullet_option", "Yes");
    } else {
      document.querySelector(".nav-bullets").classList.add("bullet-removed");
      localStorage.setItem("bullet_option", "No");
    }
    // e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    //   element.classList.remove("active");
    // });
    // // add active class from span
    // span.classList.add("active");
    handleActiveLink(e);
  };
});

// End show and hide bullets

// Start our Skills
let ourSkills = document.querySelector(".skills");
let spanProgress = document.querySelectorAll(".skills-progress span");
window.onscroll = function () {
  // skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;
  // skills Offset Height
  let skillsOffsetHeight = ourSkills.offsetHeight;
  // Window Height
  let windowHeight = this.innerHeight;
  // Window scrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop >= skillsOffsetTop - 50) {
    spanProgress.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// End our Skills

// Start Gallery

let boxImages = document.querySelectorAll(".box-images img");

boxImages.forEach((img) => {
  img.addEventListener("click", () => {
    // create popup overlay
    let popupOverlay = document.createElement("div");
    //add class to popup overlay
    popupOverlay.className = "popup-overlay";
    // append popup overlay to body
    document.body.appendChild(popupOverlay);
    // create popup box
    let popupBox = document.createElement("div");
    //add class to popupBox
    popupBox.className = "popup-box";
    // create span
    let span = document.createElement("span");
    // create span text
    let spanText = document.createTextNode("X");
    // append span Text to span
    span.appendChild(spanText);
    // append span to popupBox
    popupBox.appendChild(span);
    if (img.alt !== "") {
      // create h3
      let heading = document.createElement("h3");
      // create text heading
      let headingText = document.createTextNode(img.alt);
      // append headingText to h3
      heading.appendChild(headingText);
      // append h3 to popupBox
      popupBox.appendChild(heading);
    }
    // creat popup image
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    // append popupImg to popupBox
    popupBox.appendChild(popupImg);
    // append popupBox to body
    document.body.appendChild(popupBox);
    span.onclick = () => {
      popupBox.remove();
      document.querySelector(".popup-overlay").remove();
    };
  });
});

// End Gallery

// Start nav Bullets
// select all bullets
/*
const bullets = document.querySelectorAll(".nav-bullets .bullet");
bullets.forEach((bullet) => {
  bullet.onclick = (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  };
});
*/
// End nav Bullets
// start links to go to target section
/*
const links = document.querySelectorAll("nav ul li a");
links.forEach((link) => {
  link.onclick = (e) => {
    e.preventDefault();
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  };
});
*/
// End links to go to target section

// using function instesd for repeating your code (see above)

// Start go to section by links or bullets
const bullets = document.querySelectorAll(".nav-bullets .bullet");
const links = document.querySelectorAll("nav ul li a");

function goToSection(buttons) {
  buttons.forEach((button) => {
    button.onclick = (e) => {
      e.preventDefault(); // because links not work due to href in ===> a
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    };
  });
}
goToSection(bullets);
goToSection(links);
// End go to section by links or bullets

// Start add active class to links

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.target.parentElement.parentElement
      .querySelectorAll(".active")
      .forEach((classRemoved) => {
        classRemoved.classList.remove("active");
      });
    e.target.classList.add("active");
  });
});

// End add active class to links

// Start reset options
function resetOptions() {
  localStorage.setItem("mainColor", "#4caf50");
  localStorage.setItem("Background_option", "Yes");
  localStorage.setItem("bullet_option", "Yes");
  mainColorInlocalStorage();
  // OR
  // window.location.reload();
}

document.querySelector(".settings-box button").onclick = () => {
  resetOptions();
};

// End reset options

// Start Toggle Menu Button
let barButton = document.querySelector("nav i");
let ulInNav = document.querySelector("nav ul");
barButton.onclick = () => {
  ulInNav.classList.toggle("toggleMenu");
};

// click anywhere outside menu and Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== barButton && e.target !== ulInNav) {
    ulInNav.classList.remove("toggleMenu");
  }
});

// End Toggle Menu Button
