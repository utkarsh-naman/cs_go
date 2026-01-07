const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

circles.forEach(function (circle) {
  circle.x = 0;
  circle.y = 0;
  // Remove manual color assignment to let CSS handle it
});

window.addEventListener("mousemove", function(e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
  circles.forEach(circle => circle.classList.remove("hidden"));
});

// Hide when leaving screen
window.addEventListener("mouseout", function(e) {
  if (!e.relatedTarget || e.relatedTarget.nodeName === "HTML") {
    circles.forEach(circle => circle.classList.add("hidden"));
  }
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    // Center the circle on the cursor
    circle.style.left = x - 35.75 + "px";
    circle.style.top = y - 35.75 + "px";
    
    // Scale effect
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();