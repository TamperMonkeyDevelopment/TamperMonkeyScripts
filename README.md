
# 🧠 TamperMonkeyScripts Collection

A growing collection of user-enhancing, ad-blocking, and cleanup scripts designed to improve browsing experiences on sites like **YTS** and **Facebook** using [Tampermonkey](https://www.tampermonkey.net/).

---

## 📜 Available Scripts

### 🧹 YTS Cleaner (`yts-cleaner.user.js`)

Removes intrusive overlays, popups, and ad traps on all major YTS mirror sites — without breaking torrent and magnet link access.

#### ✨ Features

* ✅ Removes full-screen overlays and pop-unders
* ✅ Blocks `window.open` popups
* ✅ Cleans invisible click blockers
* ✅ Preserves `.torrent` and `magnet:` links
* ✅ Supports **YTS mirror domains** (e.g. `yts.mx`, `yts.rs`, `yts.pm`)
* ✅ Includes a visible **toggle button** to enable/disable script at any time

#### 📷 Screenshot

> *(Add your screenshot link below or use a placeholder)*
> ![YTS Toggle Screenshot](https://your-yts-screenshot-url)

#### 🔧 Installation

📦 Requires [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/)

* 👉 [Install via GitHub](https://raw.githubusercontent.com/TamperMonkeyDevelopment/TamperMonkeyScripts/main/yts-cleaner.user.js)
* Or [Install via GreasyFork](https://greasyfork.org/en/scripts/YOUR-YTS-ID) *(when published)*

#### 🔄 Supported Domains

```text
https://yts.mx/*
https://yts.rs/*
https://yts.pm/*
https://yts.lt/*
https://yts.ag/*
https://yifytorrent/*
```

---

### ⚙ Facebook Enhancer (`facebook-enhancer.user.js`)

Transforms modern Facebook into a cleaner, smarter, faster platform with deep user-side control over distractions.

#### ✨ Features

* ✅ Block ads and “Suggested for You” content
* ✅ Disable video autoplay
* ✅ Remove red notification bubbles
* ✅ Force **"Most Recent"** feed over algorithmic
* ✅ Hide **"People You May Know"**
* ✅ Auto-expand comments and replies
* ✅ Auto-close login nags and feedback popups
* ✅ Unwrap `l.facebook.com` redirect links
* ✅ Toggle between **Dark Mode** and a **Classic Blue Theme**
* ✅ 📌 Built-in floating **settings menu** for live toggles

#### 📷 Screenshot

> *(Add your screenshot link below or use a placeholder)*
> ![Facebook Toggle Screenshot](https://your-fb-screenshot-url)

#### 🔧 Installation

📦 Requires [Tampermonkey](https://www.tampermonkey.net/)

* 👉 [Install via GitHub](https://raw.githubusercontent.com/TamperMonkeyDevelopment/TamperMonkeyScripts/main/facebook-enhancer.user.js)
* Or [Install via GreasyFork](https://greasyfork.org/en/scripts/YOUR-FB-ID) *(when published)*

#### 🔄 Supported Domain

```text
https://www.facebook.com/*
```

---

## 🔧 How to Use the Scripts

1. Install **Tampermonkey** in your browser
2. Click install links above for each script
3. Visit YTS or Facebook — a toggle/settings button will appear
4. Use the built-in menu to enable/disable features
5. Settings are remembered between sessions

---

## 📁 Repo Structure

```
TamperMonkeyScripts/
├── yts-cleaner.user.js
├── facebook-enhancer.user.js
├── LICENSE
├── .gitignore
└── README.md
```

---

## 🛠 Contributing

Got an idea or bug fix?
Feel free to fork and submit a pull request, or open an issue!

---

## 📜 License

MIT License
© 2025 TamperMonkeyDevelopment
