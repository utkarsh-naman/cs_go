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
    if (btn) {
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
        if (state_arr[4] === '0'){
          if(move_selected.length == 0){
            if (btn === ol_sq || btn === or_sq){
              select_tips_div.innerText = "Select Yours First !";
            }
            else if ((btn === pl_sq || btn === pr_sq) && btn.innerText === '0'){
              // btn.disabled = true;
              select_tips_div.innerText = "Cannot attack with 0 fingers !";}

            else if (btn === pl_sq && pl_sq.innerText !== '0'){
              select_tips_div.innerText = "Tap to select left hand !";}

            else if (btn === pr_sq && pr_sq.innerText !== '0'){
              select_tips_div.innerText = "Tap to select right hand !";}
          }

          else if(move_selected.length == 1){
            if (move_selected.includes(btn)){
              select_tips_div.innerText = "Tap to unselect hand !";
            }

            else if((btn === ol_sq || btn === or_sq) && btn.innerText === '0'){
              select_tips_div.innerText = "Cannot attack on 0 fingers !";
            }

            else if ( (btn === pl_sq || btn === pr_sq) && !move_selected.includes(btn) ){
              // if (btn.innerText === '0'){
              //   btn.disabled = false;
              //   console.log(`enabled: ${btn.id}`);
              // }
              select_tips_div.innerText = "Tap to distribute fingers !";
            }

            else {
              // console.log("trying to print 'tap to attack' ");
              select_tips_div.innerText = "Tap to attack !";
            }
          }
        } 
        // console.log(`trying to print the sq name ${btn.id}`);
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




