const select_tips_div = document.getElementById('hoverTipsDiv');
const blurred_div = document.getElementById('playground');
const turntextdiv = document.getElementById('turntext');
const lgr = document.getElementById('leftgameregion');
select_tips_div.classList.add("hiddensyf");

let tipX = 0;
let tipY = 0;

// 1. SELECTORS UPDATED to match your index.html IDs
const ol_sq = document.getElementById('botl');
const or_sq = document.getElementById('botr');
const pl_sq = document.getElementById('pl'); // Fixed: HTML id is 'pl', not 'playerl'
const pr_sq = document.getElementById('pr'); // Fixed: HTML id is 'pr', not 'playerr'

// Group them for easy checking
const gameButtons = [ol_sq, or_sq, pl_sq, pr_sq];



// 2. SINGLE MOUSE MOVEMENT HANDLER
window.addEventListener("mousemove", function(e) {
  tipX = e.clientX;
  tipY = e.clientY;

  let isHoveringDisabledBtn = false;

  // Check if mouse is physically inside any disabled button
  gameButtons.forEach(btn => {
    if (btn && btn.disabled) {
      // Get the position/size of the button
      // console.log(turntextdiv.innerText);
      if (turntextdiv.innerText == "Turn: ?"){
        select_tips_div.innerText = "Start game first !";
      }

      const rect = btn.getBoundingClientRect();

      // Check if mouse coordinates are within the button's box
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        isHoveringDisabledBtn = true;
      }
    }
  });

  // 3. TOGGLE VISIBILITY
  // If we are over a disabled button, show the tip. Otherwise, hide it.
  if (isHoveringDisabledBtn && !blurred_div.classList.contains('blurred')) {
    select_tips_div.classList.remove("hiddensyf");
  } else {
    select_tips_div.classList.add("hiddensyf");
  }
});

function animateTip() {
  // Added offset to prevent cursor from covering the text
  select_tips_div.style.left = (tipX + 75) + "px"; 
  select_tips_div.style.top = (tipY - 20) + "px";
  
  requestAnimationFrame(animateTip);
}

animateTip();




