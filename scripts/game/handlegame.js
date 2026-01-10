const ol_square = document.getElementById("botl");
const or_square = document.getElementById("botr");
const pl_square = document.getElementById("pl");
const pr_square = document.getElementById("pr");
const turndiv = document.getElementById("turntext");

const hover_tips_div = document.getElementById('hoverTipsDiv');
const game_over_div = document.getElementById("game_over_id");
const distpaneldiv = document.getElementById("distributionPanel");

const turn_array = ["Turn: YOU", "Turn: BOT"];
const game_over_array = ["You Lost !", "You Win !"];


const dist_panel_div = document.getElementById("distributionPanel");
const state_divs = [pl_square, pr_square, ol_square, or_square, turndiv];

const sq_divs = [pl_square, pr_square, ol_square, or_square];
sq_divs.forEach(square => {
    square.addEventListener("click", () => onSquareClick(square));
});

function onSquareClick(square){
    // console.log(`chance while selecting: ${state_arr[4]}`);
    if (state_arr[4] === '1') return; // bot chance so no need
    if (move_selected.includes(square)){
        move_selected = move_selected.filter(s => s !== square);
        square.classList.remove("selectedcss");
    }
    else{
        move_selected.push(square);
        square.classList.add("selectedcss");
    }
    state_str = "";
    state_str = state_arr[0]+state_arr[1]+state_arr[2]+state_arr[3]+state_arr[4];
    updateUI(state_str);
}

let state_arr = ['', '', '', '', ''];


let move_selected = [];


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
    // console.log(`rl recieved: ${state_str}`);
    if (state_str[4] == '0'){
        let new_state = state_str[0]+state_str[1]+String( ( parseInt(state_str[2])+parseInt(state_str[1]) )%5 )+state_str[3]+String(1);
        return new_state;
    }

    let new_state = String( ( parseInt(state_str[0])+parseInt(state_str[3]) )%5 )+state_str[1]+ state_str[2]+state_str[3]+String(0);
    return new_state;
}

function rr(state_str){
    if (state_str[4] == '0'){
        let new_state = state_str[0]+state_str[1]+state_str[2]+String( ( parseInt(state_str[1])+parseInt(state_str[3]) )%5 )+String(1);
        return new_state;
    }

    let new_state = state_str[0]+String( ( parseInt(state_str[1])+parseInt(state_str[3]) )%5 )+ state_str[2]+state_str[3]+String(0);
    return new_state;
}

// for bot move where bot distributes the sum 
function sx(move, state_str){
    // console.log(`sx got: ${state_str}`);
    let next_state = state_str[0]+state_str[1]+move[1]+ String( ( parseInt(state_str[2])+parseInt(state_str[3]) - parseInt(move[1]) )%5 )+String( (parseInt(state_str[4]))^1 );
    // console.log(`sx returns by bot: ${next_state}`);
    return next_state; 
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
    let sum = 0;
    let initial_soln = [];
    if (state_str[4] == 0){
        sum = parseInt(state_str[0])+parseInt(state_str[1]);
        initial_soln.push( [Math.min(parseInt(state_str[0]), parseInt(state_str[1])), Math.max(parseInt(state_str[0]), parseInt(state_str[1]))] );
    }

    else{
        sum = parseInt(state_str[2])+parseInt(state_str[3]);
        initial_soln.push( [Math.min(parseInt(state_str[2]), parseInt(state_str[3])), Math.max(parseInt(state_str[2]), parseInt(state_str[3]))] );
    }

    let unique_dist_soln = [];
    for (let i = 0; i <= sum/2; i++){
        const target = [Math.min(i, (sum - i)%5), Math.max(i, (sum - i)%5)];
        const exists = initial_soln.some(
            arr => arr.every((val, i) => val === target[i])
        );
        if (!exists){
            unique_dist_soln.push(target);
            initial_soln.push(target);
        }
    }

    let full_dist_state = [];
    let s = 0;
    for (let i = 0; i < unique_dist_soln.length; i++){
        if (state_str[4] == '0'){
            s = String(unique_dist_soln[i][0])+String(unique_dist_soln[i][1])+state_str[2]+state_str[3]+String(1);
            // console.log(`am printing dist for player ${unique_dist_soln[i]}`);
        }
        else{
            s = state_str[0]+state_str[1]+String(unique_dist_soln[i][0])+String(unique_dist_soln[i][1])+String(0);
        }

        full_dist_state.push(s);
    }

    return full_dist_state;    
}

