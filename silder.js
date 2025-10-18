// ===== TRUST SECTION SLIDER =====

// Wait until the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".trust-track");
  if (!track) return;

  // Duplicate cards to create a seamless loop
  const cards = track.innerHTML;
  track.innerHTML += cards;

  // Animation settings
  let scrollSpeed = 0.5; // Adjust for faster/slower speed
  let position = 0;
  let isPaused = false;

  // Scroll animation
  function animateSlider() {
    if (!isPaused) {
      position -= scrollSpeed;
      if (Math.abs(position) >= track.scrollWidth / 2) {
        position = 0; // reset to start seamlessly
      }
      track.style.transform = `translateX(${position}px)`;
    }
    requestAnimationFrame(animateSlider);
  }

  // Optional: Pause on hover
  const slider = document.querySelector(".trust-slider");
  if (slider) {
    slider.addEventListener("mouseenter", () => (isPaused = true));
    slider.addEventListener("mouseleave", () => (isPaused = false));
  }

  // Start animation
  animateSlider();
});
