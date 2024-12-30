$(document).ready(function () {
  let isDropdownVisible = false;
  let eng = true;

  // Initialize dropdown menu and services
  const dropdownContent = document.querySelector(".dropdown-content");
  const services = document.querySelector("#projects");
  dropdownContent.classList.add("hidden");
  $(".dropdown-content").css("display", "block");

  // Update services labels based on language
  function updateLabels() {
    document.getElementById("apps").innerHTML = eng
      ? "<i class='icon-laptop'></i> Applications"
      : "<i class='icon-laptop'></i> Aplikacje";
    document.getElementById("mech").innerHTML = eng
      ? "<i class='icon-wrench'></i> Mechanics"
      : "<i class='icon-wrench'></i> Mechanika";
    document.getElementById("games").innerHTML = eng
      ? "<i class='icon-gamepad'></i> Games"
      : "<i class='icon-gamepad'></i> Gry";
  }
  updateLabels();

  // Toggle dropdown menu visibility
  services.addEventListener("touchstart", function (event) {
    event.stopPropagation();
    if (isDropdownVisible) {
      dropdownContent.classList.add("hidden");
      $(".dropdown-content").css("max-height", "0px");
      if (window.location.href === "https://artur-bednarski.onrender.com/") {
        services.style.backgroundColor = "rgb(128, 128, 128)"; // Replace "desiredColor" with the color you want
    }
    } else {
      dropdownContent.classList.remove("hidden");
      $(".dropdown-content").css("max-height", "300px").css("transition", "max-height 0.7s ease");
      services.style.backgroundColor = "#555";
    }
    isDropdownVisible = !isDropdownVisible;
  });

  // Close dropdown when clicking outside
  window.addEventListener("touchstart", function () {
    if (isDropdownVisible) {
      dropdownContent.classList.add("hidden");
      $(".dropdown-content").css("max-height", "0px");
      services.style.backgroundColor = window.location.href.includes("onrender")
        ? "rgb(128, 128, 128)"
        : "white";
      isDropdownVisible = false;
    }
  });

  // Hover effect for dropdown items
  $('#projects').hover(
    function () {
      $('.submenu1').css('background-color', '#555');
    },
    function () {
      $('.submenu1').css('background-color', '');
    }
  );

  // Toggle elements for language change
  function toggleElements() {
    eng = !eng;
    $('.down').toggleClass('Eng Pol');
    $('.toggle-element').toggleClass('visible');
    updateLabels();
  }

  // Image viewer functionality
  const images = document.querySelectorAll(".image");
  const viewer = document.getElementById("image-viewer");
  const displayedImage = document.getElementById("displayed-image");
  const displayedImageNumber = document.getElementById("displayed-image-number");

  images.forEach(image => {
    image.addEventListener("click", function () {
      const src = this.querySelector("img").getAttribute("src");
      displayedImage.src = src;
      displayedImageNumber.innerText = this.dataset.number || "N/A";

      images.forEach(img => img.classList.remove("selected"));
      this.classList.add("selected");
    });
  });

  // Helper functions
  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  // Hover effects for non-touch devices
  if (!isTouchDevice()) {
    document.querySelectorAll('.service').forEach(element => {
      element.addEventListener('mouseover', () => {
        $('#projects').css('background-color', '#555');
        $('.submenu1').css('background-color', '#555');
      });
      element.addEventListener('mouseout', () => {
        $('#projects').css('background-color', '');
        $('.submenu1').css('background-color', '');
      });
    });
  }
});