function renderOptions_distributionPanel(state_str){
    full_next_dist_state = generate_distribution(state_str);
    dist_panel_div.innerHTML = "";
    if (state_str[4] == '0'){
        for(let i = 0; i< full_next_dist_state.length; i++){
            const optionBox = document.createElement('div');
            optionBox.className = 'optionbox';

            const option1 = document.createElement('div');
            option1.className = 'option1handdiv';
            option1.textContent = full_next_dist_state[i][0];

            const option2 = document.createElement('div');
            option2.className = 'option2handdiv';
            option2.textContent = full_next_dist_state[i][1];

            optionBox.append(option1, option2);
            // console.log(`we are psuhing into the panel : ${full_next_dist_state[i][2]}, ${full_next_dist_state[i][3]}`);


            optionBox.addEventListener("click", () => {
                // console.log(`try printing the full next div state: ${full_next_dist_state[i]}`);
                
                updateUI(full_next_dist_state[i]);
            });

            dist_panel_div.appendChild(optionBox);
        }
    }

    else{
        dist_panel_div.innerHTML = "";
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function bot_plays_move(state_str){
    move_selected = [];
    sq_divs.forEach(sqs =>{
        sqs.classList.remove("selectedcss");
    });

    const move = engineInstance.play(state_str);
    console.log(`engine move: ${move}`);
    if (move === "ll"){
        next_state_by_bot = ll(state_str);
        setTimeout(()=>{
            ol_square.classList.add("selectedcss");
            setTimeout(()=>{
                pl_square.classList.add("selectedcss");
                setTimeout(()=>{
                    updateUI(next_state_by_bot);
                }, 500);
            }, 400);
        }, 600);
        // console.log(`bot played${next_state_by_bot}`);
        
    }
    else if (move === "lr"){
        next_state_by_bot = lr(state_str);
        setTimeout(()=>{
            ol_square.classList.add("selectedcss");
            setTimeout(()=>{    
                pr_square.classList.add("selectedcss");
                setTimeout(()=>{
                    updateUI(next_state_by_bot);
                }, 500);
            }, 400);
        }, 600);
        
    }
    else if (move === "rl"){
        next_state_by_bot = rl(state_str);
        setTimeout(()=>{            
            or_square.classList.add("selectedcss");
            setTimeout(() => {    
                pl_square.classList.add("selectedcss");
                setTimeout(()=>{
                    updateUI(next_state_by_bot);
                }, 500);
            }, 400);
        }, 600);
    }
    else if (move === "rr"){
        next_state_by_bot = rr(state_str);
        setTimeout(()=>{
            or_square.classList.add("selectedcss");
            setTimeout(()=>{
                pr_square.classList.add("selectedcss");
                setTimeout(()=>{
                    updateUI(next_state_by_bot);
                }, 500);
            }, 400);
        }, 600);
    }

    else if (move[0] == 's'){
        next_state_by_bot = sx(move, state_str);
        
        setTimeout(() => {
            ol_square.classList.add("selectedcss");
            setTimeout(()=>{
                or_square.classList.add("selectedcss");
                setTimeout(()=>{
                    updateUI(next_state_by_bot);
                }, 500);
            }, 400);
        }, 600);
    }

    
}

function updateUI(state_str){
    dist_panel_div.style.visibility = "hidden";
    if (move_selected.length == 0){
        setTimeout(()=>{
            sq_divs.forEach(sqs=>{
                sqs.classList.remove("selectedcss");
            });
        }, 500);
    }


    if (state_str[4] === '0'){
        // console.log(`move by bot: ${state_str}`);
    }

    else{
        // console.log(`move by player: ${state_str}`);
    }

    if (state_str[2] == 0 && state_str[3] == 0){
        hover_tips_div.innerText = "Restart the game !";
        games_over_bruh(1);
    }
    else if(state_str[0] == 0 && state_str[1] == 0){
        hover_tips_div.innerText = "Restart the game !";
        games_over_bruh(0);
    }

    
    state_divs[0].innerText = state_str[0];
    state_divs[1].innerText = state_str[1];
    state_divs[2].innerText = state_str[2];
    state_divs[3].innerText = state_str[3];
    state_divs[4].innerText = turn_array[parseInt(state_str[4])];
    renderOptions_distributionPanel(state_str);
    state_arr[0] = state_str[0];
    state_arr[1] = state_str[1];
    state_arr[2] = state_str[2];
    state_arr[3] = state_str[3];
    state_arr[4] = state_str[4];

    sq_divs.forEach(sq=>{
        if (sq.innerText === '0'){
            sq.classList.add("zerohandcss");
            sq.disabled = true;
            if (move_selected.length == 1){
                pl_square.disabled = false;
                pr_square.disabled = false;
                pl_square.style.pointerEvents = "all";
                pr_square.style.pointerEvents = "all";
                // console.log(`enabled inside conflict the buttons for distribution`);
            }
        }
        else{
            sq.classList.remove("zerohandcss");
            sq.disabled = false;
        }
    });

    if (state_arr[4] == '0' && move_selected.length == 0){
        ol_square.disabled = true;
        or_square.disabled = true;

        if (pl_square.innerText !== '0')
            pl_square.disabled = false;
        else
            pl_square.disabled = true;

        if (pr_square.innerText !== '0')
            pr_square.disabled = false;
        else
            pr_square.disabled = true;
    }

    else if (state_arr[4] == '0' && move_selected.length == 1){
        if (ol_square.innerText !== '0')
            ol_square.disabled = false;
        else
            ol_square.disabled = true;
        
        if (or_square.innerText !== '0')
            or_square.disabled = false;
        else
            or_square.disabled = true;

        pl_square.disabled = false;
        pr_square.disabled = false;
        pl_square.style.pointerEvents = "all";
        pr_square.style.pointerEvents = "all";
        // console.log(`enabled the buttons for distribution`);
    }
    
    else if (state_arr[4] === '0' && move_selected.length == 2){
        if(move_selected[0] === pl_square && move_selected[1] === ol_square){
            // console.log(`player chose ll: ${move_selected[0].id}, ${move_selected[1].id}`);
            updateUI(ll(state_str));
        }
        
        else if (move_selected[0] === pl_square && move_selected[1] === or_square){
            // console.log(`player chose lr: ${move_selected[0].id}, ${move_selected[1].id}`);
            updateUI(lr(state_str));
        }

        else if (move_selected[0] === pr_square && move_selected[1] === ol_square){
            // console.log(`player chose rl: ${move_selected[0].id}, ${move_selected[1].id}`);
            updateUI(rl(state_str));
        }

        else if (move_selected[0] === pr_square && move_selected[1] === or_square){
            // console.log(`player chose rr: ${move_selected[0].id}, ${move_selected[1].id}`);
            updateUI(rr(state_str));
        }

        else{
            distpaneldiv.style.visibility = 'visible';
        }
    }

    else{ //bot's chance
        ol_square.disabled = true;
        or_square.disabled = true;
        pl_square.disabled = true;
        pr_square.disabled = true;
        hover_tips_div.innerText="Not Your Turn !";
        bot_plays_move(state_str);
    }
}


function games_over_bruh(index){
    go_p = document.getElementById("game_over_text");
    go_p.innerText = game_over_array[index];
    go_p.style.zIndex = 2;
    game_over_div.style.zIndex="1";
    if(index == 0)
        game_over_div.style.backgroundColor="rgba(255, 18, 18, 0.566)";
    else
        game_over_div.style.backgroundColor="rgba(18, 255, 34, 0.57)";
    game_over_div.style.visibility="visible";
    game_over_div.style.pointerEvents = "none";
    hover_tips_div.innerText = "Restart Game !";
}


function gamerun(state_str){
    
    move_selected = [];
    updateUI(state_str);
     // player's turn

            

            // while(move_selected.length == 0){
            //     ol_square.disabled = true;
            //     or_square.disabled = true;
            //     if (ol_square.innerText == '0'){
            //         ol_square.classList.add("zerohandcss");
            //     }

            //     if (or_square.innerText == '0'){
            //         or_square.classList.add("zerohandcss");
            //     }
            // }

            // while(move_selected.length == 1){
            //     if (ol_square.innerText != '0'){
            //         ol_square.disabled=false;
            //         ol_square.classList.remove("zerohandcss");
            //     }

            //     if (or_square.innerText != '0'){
            //         or_square.disabled=false;
            //         or_square.classList.remove("zerohandcss");
            //     }
            // }

            // if(move_selected.length == 1){
            //     if(move_selected[0] == pl_square && move_selected[1] == pr_square){
            //         renderOptions_distributionPanel(state_str);
            //     }
            //     else if (move_selected[0] == pl_square && move_selected[1] == ol_square){
            //         updateUI(ll(state_str));
            //     }
            //     else if (move_selected[0] == pl_square && move_selected[1] == or_square){
            //         updateUI(lr(state_str));
            //     }
            //     else if (move_selected[0] == pr_square && move_selected[1] == ol_square){
            //         updateUI(rl(state_str));
            //     }
            //     else if (move_selected[0] == pr_square && move_selected[1] == or_square){
            //         updateUI(rr(state_str));
            //     }
            // }
        
    
    // if
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

5.  the engineInstance.play() is wasm bot already loaded before. this will return the bot move, like ll, lr, rl, rr, s0, s1, s2, s3 (s means distribute sum and the number next to it means that left hand will have that number and right hand will have (sum - that number) % 5)
6.  make updateUI calls after each move
*/
