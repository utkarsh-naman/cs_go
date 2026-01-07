const ol_square = document.getElementById("bot_l");
const or_square = document.getElementById("bot_r");
const pl_square = document.getElementById("player_l");
const pr_square = document.getElementById("player_r");
const turndiv = document.getElementById("turntext");

const hover_tips_div = document.getElementById('hoverTipsDiv');

const turn_array = ["Turn: BOT", "Turn: YOU"];
const state_divs = [ol_square, or_square, pl_square, pr_square, turndiv];



function ll(state_str){
    if (state_str[4] == '0'){
        let new_state = state_str[0]+state_str[1]+String( ( parseInt(state_str[2])+parseInt(state_str[0]) )%5 )+state_str[3]+String(1);
        return new_state;
    }

    let new_state = String( ( parseInt(state_str[0])+parseInt(state_str[2]) )%5 )+state_str[1]+ state_str[2]+state_str[3]+String(0);
    return new_state;
}

function lr(state_str){
    if (state_str[4] == '0'){
        let new_state = state_str[0]+state_str[1]+state_str[2]+String( ( parseInt(state_str[3])+parseInt(state_str[0]) )%5 )+String(1);
        return new_state;
    }

    let new_state = state_str[0]+String( ( parseInt(state_str[1])+parseInt(state_str[2]) )%5 )+ state_str[2]+state_str[3]+String(0);
    return new_state;
}

function rl(state_str){
    if (state_str[4] == '0'){
        let new_state = state_str[0]+state_str[1]+state_str[2]+String( ( parseInt(state_str[3])+parseInt(state_str[0]) )%5 )+String(1);
        return new_state;
    }

    let new_state = String( ( parseInt(state_str[0])+parseInt(state_str[3]) )%5 )+state_str[1]+ state_str[2]+state_str[3]+String(0);
    return new_state;
}

function lr(state_str){
    if (state_str[4] == '0'){
        let new_state = state_str[0]+state_str[1]+state_str[2]+String( ( parseInt(state_str[3])+parseInt(state_str[1]) )%5 )+String(1);
        return new_state;
    }

    let new_state = state_str[0]+String( ( parseInt(state_str[1])+parseInt(state_str[3]) )%5 )+ state_str[2]+state_str[3]+String(0);
    return new_state;
}



function updateGrayscale(el) {
  if (el.textContent.trim() === "0") {
    el.style.filter = "grayscale(100%)";
  } else {
    el.style.filter = "none";
  }
}

function updategs(){
    ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    // Run once at start
    updateGrayscale(el);

    // Observe changes
    const observer = new MutationObserver(() => updateGrayscale(el));
    observer.observe(el, {
        childList: true,
        characterData: true,
        subtree: true
    });
    });
}


function generate_distribution(state_str){
    if (state_str[4] == 0){
        const sum = parseInt(state_str[0])+parseInt(state_str[1]);
        let initial_soln = [Math.min(parseInt(state_str[0]), parseInt(state_str[1]))];
    }

    else{
        const sum = parseInt(state_str[2])+parseInt(state_str[3]);
        let initial_soln = [Math.min(parseInt(state_str[2]), parseInt(state_str[3]))];
    }

    let unique_dist_soln = [];
    for (i = 0; i <= sum/2; i++){
        const target = [Math.min(i, (sum - i)%5), Math.max(i, (sum - i)%5)];
        const exists = initial_soln.some(
            arr => arr.every((val, i) => val === target[i])
        );
        if (!exists){
            unique_dist_soln.push(target);
        }
    }

    let full_dist_state = []
    for (i = 0; i <= unique_dist_soln.length; i++){
        if (state_str[4] == '0'){
            let s = String(unique_dist_soln[i][0])+String(unique_dist_soln[i][1])+state_str[2]+state_str[3]+String[1];
        }
        else{
            let s = state_str[0]+state_str[1]+String(unique_dist_soln[i][0])+String(unique_dist_soln[i][1])+String[0];
        }

        full_dist_state.push(s);
    }

    return full_dist_state;    
}

function renderOptions_distributionPanel(state_str){
    full_next_dist_state = generate_distribution(state_str);
    if (state_str[4] == '1'){
        for(i = 0; i<= full_next_dist_state.length; i++){
        divAppend = div
        }
    }
}


function bot_plays_move(state_str){
    const move = engineInstance.play(state_str);
    return move;
}

function updateUI(state_str){
    state_divs[0].innerText = state_str[0];
    state_divs[1].innerText = state_str[1];
    state_divs[2].innerText = state_str[2];
    state_divs[3].innerText = state_str[3];
    state_divs[4].innerText = turn_array[parseInt[4]];
}

function gamerun(state_str){
    g_state = {
        state: state_str,
        game_over: false,
    }

    // more code here
}

// if state_str[4] == 0 that means it is bot's turn then disable the pl and pr and ol and or square too so that player can't interfere with any square

// if state_str[4] == 1 that means it is player's turn, then grayscale the divs which has finger count 0 in state_state[i] i from 0 upto 3, since 4 is turn index.
/*
1.  the player can select his hand by clicking on it, and unselect it but clicking again. Highlight the selected div by some border color.
2.  if state_str[4] == 1 that means it is player's turn, disable the ol_square and or_squares initially
    to make sure user first selects his hands before attacking. Also change the hover_tips_div.innerText = "Select your hands first".

3.  once user has selected his hand, change the hover_tips_div.innerText = "Cannot select a hand with 0 !"

4.  write the renderOptions_distributionPanel() function to show distribution option ways the user can distribute his finger counts instead of tapping on bots div, by selecting his own hand and tapping on his own other hand 

5.  the engine.play is wasm bot already loaded before. this will return the bot move, like ll, lr, rl, rr, s0, s1, s2, s3 (s means distribute sum and the number next to it means that left hand will have that number and right hand will have (sum - that number) % 5)
6.  make updateUI calls after each move
*/
