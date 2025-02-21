document.addEventListener('DOMContentLoaded', function() {
    // Reproducir audio al cargar
    const glitchAudio = document.getElementById('glitchAudio');
    glitchAudio.volume = 0.5; // Volumen al 50%
    
    // Intentar reproducir el audio
    const playAudio = () => {
        glitchAudio.play().catch(error => {
            console.log("Reproducción automática bloqueada por el navegador");
        });
    };

    // Reproducir cuando el usuario interactúe con la página
    document.body.addEventListener('click', playAudio, { once: true });

    const staticEffect = document.getElementById('staticEffect');
    
    function createStaticNoise() {
        let noise = '';
        for (let i = 0; i < 500; i++) {
            noise += Math.random() > 0.5 ? '1' : '0';
        }
        
        staticEffect.innerHTML = noise;
    }

    setInterval(createStaticNoise, 50);

    // Efecto de distorsión al hacer hover sobre los enlaces
    document.querySelectorAll('.neon-button').forEach(button => {
        button.addEventListener('mouseover', function() {
            document.body.style.animation = 'glitch 0.3s infinite';
        });
        
        button.addEventListener('mouseout', function() {
            document.body.style.animation = 'none';
        });
    });

    const lyrics = [
        "I gave up on my thrill",
        "Tears silently run down my face",
        "You know how I feel?",
        "I'm all broken down",
        "Feeling slow and weak",
        "I gave up on my life!",
        "Don't want any second chance!",
        "Just like my broken dreams emotions!",
        "I fight within me!",
        "I can feel my bones are crushing over me!",
        "The spotlight is not for me!",
        "You won't take away my streak!",
        "I won't take such an answer as no!",
        "I will always keep trying until I die!",
        "I'm all broken down feeling slow and weak",
        "Just like my broken dreams emotions"
    ];

    const lyricsContainer = document.querySelector('.lyrics-container');
    const usedPositions = new Set();

    function getRandomPosition() {
        const sections = 5; // Dividimos la pantalla en 5x5 secciones
        let x, y;
        let position;
        
        do {
            x = Math.floor(Math.random() * sections);
            y = Math.floor(Math.random() * sections);
            position = `${x},${y}`;
        } while (usedPositions.has(position));
        
        usedPositions.add(position);
        setTimeout(() => usedPositions.delete(position), 3000);
        
        return {
            left: (x * (100/sections)) + Math.random() * (100/sections) + '%',
            top: (y * (100/sections)) + Math.random() * (100/sections) + '%'
        };
    }

    function createLyricFragment() {
        if (!lyricsContainer) return;
        if (usedPositions.size >= 25) return; // Máximo número de secciones

        const lyric = lyrics[Math.floor(Math.random() * lyrics.length)];
        const fragment = document.createElement('div');
        fragment.className = 'lyric-fragment';
        fragment.textContent = lyric;

        const position = getRandomPosition();
        fragment.style.left = position.left;
        fragment.style.top = position.top;
        
        const size = Math.random() * (24 - 16) + 16;
        fragment.style.fontSize = size + 'px';

        lyricsContainer.appendChild(fragment);

        setTimeout(() => {
            fragment.remove();
        }, 3000);
    }

    // Crear fragmentos de letras más frecuentemente
    setInterval(createLyricFragment, 800);

    // Terminal functionality
    const terminalOverlay = document.getElementById('terminalOverlay');
    const openTerminalBtn = document.getElementById('openTerminal');
    const closeTerminalBtn = document.getElementById('closeTerminal');
    const terminalInput = document.getElementById('terminalInput');
    const terminalContent = document.getElementById('terminalContent');
    const terminalOutput = terminalContent.querySelector('.terminal-output');

    const commands = {
        help: () => {
            const commandList = [
                { cmd: 'help', desc: 'Show all commands' },
                { cmd: 'play', desc: 'Play the song on different platforms' },
                { cmd: 'lyrics', desc: 'Display full lyrics' },
                { cmd: 'about', desc: 'Band information' },
                { cmd: 'clear', desc: 'Clear terminal' },
                { cmd: 'glitch', desc: 'Trigger glitch effect' },
                { cmd: 'hack', desc: 'The system has failed...' },
                { cmd: 'theme <type>', desc: 'Change theme (matrix/horror/cyber/default)' },
                { cmd: 'rain', desc: 'Activate matrix rain effect' },
                { cmd: 'decrypt', desc: 'Play decryption game' },
                { cmd: 'ascii', desc: 'Show ASCII art' },
                { cmd: 'visualizer', desc: 'Show audio visualizer' },
                { cmd: 'sys_info', desc: 'Display system information' },
                { cmd: 'binary <text>', desc: 'Convert text to binary' },
                { cmd: 'story', desc: 'Show random story fragment' },
                { cmd: '???', desc: 'Hidden command' }
            ];

            let output = 'Available commands:\n';
            commandList.forEach(({cmd, desc}) => {
                output += `<span class="help-command">> ${cmd}</span> - <span class="help-desc">${desc}</span>\n`;
            });
            
            printHTML(output);
            return '';
        },
        play: () => {
            const platforms = [
                {
                    name: 'Spotify',
                    icon: 'fab fa-spotify',
                    url: 'https://open.spotify.com/intl-es/track/51ZPfqQztg43dVugphVS2X'
                },
                {
                    name: 'YouTube',
                    icon: 'fab fa-youtube',
                    url: 'https://www.youtube.com/watch?v=GdswkzAHXE4'
                },
                {
                    name: 'Apple Music',
                    icon: 'fab fa-apple',
                    url: 'https://music.apple.com/mx/album/emo-tions/1791338290?i=1791338291'
                },
                {
                    name: 'Deezer',
                    icon: 'fab fa-deezer',
                    url: 'https://www.deezer.com/es/track/3189012361'
                }
            ];

            let menuHTML = '<div class="platform-menu">';
            platforms.forEach(platform => {
                menuHTML += `<a href="${platform.url}" target="_blank" rel="noopener noreferrer">
                    <i class="${platform.icon}"></i> Listen on ${platform.name}
                </a>`;
            });
            menuHTML += '</div>';

            printOutput('Select a platform to play EMO-TIONS:');
            printHTML(menuHTML);
            return '';
        },
        lyrics: () => {
            return lyrics.join('\n');
        },
        about: () => {
            return `Trixie&Molly
            Single: EMO-TIONS
            Released: 2025
            Label: Purple State Records
            Genre: Electronic/Alternative`;
        },
        clear: () => {
            terminalOutput.innerHTML = '';
            return '';
        },
        glitch: () => {
            document.body.style.animation = 'glitch 0.3s infinite';
            setTimeout(() => {
                document.body.style.animation = 'none';
            }, 2000);
            return 'Initiating glitch sequence...';
        },
        hack: async () => {
            const steps = [
                'Accessing mainframe...',
                'Bypassing security...',
                'Downloading emotions...',
                'Converting to binary...',
                'SYSTEM COMPROMISED'
            ];
            
            for (let step of steps) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                printOutput(step);
            }
            return '';
        }
    };

    // Mover los additionalCommands antes de la definición de commands
    const additionalCommands = {
        theme: (args) => {
            const themes = {
                matrix: 'theme-matrix',
                horror: 'theme-horror',
                cyber: 'theme-cyber',
                default: ''
            };
            if (!args || !themes[args]) {
                return 'Available themes: matrix, horror, cyber, default';
            }
            document.body.className = themes[args];
            return `Theme changed to ${args}`;
        },
        rain: () => {
            const rain = document.createElement('canvas');
            rain.className = 'matrix-rain';
            document.body.appendChild(rain);
            initMatrixRain(rain);
            setTimeout(() => rain.remove(), 30000);
            return 'Matrix rain activated (30 seconds)';
        },
        decrypt: () => {
            const message = 'SYSTEM ENCRYPTED - ATTEMPT OVERRIDE';
            let encrypted = message.split('').map(char => 
                char === ' ' ? ' ' : String.fromCharCode(Math.random() * 26 + 65)
            ).join('');
            
            let gameHTML = `<div class="decrypt-game">
                <p>Decrypt the message:</p>
                <p class="encrypted-text">${encrypted}</p>
                <p>Attempts remaining: <span class="attempts">5</span></p>
            </div>`;
            
            printHTML(gameHTML);
            initDecryptGame(message);
            return '';
        },
        ascii: () => {
            return `
        ▄▄▄█████▓ ██▀███   ██▓▒██   ██▒ ██▓▓█████ 
        ▓  ██▒ ▓▒▓██ ▒ ██▒▓██▒▒▒ █ █ ▒░▓██▒▓█   ▀ 
        ▒ ▓██░ ▒░▓██ ░▄█ ▒▒██▒░░  █   ░▒██▒▒███   
        ░ ▓██▓ ░ ▒██▀▀█▄  ░██░ ░ █ █ ▒ ░██░▒▓█  ▄ 
          ▒██▒ ░ ░██▓ ▒██▒░██░▒██▒ ▒██▒░██░░▒████▒
          ▒ ░░   ░ ▒▓ ░▒▓░░▓  ▒▒ ░ ░▓ ░░▓  ░░ ▒░ ░
            ░      ░▒ ░ ▒░ ▒ ░░░   ░▒ ░ ▒ ░ ░ ░  ░
          ░        ░░   ░  ▒ ░ ░    ░   ▒ ░   ░   
                    ░      ░   ░    ░   ░     ░  ░`;
        },
        visualizer: () => {
            const vis = document.createElement('div');
            vis.className = 'visualizer';
            terminalOutput.appendChild(vis);
            initVisualizer(vis);
            return 'Audio visualizer activated';
        },
        sys_info: () => {
            return `
    SYSTEM INFORMATION
    -----------------
    OS: EMO-TIONS OS v2.5
    CPU: Quantum Emotional Processor
    RAM: 128TB Emotional Memory
    STORAGE: Infinite Void Drive
    STATUS: UNSTABLE
    CORRUPTION: 23.7%
    EMOTIONS: DETECTED
    `;
        },
        binary: (text) => {
            if (!text) return 'Usage: binary <text>';
            return text.split('').map(char => 
                char.charCodeAt(0).toString(2).padStart(8, '0')
            ).join(' ');
        },
        story: () => {
            const stories = [
                "Oh god, please help me...",
                "One more time, I'm sorry...",
                "Feels machine?...",
                "Between human and machine...",
                "I'm not a machine, I'm a human...",
                "The battle of deep emotions between being human or machine...",
                `I'm not a machine, I'm a human...
                I'm not a machine, I'm a human...
                I'm not a machine, I'm a human...
                I'm not a machine, I'm a human...
                I'm not a machine, I'm a human...
                I'm not a machine, I'm a human...
                I'm not a machine, I'm a human...
                I'm not a machine, I'm a human...
                I'm not a machine, I'm a human...
                I'm not a machine, I'm a human...`,
                
            ];
            return stories[Math.floor(Math.random() * stories.length)];
        },
        konami: () => {
            if (!window.konamiActivated) {
                window.konamiActivated = true;
                document.body.style.animation = 'glitch 0.1s infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                    window.konamiActivated = false;
                }, 5000);
                return 'KONAMI CODE ACCEPTED - CHAOS MODE ACTIVATED';
            }
            return 'Konami code already activated';
        }
    };

    // Fusionar los comandos
    Object.assign(commands, additionalCommands);

    function printOutput(text) {
        const p = document.createElement('p');
        p.textContent = text;
        terminalOutput.appendChild(p);
        
        // Asegurar que el scroll siempre vaya al final
        setTimeout(() => {
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }, 0);
    }

    // Agregar función para imprimir HTML
    function printHTML(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        terminalOutput.appendChild(div);
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }

    // Inicializar la terminal con un mensaje de bienvenida
    openTerminalBtn.addEventListener('click', () => {
        terminalOverlay.style.display = 'flex';
        terminalInput.focus();
        
        if (!terminalOutput.querySelector('.welcome-message')) {
            printOutput('=== EMO-TIONS Terminal v1.0 ===');
            printOutput('Type "help" for available commands');
            printOutput('================================');
        }
    });

    // Mantener el foco en el input
    terminalContent.addEventListener('click', () => {
        terminalInput.focus();
    });

    closeTerminalBtn.addEventListener('click', () => {
        terminalOverlay.style.display = 'none';
    });

    terminalInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const fullCommand = terminalInput.value.toLowerCase().trim();
            const [command, ...args] = fullCommand.split(' ');
            terminalInput.value = '';

            printOutput(`> ${fullCommand}`);

            if (commands[command]) {
                const output = await commands[command](args.join(' '));
                if (output) printOutput(output);
            } else {
                printOutput('Command not recognized. Type "help" for available commands.');
            }
        }
    });

    // Cerrar terminal con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && terminalOverlay.style.display === 'flex') {
            terminalOverlay.style.display = 'none';
        }
    });

    // Función para la lluvia Matrix
    function initMatrixRain(canvas) {
        canvas.style.display = 'block'; // Hacer visible el canvas
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = "01";
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(draw, 33);
    }

    // Función para el juego de descifrado
    function initDecryptGame(originalMessage) {
        let attempts = 5;
        const attemptsSpan = document.querySelector('.attempts');
        const encryptedText = document.querySelector('.encrypted-text');
        
        function updateGame() {
            if (attempts <= 0) {
                printOutput('DECRYPTION FAILED - SYSTEM LOCKED');
                return;
            }
            
            let currentText = encryptedText.textContent;
            let newText = '';
            
            for (let i = 0; i < currentText.length; i++) {
                if (Math.random() < 0.3) {
                    newText += originalMessage[i];
                } else {
                    newText += currentText[i];
                }
            }
            
            encryptedText.textContent = newText;
            attempts--;
            attemptsSpan.textContent = attempts;
            
            if (newText === originalMessage) {
                printOutput('DECRYPTION SUCCESSFUL');
                return;
            }
            
            if (attempts > 0) {
                setTimeout(updateGame, 1000);
            }
        }
        
        setTimeout(updateGame, 1000);
    }

    // Función para el visualizador de audio
    function initVisualizer(container) {
        container.style.display = 'block'; // Hacer visible el contenedor
        let bars = 30;
        for (let i = 0; i < bars; i++) {
            const bar = document.createElement('div');
            bar.style.cssText = `
                position: absolute;
                bottom: 0;
                left: ${(i / bars) * 100}%;
                width: ${100 / bars}%;
                background: var(--neon-color);
                transition: height 0.1s ease;
            `;
            container.appendChild(bar);
            
            setInterval(() => {
                const height = Math.random() * 100;
                bar.style.height = height + '%';
            }, 100);
        }
    }

    // Detector del código Konami
    let konamiCode = [];
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        const code = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";
        if (konamiCode.join('') === code) {
            commands.konami();
        }
    });
}); 