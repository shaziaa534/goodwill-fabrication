/* ----- BASE ------ */
"use strict";

// get required selectors to maniplute menu toggle
const navbar = document.querySelector(".navbar");
const menuTogglersContainer = document.querySelector(".menu-togglers");
const bxMenu = document.querySelector(".bx-menu");

/* -- show/hide menu -- */
menuTogglersContainer.addEventListener("click", () => {
  // if navbar tag have show-nav in as class
  navbar.classList.toggle("show-nav");
});

/* ================================================ */

/* -------- theme changing -------- */
const themeTogglers = document.querySelector(".theme-togglers");
const lightIcon = document.querySelector(".bxs-sun");
const darkIcon = document.querySelector(".bxs-moon");

var lightmode = localStorage.getItem("lightmode");

// enable dark mode function
const enableLightMode = () => {
  // add class dark mode to the body
  document.body.classList.add("lightmode");
  localStorage.setItem("lightmode", "enabled");
  // change theme toggle styles
  lightIcon.style.display = "none";
  darkIcon.style.display = "block";
};

if (lightmode && lightmode === "enabled") {
  enableLightMode();
}

// disable dark mode function
const disableLightMode = () => {
  // remove class dark mode from the body
  document.body.classList.remove("lightmode");
  localStorage.setItem("lightmode", null);
  // change theme toggle styles
  lightIcon.style.display = "block";
  darkIcon.style.display = "none";
};

// active/deactive dark mode
themeTogglers.addEventListener("click", () => {
  lightmode = localStorage.getItem("lightmode");
  if (!lightmode || lightmode !== "enabled") {
    enableLightMode();
  } else {
    disableLightMode();
  }
});


/* -- hide show hero buttons -- */
// delay before showing them
const heroButtonsContainer = document.querySelector(".hero-btns-container");

var delayTime = 1000;

heroButtonsContainer.style.transition = "opacity 1000ms";

setTimeout(() => {
  heroButtonsContainer.style.opacity = 1;
}, delayTime);





let slideIndex = 0;

function moveSlide(step) {
  let slides = document.querySelectorAll('.slider2 img');
  slideIndex += step;

  if (slideIndex >= slides.length) {
    slideIndex = 0; // Loop back to the first slide
  }

  if (slideIndex < 0) {
    slideIndex = slides.length - 1; // Loop back to the last slide
  }

  const slider2 = document.querySelector('.slider2');
  slider2.style.transform = `translateX(-${slideIndex * 100}%)`;
}











let rating = 0;

document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', () => {
    rating = parseInt(star.getAttribute('data-value'));
    highlightStars(rating);
  });
});

function highlightStars(rating) {
  document.querySelectorAll('.star').forEach(star => {
    if (parseInt(star.getAttribute('data-value')) <= rating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

document.getElementById('submit-review').addEventListener('click', () => {
  const reviewText = document.getElementById('review-text').value;
  if (rating === 0 || reviewText.trim() === '') {
    alert('Please provide a rating and a review.');
    return;
  }

  const reviewData = {
    rating: rating,
    reviewText: reviewText
  };

  // Send review data to the server
  fetch('submit_review.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Review submitted successfully!');
      loadReviews();  // Reload the reviews after submission
    } else {
      alert('Failed to submit review!');
    }
  });
});

// Function to load reviews from the server
function loadReviews() {
  fetch('get_reviews.php')
    .then(response => response.json())
    .then(reviews => {
      const reviewsList = document.getElementById('reviews-list');
      reviewsList.innerHTML = '';
      reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
          <strong>Rating: ${review.rating} stars</strong>
          <p>${review.reviewText}</p>
        `;
        reviewsList.appendChild(reviewElement);
      });
    });
}

// Load reviews on page load
window.onload = loadReviews;





