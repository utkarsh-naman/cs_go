const btn = document.getElementById('playBtn');
        const verticalCount = 20;
        const horizontalCount = 10;

        function createGrid() {
            // 1. Generate Vertical Lines
            for (let i = 0; i < verticalCount; i++) {
                const line = document.createElement('div');
                line.classList.add('grid-line', 'grid-line-v');
                line.style.left = `${(i + 1) * (100 / (verticalCount + 1))}%`;
                line.style.setProperty('--delay', `${i * 0.03}s`);
                btn.appendChild(line);
            }

            // 2. Generate Horizontal Lines
            for (let j = 0; j < horizontalCount; j++) {
                const line = document.createElement('div');
                line.classList.add('grid-line', 'grid-line-h');
                line.style.top = `${(j + 1) * (100 / (horizontalCount + 1))}%`;
                line.style.setProperty('--delay', `${j * 0.05}s`);
                btn.appendChild(line);
            }
        }

        createGrid();

        // Replace your existing click listener with this:
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');

            // 1. Calculate Total Time: Max Delay (0.6s) + Animation Duration (0.5s) = 1.1s
            // 2. Wait 1100ms, then scroll
            // setTimeout(() => {
            //     document.getElementById('playground').scrollIntoView({ 
            //         behavior: 'smooth' 
            //     });
            // }, 1100);
        });

        btn.addEventListener('click', ()=>{
            loadEngine();
        });