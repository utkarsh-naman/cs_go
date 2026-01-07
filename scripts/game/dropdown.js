
const container = document.getElementById('playerSelect');
const drp_btn = document.getElementById('dropdownBtn');
const selectedText = document.getElementById('selectedText');
const items = document.querySelectorAll('.dropdown-item');
const game_start_karne_wala_btn = document.getElementById("startGameBtn");

// 1. Toggle Dropdown
drp_btn.addEventListener('click', (e) => {
    game_start_karne_wala_btn.style.visibility="hidden";
    e.stopPropagation(); // Prevent immediate closing
    container.classList.toggle('open');
});

// 2. Handle Selection
items.forEach(item => {
    item.addEventListener('click', () => {
        
        // Remove 'selected' class from all items
        items.forEach(i => i.classList.remove('selected'));
        // Add to clicked item
        item.classList.add('selected');

        // Update Button Text
        const value = item.getAttribute('data-value');
        // Get the text node (ignoring the icon)
        const text = item.childNodes[2].textContent.trim(); 
        selectedText.textContent = text;

        // Close dropdown
        container.classList.remove('open');
        // console.log(`User selected: ${value}`);
        game_start_karne_wala_btn.style.visibility="visible";
        // const turn_text = document.getElementById("turntext");
        // turn_text.textContent = `Turn: ${value[0].toUpperCase() + value.slice(1)}`;
        
        // Add your logic here (e.g., setGameMode(value))
    });
});

// 3. Close when clicking outside
document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
        container.classList.remove('open');
    }
});
