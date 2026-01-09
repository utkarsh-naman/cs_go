let engineInstance = null;


const GITHUB_USERNAME = "utkarsh-naman";
const REPO_NAME = "unc";
const BRANCH = "main";
const FOLDER = "cdn2"; // Matches your folder name: 'WASM'

// This constructs the CDN URL:
// https://cdn.jsdelivr.net/gh/utkarsh-naman/cs_wasm@main/WASM/
const BASE_URL = `https://cdn.jsdelivr.net/gh/${GITHUB_USERNAME}/${REPO_NAME}@${BRANCH}/${FOLDER}/`;

function loadEngine() {
    const btn = document.getElementById('playBtn');

    // UI Feedback
    btn.disabled = true;

    // 1. Create a script tag to load the Glue Code (chopsticks_bot.js) from CDN
    const script = document.createElement('script');
    script.src = BASE_URL + "chopsticks_bot.js";

    script.onload = () => {
        // 2. Initialize the WASM Module
        createChopsticksModule({
            // CRITICAL: This overrides the default behavior (looking at localhost)
            // and forces it to look at the CDN for .wasm and .data files
            locateFile: (path, prefix) => {
                if (path.endsWith(".data") || path.endsWith(".wasm")) {
                    return BASE_URL + path;
                }
                return prefix + path;
            }
        }).then(module => {
            // 3. Instantiate your C++ Class
            // This triggers the constructor which loads 'map_final' from the virtual FS
            engineInstance = new module.UncEngine();

            console.log("SUCCESS: Engine loaded from GitHub.");
            setTimeout(() => {
                document.getElementById('gamecontentwindow').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }, 1100);
            document.getElementById("seal_cont_id").style.visibility='hidden';
            document.getElementById("seal_cont_id").style.zIndex=0;
            setTimeout(()=>{
                document.getElementById("playground").classList.remove("blurred");
            }, 500);
            btn.disabled=true;

        }).catch(err => {
            console.error("WASM Initialization Error:", err);
            alert("Engine crashed during start up. Check console for details.");
            resetButton(btn);
        });
    };

    script.onerror = () => {
        console.error("Script Load Error: Could not fetch chopsticks_bot.js from " + script.src);
        alert("Could not connect to GitHub/CDN. Please check your internet connection.");
        resetButton(btn);
    };

    document.body.appendChild(script);
}

function resetButton(btn) {
    btn.innerText = "Error";
    btn.disabled = false;
}

function playMove(state) {
    try {
        // Call the C++ function
        const move = engineInstance.play(state);

        // Display Result
        return move;
    } catch (e) {
        console.error("Runtime Error:", e);
        outputText.innerText = "ERR";
        alert("The engine encountered an error processing this move.");
    }
}