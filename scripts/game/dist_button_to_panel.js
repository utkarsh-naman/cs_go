const distBtn = document.getElementById("distributionButton");

distBtn.addEventListener("mouseenter", ()=> {morph_to_panel()});

function morph_to_panel() {
    const distpanel = document.getElementById("distributionPanel");
    distpanel.style.visibility = "visible";
}

const distpanel = document.getElementById("distributionPanel");

distpanel.addEventListener("mouseleave", ()=>{morph_to_button()});

function morph_to_button(){
    const distpanel = document.getElementById("distributionPanel");
    distpanel.style.visibility = "hidden";
}

