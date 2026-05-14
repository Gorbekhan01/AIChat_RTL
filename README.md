# 🤖 AI Chatbots RTL Support + Theme
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-blue)](https://github.com/Gorbekhan01)
[![Version](https://img.shields.io/badge/version-1.0-green)](https://github.com/Gorbekhan01)
[![License](https://img.shields.io/badge/license-MIT-orange)](https://github.com/Gorbekhan01)
> 🌐 **Fix RTL issues in AI chatbots with beautiful themes**
---
## ✨ Features
| Feature | Description |
|---------|-------------|
| **RTL/LTR/Auto Modes** | Perfect text direction for Persian, Arabic, Hebrew & other RTL languages |
| **🎨 Multiple Themes** | Forest, Ocean, Candy, Minimal, Dark, Matrix & more |
| **⚡ Lightweight** | Only affects DOM/BOM, zero data collection |
| **🔧 Customizable** | Add your own themes in `themes.js` |
---
## 🖼️ Preview
| RTL Mode | Theme Selector |
|----------|----------------|
| Fixes chat text direction | Switch between 6+ themes |
---
## 🚀 Supported AI Websites
| Platform | Status            |     |
| -------- | ----------------- | --- |
| DeepSeek | ✅ Fully Supported |     |
| Gemini   | 🚧 Coming Soon    |     |
| Claude   | 🚧 Coming Soon    |     |

---
## 📦 Installation
### For Chromium-based browsers (Chrome, Edge, Brave, Opera):
```bash
1. Open browser → Settings / Extensions
2. Enable "Developer Mode" (toggle on)
3. Click "Load Unpacked"
4. Select the extension folder
5. Done! 🎉

### Or manually:

bash

git clone https://github.com/Gorbekhan01/ai-chat-rtl-support.git
cd ai-chat-rtl-support
# Then load in browser as unpacked extension
```
---

## 🎮 How to Use

After installation, visit any supported AI chat website:

1. Two buttons will appear in the chat interface:
    
    - **Direction Button** (RTL/LTR/Auto)
        
    - **Theme Button** (Open theme selector)
        
2. **Direction Modes:**
    
    - `Auto` → Automatically detects text direction
        
    - `RTL` → Force Right-to-Left
        
    - `LTR` → Force Left-to-Right
        
3. **Themes:**
    
    - Click Theme button → Select your favorite theme
        
    - Theme saves automatically to browser storage
        

---

## 🎨 Adding Custom Themes

Edit `themes.js` and add your own theme:
```
javascript

const myTheme = {
    css: `
        body {
            background: #yourColor !important;
        }
        [class*="message"] {
            background: #messageColor !important;
            color: #textColor !important;
        }
        // ... more CSS
    `,
    color: "#yourColor",
    name: "My Theme"
};
// Add to themes object
const themes = {
    // ... existing themes
    myTheme
};
```
---

## 📁 Project Structure

```

AIChat-RTL/
├── manifest.json          # Extension config
├── main.js               # Main logic
├── themes.js             # Theme definitions
├── deepseek.js           # DeepSeek specific code
├── popup.html            # Extension popup UI
├── icons                # Extension icons
└── README.md

```
---

## 🔒 Privacy & Security

- ✅ **Zero data collection** - No analytics, no tracking
    
- ✅ **Local only** - Everything runs in your browser
    
- ✅ **Open source** - Code is fully visible
    
- ✅ **No external requests** - Works offline
