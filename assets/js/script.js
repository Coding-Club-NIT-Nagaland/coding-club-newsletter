document.addEventListener('DOMContentLoaded', () => {

    // 🌠 COSMIC BACKGROUND & STARS
    function spawnStars(count) {
        const layer = document.getElementById('cosmic-layer');
        layer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'parallax-star';
            star.textContent = '✦';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            layer.appendChild(star);
        }
    }

    // 🌌 TOGGLE UNIVERSE MODE
    const toggleUniverse = document.getElementById('toggle-universe');
    if (toggleUniverse) {
        toggleUniverse.addEventListener('click', () => {
            document.body.classList.toggle('cosmic-mode');
            if (document.body.classList.contains('cosmic-mode')) {
                spawnStars(50);
            } else {
                document.getElementById('cosmic-layer').innerHTML = '';
            }
        });
    }

    // 🌓 TOGGLE THEME
    const toggleTheme = document.getElementById('toggle-theme');
    if (toggleTheme) {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'light') {
            toggleTheme.textContent = '🌘';
        }

        toggleTheme.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            toggleTheme.textContent = next === 'light' ? '🌘' : '🌓';
        });
    }

    // 🔊 TOGGLE MUSIC
    const toggleMusic = document.getElementById('toggle-music');
    const music = document.getElementById('cosmic-music');
    if (toggleMusic && music) {
        toggleMusic.addEventListener('click', () => {
            if (music.paused) {
                music.play().catch(e => console.log("Audio play failed:", e));
                toggleMusic.textContent = '🔇';
            } else {
                music.pause();
                toggleMusic.textContent = '🔊';
            }
        });
    }

    // 👥 FAKE LIVE CODER COUNTER
    const coderCount = document.getElementById('coder-count');
    if (coderCount) {
        let count = 243;
        setInterval(() => {
            count += Math.floor(Math.random() * 3) - 1;
            count = Math.max(1, count);
            coderCount.textContent = count;
        }, 3000);
    }

    // 🎊 CONFETTI
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    // Simple confetti (since external lib not loaded)
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    for (let i = 0; i < 100; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            size: Math.random() * 5 + 3,
            color: ['#ff6b6b', '#4ecdc4', '#ffd166', '#9d4edd'][Math.floor(Math.random() * 4)],
            speed: Math.random() * 3 + 1,
            drift: Math.random() * 2 - 1
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(c => {
            ctx.fillStyle = c.color;
            ctx.fillRect(c.x, c.y, c.size, c.size);
            c.y += c.speed;
            c.x += c.drift;
            if (c.y > canvas.height) c.y = -10;
        });
        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();
    setTimeout(() => {
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    }, 5000);

    // 🎈 BALLOON DELAYS
    document.querySelectorAll('.balloon').forEach((el, i) => {
        el.style.animationDelay = `${i * 1.5}s`;
    });

    // 🔄 TILT INIT
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 25,
            speed: 400,
            glare: true,
            "max-glare": 0.5,
        });
    }

    // 🤖 CLUB BOT CHAT
    const bot = document.getElementById('club-bot');
    if (bot) {
        bot.addEventListener('click', () => {
            const existing = document.querySelector('.bot-chat');
            if (existing) return;

            const chat = document.createElement('div');
            chat.style.cssText = `
        position: fixed; bottom: 120px; right: 30px; width: 300px; background: white; 
        border-radius: 20px; padding: 20px; box-shadow: 0 5px 25px rgba(0,0,0,0.3); 
        z-index: 9999; font-family: 'Fredoka', sans-serif;
      `;
            chat.innerHTML = `
        <div class="bot-header" style="font-weight: bold; color: #1a1a2e; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
          💬 Club Bot v2
          <button id="close-bot" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">×</button>
        </div>
        <div class="bot-messages" id="bot-messages" style="max-height: 200px; overflow-y: auto; margin-bottom: 15px;">
          <div class="bot-msg" style="background: #f0f0f0; padding: 10px; border-radius: 10px; margin-bottom: 10px; font-size: 0.9rem;">
            Hey there! Ask me:<br>“How to join?” or “What’s next event?”
          </div>
        </div>
        <input type="text" id="bot-input" placeholder="Type here..." style="width: 100%; padding: 10px; border-radius: 50px; border: 1px solid #ddd; outline: none;" />
      `;
            document.body.appendChild(chat);

            document.getElementById('close-bot').addEventListener('click', () => {
                chat.remove();
            });

            const input = document.getElementById('bot-input');
            input.focus();
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                    const q = e.target.value.toLowerCase();
                    let reply = "Hmm... good question! 🤔";

                    if (q.includes('join')) reply = "🚀 Join our Discord: discord.gg/codeclub";
                    if (q.includes('event') || q.includes('next')) reply = "📅 Next: Mentor Speed Dating, Sep 20! 💞";
                    if (q.includes('help') || q.includes('stuck')) reply = "🆘 Stuck? Email mentors@codeclub.edu or DM on Discord!";
                    if (q.includes('swag') || q.includes('prize')) reply = "🎁 Submit 4 PRs in Sept → Get T-shirt + stickers!";

                    document.getElementById('bot-messages').innerHTML += `
            <div style="text-align: right; margin-bottom: 10px;">
              <div style="background: #4ecdc4; color: white; padding: 10px; border-radius: 10px; display: inline-block; font-size: 0.9rem;">
                ${e.target.value}
              </div>
            </div>
            <div style="background: #f0f0f0; padding: 10px; border-radius: 10px; margin-bottom: 10px; font-size: 0.9rem;">
              ${reply}
            </div>
          `;
                    e.target.value = '';
                    document.getElementById('bot-messages').scrollTop = document.getElementById('bot-messages').scrollHeight;
                }
            });
        });
    }

    // 🔑 KONAMI CODE
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateKonami();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateKonami() {
        const div = document.createElement('div');
        div.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
      background: rgba(0,0,0,0.95); z-index: 99999; 
      display: flex; align-items: center; justify-content: center; flex-direction: column; 
      color: white; font-family: 'Fredoka', sans-serif; padding: 20px; text-align: center;
    `;
        div.innerHTML = `
      <h1 style="font-size: 3rem; margin-bottom: 20px;">🎊 KONAMI COSMOS UNLOCKED 🎊</h1>
      <p style="font-size: 1.5rem; margin-bottom: 30px;">You’re a legend. Here’s your cosmic reward:</p>
      <img src="https://media.giphy.com/media/lrzgVKAjv3uVa/giphy.gif" style="width:200px; margin-bottom: 30px;" />
      <button onclick="this.parentElement.remove()" style="margin-top:30px; padding:15px 30px; background:#ff6b6b; color:white; border:none; border-radius:50px; cursor:pointer; font-size: 1.1rem; font-weight: 600;">
        Return to Reality
      </button>
    `;
        document.body.appendChild(div);
    }

    // 🌠 CONSTELLATION CLICK
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => {
            const topic = star.dataset.topic;
            window.location.href = `archive.html?filter=${topic}`;
        });
    });

    // 🗃️ ARCHIVE PAGE LOGIC
    if (window.location.pathname.includes('archive.html')) {
        const newsletters = [
            {
                title: "September 2025",
                date: "2025-09",
                image: "../assets/images/sep-cover.jpg",
                description: "Hacktoberfest Kickoff!",
                tags: ["hackathon", "tutorial"]
            },
            {
                title: "August 2025",
                date: "2025-08",
                image: "../assets/images/aug-cover.jpg",
                description: "Freshers Week Madness!",
                tags: ["meme", "event"]
            },
            {
                title: "July 2025",
                date: "2025-07",
                image: "../assets/images/july-cover.jpg",
                description: "Summer Project Showcase",
                tags: ["tutorial", "project", "event"]
            }
        ];

        const container = document.getElementById('archive-container');
        const searchInput = document.getElementById('search-input');
        const tags = document.querySelectorAll('.tag');

        function renderNewsletters(list) {
            container.innerHTML = '';
            list.forEach(nl => {
                const card = document.createElement('div');
                card.className = 'ride-card slide-in-left';
                card.innerHTML = `
          <a href="../newsletters/${nl.date}.html" style="text-decoration:none; color:inherit; display: block;">
            <img src="${nl.image}" alt="${nl.title}" style="width:100%; border-radius:10px; margin-bottom:15px;">
            <h4>${nl.title}</h4>
            <p>${nl.description}</p>
          </a>
        `;
                container.appendChild(card);
            });
        }

        renderNewsletters(newsletters);

        // SEARCH
        searchInput?.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = newsletters.filter(nl =>
                nl.title.toLowerCase().includes(term) ||
                nl.description.toLowerCase().includes(term)
            );
            renderNewsletters(filtered);
        });

        // FILTER
        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                tags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
                const filter = tag.dataset.filter;

                if (filter === 'all') {
                    renderNewsletters(newsletters);
                } else {
                    const filtered = newsletters.filter(nl => nl.tags.includes(filter));
                    renderNewsletters(filtered);
                }
            });
        });

        // URL PARAM FILTER
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');
        if (filterParam) {
            tags.forEach(t => {
                if (t.dataset.filter === filterParam) {
                    t.click();
                }
            });
        }
    }

    // 🏆 ACHIEVEMENTS
    if (!localStorage.getItem('newsletterVisits')) {
        localStorage.setItem('newsletterVisits', 0);
    }

    if (window.location.pathname.includes('/newsletters/')) {
        let visits = parseInt(localStorage.getItem('newsletterVisits')) + 1;
        localStorage.setItem('newsletterVisits', visits);

        const badgeCase = document.querySelector('.badge-case') || (() => {
            const bc = document.createElement('div');
            bc.className = 'badge-case';
            bc.style.cssText = `
        position: fixed; bottom: 30px; left: 30px; 
        background: rgba(0,0,0,0.5); padding: 15px; 
        border-radius: 15px; z-index: 99; 
        backdrop-filter: blur(5px); display: flex; gap: 10px;
      `;
            document.body.appendChild(bc);
            return bc;
        })();

        if (visits === 1) {
            unlockBadge('welcome', "Welcome Explorer!", "🎖️");
        } else if (visits % 5 === 0) {
            unlockBadge('ninja', `Newsletter Ninja 🥷 (${visits})`, "🚀");
        }
    }

    function unlockBadge(id, title, icon) {
        let badges = JSON.parse(localStorage.getItem('badges') || '[]');
        if (!badges.includes(id)) {
            badges.push(id);
            localStorage.setItem('badges', JSON.stringify(badges));

            const badgeCase = document.querySelector('.badge-case');
            const badge = document.createElement('div');
            badge.className = 'badge';
            badge.style.cssText = `
        background: #06d6a0; color: #1a1a2e; padding: 10px; border-radius: 10px; 
        animation: bounceIn 0.5s, fadeOut 0.5s 3s forwards; font-weight: bold;
        display: flex; flex-direction: column; align-items: center; font-size: 0.8rem;
      `;
            badge.innerHTML = `<div style="font-size: 1.5rem;">${icon}</div><div>${title}</div>`;
            badgeCase.appendChild(badge);

            setTimeout(() => {
                badge.remove();
            }, 4000);
        }
    }

    // 👽 UFO EASTER EGG (SCROLL TO BOTTOM)
    let ufoTriggered = false;
    window.addEventListener('scroll', () => {
        if (ufoTriggered) return;
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            ufoTriggered = true;
            if (!localStorage.getItem('ufo-shown')) {
                localStorage.setItem('ufo-shown', 'true');

                const ufo = document.createElement('div');
                ufo.style.cssText = `
          position: fixed; top: -100px; right: 10%; z-index: 9999;
          animation: ufoFly 4s forwards;
        `;
                ufo.innerHTML = `<img src="assets/images/ufo.gif" style="width: 150px; height: auto;" />`;

                document.body.appendChild(ufo);

                const style = document.createElement('style');
                style.textContent = `
          @keyframes ufoFly {
            0% { transform: translateY(-100px) translateX(0); }
            50% { transform: translateY(50vh) translateX(-50vw); }
            100% { transform: translateY(100vh) translateX(-100vw); opacity: 0; }
          }
        `;
                document.head.appendChild(style);

                setTimeout(() => {
                    alert("👽 PSST — You’ve been noticed by the Code Aliens.\nCheck console for secret...");
                    console.log("%c🌟 SECRET ACHIEVEMENT UNLOCKED: Cosmic Explorer 🌟\nJoin our secret channel: #cosmic-explorers", "font-size: 16px; color: gold; background: black; padding: 10px;");
                    ufo.remove();
                }, 4000);
            }
        }
    });

});

const suggestForm = document.getElementById('newsletter-suggestion-form');
if (suggestForm) {
    // Auto-fill hidden context field
    const currentPage = window.location.pathname;
    const userAgent = navigator.userAgent;
    const now = new Date().toLocaleString();
    document.getElementById('auto-context').value = `Page: ${currentPage} | Device: ${userAgent.substring(0, 50)}... | Time: ${now}`;

    suggestForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        // Your Google Form ID (from URL)
        const formId = '1FAIpQLSepw8e4XSNUKxhIZvSc-yBvdlq8Tat0gc2PAMPvCqR-0qiH-A';

        // Build submission URL
        const params = new URLSearchParams();
        for (let [key, value] of formData) {
            params.append(key, value);
        }

        try {
            // Submit to Google Forms (no-cors)
            await fetch(`https://docs.google.com/forms/u/0/d/e/${formId}/formResponse`, {
                method: 'POST',
                mode: 'no-cors',
                body: params
            });

            // Show success UI
            document.getElementById('form-success').style.display = 'block';
            this.reset();

            // Scroll to success
            document.getElementById('form-success').scrollIntoView({ behavior: 'smooth' });

            // Log for debugging
            console.log('🚀 Cosmic suggestion submitted successfully to Google Forms');

        } catch (error) {
            alert('🛸 Transmission failed! Please try again or ping us on Discord.');
            console.error('Form submission error:', error);
        }
    });
}