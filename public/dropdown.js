// Attach hover event handler for #aboutMe
$('#aboutMe').hover(
    function(){
      $('.submenu').css('background-color', '#555');
    }, 
    function(){
      $('.submenu').css('background-color', ''); // Revert to original background color
    }
  );
  
  $(document).ready(function () {
    
    console.log("drop");
    document.getElementById("apps").innerHTML =  "<i class='icon-laptop'></i> Applications";
    document.getElementById("mech").innerHTML = "<i class='icon-wrench'></i> Mechanics";
    document.getElementById("games").innerHTML = "<i class='icon-gamepad'></i> Games";
    const elementToHide = document.querySelector(".dropdown-content");
    const services = document.querySelector("#projects");
    const service = document.querySelector(".service");
    const dropdownContent = document.querySelector(".dropdown-content");
    let viewed = false;
    let chosen = false;
    dropdownContent.classList.add("hidden");
    $(".dropdown-content").css("display", "block");
    //elementToHide.classList.add("hidden");
    // Add an event listener for the 'transitionend' event
    dropdownContent.addEventListener("transitionend", (event) => {
      const computedStyle = window.getComputedStyle(dropdownContent);
      const maxHeight = computedStyle.getPropertyValue("max-height");
  
      // if (event.propertyName === "max-height" && maxHeight !== "0px") {
      //   viewed = true;
      //   console.log("Dropdown content is viewed");
      // } else {
      //   viewed = false;
      //   console.log("Dropdown content is hidden");
      // }
    });
  
    let isDropdownVisible = false;
  
    // Event listener for clicking the "Services" link
  
    services.addEventListener("touchstart", function (event) {
      console.log("t");
      event.stopPropagation(); // Prevent this click event from propagating to the document
      //services.style.backgroundColor = "#555";
      if (isDropdownVisible) {
        // Hide the dropdown
        dropdownContent.classList.add("hidden");
        if (window.location.href === "https://kindhearted-hollow-cactus.glitch.me/") services.style.backgroundColor = "rgb(128, 128, 128)";
        else services.style.backgroundColor = "white";
        $(".dropdown-content").css("max-height", "0px");
        //$('.services').css('background-color', 'white');
        //$(".dropdown-content").css("display", "none");
        isDropdownVisible = false;
        console.log(isDropdownVisible);
      } else {
        
        services.style.backgroundColor = "#555";
        
        dropdownContent.classList.remove("hidden");
         $(".dropdown-content").css("max-height", "300px");
  $(".dropdown-content").css("transition", "max-height 0.7s ease");
        isDropdownVisible = true;
        console.log(isDropdownVisible);
      }
    });
     const serviceElements = document.querySelectorAll(".service");
  
    // Add event listeners to all "service" elements
    serviceElements.forEach(function (service) {
      service.addEventListener("touchstart", function (event) {
        service.style.backgroundColor = "#555";
      });
    });
    // Event listener to hide the dropdown when clicking anywhere on the document
    window.addEventListener("touchstart", function () {
      //document.getElementById("projects").style.backgroundColor = "rgb(128, 128, 128)";
      if (isDropdownVisible) {
        // dropdownContent.classList.add("hidden");
        $(".dropdown-content").css("max-height", "0px");
        if (window.location.href === "https://kindhearted-hollow-cactus.glitch.me/") document.getElementById("projects").style.backgroundColor = "rgb(128, 128, 128)";
        else document.getElementById("projects").style.backgroundColor = "white";
        //services.style.backgroundColor = "#333";
        isDropdownVisible = false;
        console.log(isDropdownVisible);
      }
    });
    const images = document.querySelectorAll(".image");
      const viewer = document.getElementById("image-viewer");
      const displayedImage = document.getElementById("displayed-image");
      const displayedImageNumber = document.getElementById("displayed-image-number");
      let currentImage = null;
      images.forEach(image => {
          image.addEventListener("click", function () {
              const src = this.querySelector("img").getAttribute("src"); // Corrected line
              
      
              // Set the clicked image as the current image
              currentImage = image;
              // Update the displayed image
              displayedImage.src = src;
              displayedImageNumber.innerText = imageNumber;
  
              // Update the thumbnail
              images.forEach(thumbnail => {
                  thumbnail.classList.remove("selected");
              });
              this.classList.add("selected");
          });
      });
    $('#projects').hover(
      function(){
        $('.submenu1').css('background-color', '#555');
      }, 
      function(){
        $('.submenu1').css('background-color', ''); // Revert to original background color
      }
    );
  });
  function hidemenu() {
    $(".dropdown-content").css("display", "none");
  }
  
  window.onpopstate = function (event) {
    // Check if the dropdown should be hidden based on your logic
    console.log("pop");
  };
  
  const pageviewsCount = document.getElementById('pageviews-count');
  const visitsCount = document.getElementById('visits-count');
  let eng = true;
  function toggleElements() {
    eng = !eng;
    const element1 = $('.toggle-element', '.visible');
    const element2 = $('.toggle-element');
    if (eng) {
      $('.down').removeClass('Pol').addClass('Eng');
    } 
    else {
      $('.down').removeClass('Eng').addClass('Pol');
    }
    // Toggle the visibility of both elements
    element1.toggleClass('visible');
    element2.toggleClass('visible');
    document.getElementById("apps").innerHTML = eng ?  "<i class='icon-laptop'></i> Applications" :  "<i class='icon-laptop'></i> Aplikacje";
    document.getElementById("mech").innerHTML = eng ? "<i class='icon-wrench'></i> Mechanics" :  "<i class='icon-wrench'></i> Mechanika";
    document.getElementById("games").innerHTML = eng ? "<i class='icon-gamepad'></i> Games" :  "<i class='icon-gamepad'></i> Gry";
  }
  
  // 'visit' item persists in storage for the remainder of the user session
  function display() {
    $("#viewer").css("display", "flex")
    $("#homeContent").css("display", "none")
  }
  
  function back() {
    $("#viewer").css("display", "none")
    $("#homeContent").css("display", "block")
  }
