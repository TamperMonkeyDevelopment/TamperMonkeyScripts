// ==UserScript==
// @name         Facebook Enhancer with Smart Menu
// @namespace    https://github.com/YOUR_USERNAME/facebook-enhancer
// @version      2.0
// @description  Enhance Facebook: block ads, autoplay, unwrap links, classic theme, auto-expand, and collapsible settings panel with toggles per feature.
// @author       ChatGPT
// @match        *://www.facebook.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

    const settings = {
        blockSponsored: true,
        blockSuggested: true,
        disableAutoplay: true,
        removeBubbles: true,
        unwrapLinks: true,
        moveMessengerDock: false,
        forceDarkMode: false,
        forceMostRecentFeed: true,
        hidePeopleYouMayKnow: true,
        autoExpandComments: true,
        autoClosePopups: true,
        classicBlueTheme: false,
    };

    const storageKey = 'fb-enhancer-settings';
    let menuVisible = false;

    function loadSettings() {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            const parsed = JSON.parse(saved);
            Object.assign(settings, parsed);
        }
    }

    function saveSettings() {
        localStorage.setItem(storageKey, JSON.stringify(settings));
    }

    // CSS
    GM_addStyle(`
        #fb-enhancer-toggle {
            position: fixed;
            top: 60px;
            right: 10px;
            background: #4267B2;
            color: #fff;
            font-weight: bold;
            padding: 6px 10px;
            border-radius: 6px;
            cursor: pointer;
            z-index: 99999;
            font-size: 14px;
            box-shadow: 0 0 5px #000;
        }
        #fb-enhancer-menu {
            position: fixed;
            top: 100px;
            right: 10px;
            background: #fff;
            color: #000;
            font-size: 14px;
            padding: 10px;
            border: 1px solid #ccc;
            z-index: 99998;
            width: 200px;
            border-radius: 6px;
            box-shadow: 0 0 5px rgba(0,0,0,0.5);
            font-family: sans-serif;
            display: none;
        }
        #fb-enhancer-menu h4 {
            margin-top: 0;
            margin-bottom: 6px;
            font-size: 15px;
        }
        #fb-enhancer-menu label {
            display: block;
            margin-bottom: 4px;
        }
        .fb-dark-mode {
            filter: invert(1) hue-rotate(180deg);
        }
        .fb-dark-mode img {
            filter: invert(1) hue-rotate(180deg);
        }
        .classic-blue-theme {
            --primary-color: #4267B2;
            background-color: #e9ebee !important;
            color: #1c1e21 !important;
        }
    `);

    function createToggleButton() {
        const toggle = document.createElement('div');
        toggle.id = 'fb-enhancer-toggle';
        toggle.textContent = '⚙ FB Enhancer';
        toggle.addEventListener('click', () => {
            const panel = document.getElementById('fb-enhancer-menu');
            menuVisible = !menuVisible;
            panel.style.display = menuVisible ? 'block' : 'none';
        });
        document.body.appendChild(toggle);
    }

    function createSettingsMenu() {
        const menu = document.createElement('div');
        menu.id = 'fb-enhancer-menu';
        menu.innerHTML = `<h4>Facebook Enhancer</h4>
            ${Object.keys(settings).map(key => `
                <label>
                    <input type="checkbox" id="toggle-${key}" ${settings[key] ? 'checked' : ''}> ${key}
                </label>
            `).join('')}
        `;
        document.body.appendChild(menu);

        Object.keys(settings).forEach(key => {
            const checkbox = document.getElementById(`toggle-${key}`);
            checkbox.addEventListener('change', () => {
                settings[key] = checkbox.checked;
                saveSettings();
                location.reload();
            });
        });
    }

    function runEnhancements() {
        const posts = document.querySelectorAll('[role="feed"] [role="article"]');

        posts.forEach(post => {
            if (settings.blockSponsored && /Sponsored/i.test(post.innerText)) {
                post.remove();
            }
            if (settings.blockSuggested && /Suggested for you/i.test(post.innerText)) {
                post.remove();
            }
            if (settings.autoExpandComments) {
                post.querySelectorAll('[role="button"]').forEach(btn => {
                    if (btn.innerText === 'View more comments' || btn.innerText.includes('replies')) {
                        btn.click();
                    }
                });
            }
        });

        if (settings.removeBubbles) {
            document.querySelectorAll('span').forEach(el => {
                if (el.textContent.match(/^\d+$/) && el.closest('[aria-label]')) {
                    el.textContent = '';
                }
            });
        }

        if (settings.unwrapLinks) {
            document.querySelectorAll('a[href*="l.facebook.com/l.php"]').forEach(link => {
                const url = new URL(link.href);
                const real = decodeURIComponent(url.searchParams.get('u') || '');
                if (real.startsWith('http')) link.href = real;
            });
        }

        if (settings.disableAutoplay) {
            document.querySelectorAll('video').forEach(v => {
                v.autoplay = false;
                v.pause();
                v.removeAttribute('autoplay');
            });
        }

        if (settings.hidePeopleYouMayKnow) {
            document.querySelectorAll('span').forEach(el => {
                if (el.textContent.includes('People you may know')) {
                    const card = el.closest('[role="article"]');
                    if (card) card.remove();
                }
            });
        }

        if (settings.autoClosePopups) {
            document.querySelectorAll('[role="dialog"]').forEach(d => {
                const text = d.innerText.toLowerCase();
                if (text.includes('log in') || text.includes('feedback') || text.includes('report')) {
                    d.remove();
                }
            });
        }

        if (settings.forceMostRecentFeed) {
            const feedSwitch = document.querySelector('a[href*="sk=h_chr"]');
            if (feedSwitch) feedSwitch.click();
        }

        if (settings.classicBlueTheme) {
            document.body.classList.add('classic-blue-theme');
        }

        if (settings.moveMessengerDock) {
            const dock = document.querySelector('[aria-label="Chat tab bar"]');
            if (dock) {
                dock.style.bottom = '0';
                dock.style.top = 'auto';
            }
        }

        if (settings.forceDarkMode) {
            document.documentElement.classList.add('fb-dark-mode');
        } else {
            document.documentElement.classList.remove('fb-dark-mode');
        }
    }

    function init() {
        loadSettings();
        createToggleButton();
        createSettingsMenu();

        setInterval(runEnhancements, 2000);
        window.addEventListener('load', runEnhancements);
    }

    init();
})();
