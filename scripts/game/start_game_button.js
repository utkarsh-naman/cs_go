const startBtn = document.getElementById('startGameBtn');
const scoreboard = document.getElementsByClassName('scorebox');
const items2 = document.querySelectorAll('.dropdown-item');
startBtn.addEventListener('click', () => {
    // console.log("Game Started!");
    startBtn.innerText = "Restart";
    for (let i = 0; i < scoreboard.length; i++) {
        scoreboard[i].innerText = '1';
    }

    const selectedText2 = document.getElementById('selectedText');
    const value2 = selectedText2.innerText;
    if (value2 == 'BOT'){
        gamerun("11110");
    }
    else{
        gamerun("11111");
    }
});