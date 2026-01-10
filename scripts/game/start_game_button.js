const startBtn = document.getElementById('startGameBtn');
const scoreboard = document.getElementsByClassName('scorebox');
const items2 = document.querySelectorAll('.dropdown-item');
startBtn.addEventListener('click', () => {
    startBtn.innerText = "Restart";
    

    const selectedText2 = document.getElementById('selectedText');
    const value2 = selectedText2.innerText;
    if (value2 == 'BOT'){
        document.getElementById("game_over_id").style.zIndex=-1;
        document.getElementById("game_over_text").style.zIndex=-1;
        gamerun("11111");
    }
    else{
        document.getElementById("game_over_id").style.zIndex=-1;
        document.getElementById("game_over_text").style.zIndex=-1;
        gamerun("11110");
    }
});