// Function to check if the device supports touch input
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Only run the hover effect if the device is not a touch device
if (!isTouchDevice()) {
  const hoverableElements = document.querySelectorAll('.service');

  hoverableElements.forEach((element) => {
    // Add event listener for mouse entering (hover starts)
    element.addEventListener('mouseover', () => {
      document.getElementById("projects").style.backgroundColor = "#555";
      $('.submenu1').css('background-color', '#555');
    });

    // Add event listener for mouse leaving (hover ends)
    element.addEventListener('mouseout', () => {
      document.getElementById("projects").style.backgroundColor = '';
      $('.submenu1').css('background-color', '');
    });
  });
}

  
//   window.addEventListener('load', function() {
//     const hoverTexts = document.querySelectorAll('.projectImg');
//   const tooltipPol = document.querySelector('.tooltip-textPol');
//   const tooltipEng = document.querySelector('.tooltip-textEng');
  
//   hoverTexts.forEach((hoverText) => {
//     hoverText.addEventListener('mouseover', (e) => {
//       if (eng) {
//         tooltipEng.textContent = `Click to enlarge`;
//         tooltipEng.style.display = 'block';
//       } else {
//         tooltipPol.textContent = `Kliknij, aby powiększyć`;
//         tooltipPol.style.display = 'block';
//       }
//     });
  
//     hoverText.addEventListener('mouseout', (e) => {
//       if (eng) {
//         tooltipEng.style.display = 'none';
//       } else {
//         tooltipPol.style.display = 'none';
//       }
//     });
  
//     hoverText.addEventListener('mousemove', (e) => {
//       const x = e.clientX;
//       const y = e.clientY;
//       if (eng) {
//         tooltipEng.style.left = x + 10 + 'px';
//         tooltipEng.style.top = y + 10 +  'px';
//       } else {
//         tooltipPol.style.left = x + 10 + 'px';
//         tooltipPol.style.top = y + 10 + 'px';
//       }
//     });
//   });
  
//   const hoverTextsZoomed = document.getElementById('displayed-image');
  
//   hoverTextsZoomed.addEventListener('mouseover', (e) => {
//     if (eng) {
//       tooltipEng.textContent = `Click to back to site`;
//       tooltipEng.style.display = 'block';
//     } else {
//       tooltipPol.textContent = `Kliknij, aby powrócić`;
//       tooltipPol.style.display = 'block';
//     }
//   });
  
//   hoverTextsZoomed.addEventListener('mouseout', (e) => {
//     if (eng) {
//       tooltipEng.style.display = 'none';
//     } else {
//       tooltipPol.style.display = 'none';
//     }
//   });
  
//   hoverTextsZoomed.addEventListener('mousemove', (e) => {
//     const x = e.clientX;
//     const y = e.clientY;
//     if (eng) {
//       tooltipEng.style.left = x + 10 + 'px';
//       tooltipEng.style.top = y + 10 + 'px';
//     } else {
//       tooltipPol.style.left = x + 10 + 'px';
//       tooltipPol.style.top = y + 10 + 'px';
//     }
//   });
// });
// function adjustDivWidth() {
//   const divs = document.getElementsByClassName('filler');
//   for (const div of divs) {
//     if (window.innerHeight > window.innerWidth) {
//       div.style.width = '10%'; // Portrait mode
//     } else {
//       div.style.width = '100%'; // Landscape mode
//     }
//   }
// }

// adjustDivWidth(); // Initial adjustment
// window.addEventListener('resize', adjustDivWidth); // Adjust on resize
