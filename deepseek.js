function deepSeekStart() {
  let currentMode = localStorage.getItem("mode") || "auto";
  let currentTheme = localStorage.getItem("theme") || "default";
  let debounceTimer = null;
  let retryCount = 0;
  const MAX_RETRIES = 15;

  const SELECTORS = {
    buttonsContainer: ".ec4f5d61",
    originalButton: ".ds-atom-button",
    buttonTextTarget: "._6dbc175",
    iconToRemove: ".ds-icon.ds-atom-button__icon",
    targetElements:
      ".fbb737a4 , .ds-markdown-paragraph, h1, h2, h3, h4, h5, ol, ul, li, p, ._27c9245, table",
  };

function isRTLLang(text) {
    const rtlPattern =
      /[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF]|[\u0700-\u074F]|[\u0750-\u077F]|[\u08A0-\u08FF]|[\u1800-\u18AF]/g;
    const rtlChars = text.match(rtlPattern);
    if (rtlChars && rtlChars.length > 0) return true;
    return false;
}

  function setDirection(elements, dir) {
    const isAuto = dir === "auto";
    elements.forEach((element) => {
      if (isAuto) {
        const firstChars = element.textContent;
        if (isRTLLang(firstChars)) {
          element.setAttribute("dir", "rtl");
          element.style.direction = "rtl";
        } else {
          element.setAttribute("dir", "ltr");
          element.style.direction = "ltr";
        }
      } else {
        element.setAttribute("dir", dir);
        element.style.direction = dir;
      }
    });
  }

  function applyDirection() {
    const elements = document.querySelectorAll(SELECTORS.targetElements);
    if (elements.length === 0) return;

    switch (currentMode) {
      case "rtl":
        setDirection(elements, "rtl");
        break;
      case "ltr":
        setDirection(elements, "ltr");
        break;
      case "auto":
        setDirection(elements, "auto");
        break;
    }

    localStorage.setItem("mode", currentMode);
  }

  function updateMode(mode) {
    currentMode = mode;
    applyDirection();
    updateButtonUI();
  }

  function updateButtonUI() {
    const dirButton = document.querySelector(".dir_button");
    if (!dirButton) return;

    const buttonText = dirButton.querySelector(SELECTORS.buttonTextTarget);
    const statusMap = { auto: "0", rtl: "1", ltr: "2" };
    const textMap = { auto: "Auto", rtl: "RTL", ltr: "LTR" };

    dirButton.setAttribute("status", statusMap[currentMode]);
    if (buttonText) buttonText.textContent = textMap[currentMode];
  }

  function createButton(className, textContext) {
    if (document.querySelector(className)) return true;

    const container = document.querySelector(SELECTORS.buttonsContainer);
    const baseButton = container?.querySelector(SELECTORS.originalButton);

    if (!container || !baseButton) return false;
    const clonedButton = baseButton.cloneNode(true);
    clonedButton.classList.add(className.replace(".", ""));

    const textLabel = clonedButton.querySelector(SELECTORS.buttonTextTarget);
    if (textLabel) textLabel.textContent = textContext;

    const icon = clonedButton.querySelector(SELECTORS.iconToRemove);
    if (icon) icon.remove();

    const buttons = container.querySelectorAll(SELECTORS.originalButton);
    const referenceNode = buttons[1] || buttons[0];
    referenceNode.insertAdjacentElement("afterend", clonedButton);

    return clonedButton;
  }

  function createDirButton() {
    let button = createButton(".dir_button", "Auto");
    if (button === true || button === false) {
      return button;
    }
    button.setAttribute("status", "0");

    button.addEventListener("click", () => {
      const status = button.getAttribute("status");
      if (status === "0") updateMode("rtl");
      else if (status === "1") updateMode("ltr");
      else updateMode("auto");
    });

    return true;
  }
  function createThemeButton() {
    let button = createButton(".theme_button", "Theme");
    if (button === true || button === false) return;

    button.setAttribute("themeno", "0");

    button.addEventListener("click", () => {
      const oldWindow = document.querySelector(".theme-window");
      if (oldWindow) oldWindow.remove();

      let themeWindow = document.createElement("div");
      themeWindow.className = "theme-window";
      themeWindow.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 280px;
            max-height: 450px;
            border-radius: 20px;
            background: #1e1e2e;
            padding: 20px;
            z-index: 100000;
            overflow-y: auto;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            border: 1px solid #2a2a3e;
        `;

      const title = document.createElement("h4");
      title.textContent = "Select Theme";
      title.style.cssText = `
            color: #e0e0e0;
            margin: 0 0 20px 0;
            text-align: center;
            font-size: 16px;
            font-weight: 500;
        `;
      themeWindow.appendChild(title);

      const defaultBtn = document.createElement("div");
      defaultBtn.textContent = "Default";
      defaultBtn.style.cssText = `
            padding: 10px;
            margin: 8px 0;
            background: #2a2a3e;
            color: #e0e0e0;
            border-radius: 10px;
            cursor: pointer;
            text-align: center;
            transition: all 0.2s;
        `;
      defaultBtn.onmouseenter = () => {
        defaultBtn.style.background = "#3a3a4e";
      };
      defaultBtn.onmouseleave = () => {
        defaultBtn.style.background = "#2a2a3e";
      };
      if (currentTheme === "default") {
        defaultBtn.style.border = "1px solid #667eea";
        defaultBtn.style.background = "#3a3a4e";
      }
      defaultBtn.onclick = () => {
        currentTheme = "default";
        localStorage.setItem("theme", currentTheme);
        applyTheme();
        themeWindow.remove();
      };
      themeWindow.appendChild(defaultBtn);

      for (let themeKey in themes) {
        const theme = themes[themeKey];
        if (themeKey === "defaultt") continue;

        const themeBtn = document.createElement("div");
        themeBtn.textContent = theme.name;
        themeBtn.style.cssText = `
                padding: 10px;
                margin: 8px 0;
                background: ${theme.color || "#333"};
                color: white;
                border-radius: 10px;
                cursor: pointer;
                text-align: center;
                transition: all 0.2s;
            `;
        themeBtn.onmouseenter = () => {
          themeBtn.style.filter = "brightness(1.1)";
          themeBtn.style.transform = "translateX(4px)";
        };
        themeBtn.onmouseleave = () => {
          themeBtn.style.filter = "brightness(1)";
          themeBtn.style.transform = "translateX(0)";
        };
        if (currentTheme === themeKey) {
          themeBtn.style.border = "2px solid #fff";
          themeBtn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
        }
        themeBtn.onclick = () => {
          currentTheme = themeKey;
          localStorage.setItem("theme", currentTheme);
          applyTheme();
          themeWindow.remove();
        };
        themeWindow.appendChild(themeBtn);
      }

      const closeBtn = document.createElement("button");
      closeBtn.textContent = "Close";
      closeBtn.style.cssText = `
            margin-top: 16px;
            padding: 10px;
            width: 100%;
            background: #ff4757;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s;
        `;
      closeBtn.onmouseenter = () => {
        closeBtn.style.background = "#ff6b81";
      };
      closeBtn.onmouseleave = () => {
        closeBtn.style.background = "#ff4757";
      };
      closeBtn.onclick = () => themeWindow.remove();
      themeWindow.appendChild(closeBtn);

      document.body.appendChild(themeWindow);
    });
  }

  function applyTheme() {
    const oldStyle = document.getElementById("custom-theme");
    if (oldStyle) {
      oldStyle.remove();
    }

    if (currentTheme === "default") {
      return;
    }

    let selectedTheme = null;
    for (let themeKey in themes) {
      if (themeKey === currentTheme) {
        selectedTheme = themes[themeKey];
        break;
      }
    }

    if (!selectedTheme) return;

    const style = document.createElement("style");
    style.id = "custom-theme";

    style.textContent = selectedTheme.css;
    document.head.appendChild(style);
  }

  function Starter() {
    if (createDirButton()) {
      createThemeButton();
      updateButtonUI();
      applyDirection();
      applyTheme();
    } else if (retryCount < MAX_RETRIES) {
      retryCount++;
      setTimeout(Starter, 500);
    }
  }

  const observer = new MutationObserver((mutations) => {
    let needsDirectionUpdate = false;
    let buttonCheck = false;

    for (let i = 0; i < mutations.length; i++) {
      const mutation = mutations[i];

      if (mutation.addedNodes.length > 0) {
        needsDirectionUpdate = true;
        buttonCheck = true;
      }

      if (mutation.removedNodes.length > 0) {
        for (let j = 0; j < mutation.removedNodes.length; j++) {
          if (mutation.removedNodes[j].classList?.contains("dir_button")) {
            buttonCheck = true;
            break;
          }
        }
      }
      if (needsDirectionUpdate && buttonCheck) break;
    }

    if (buttonCheck && !document.querySelector(".dir_button")) {
      retryCount = 0;
      Starter();
    }

    if (needsDirectionUpdate) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(applyDirection, 150);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // katex rtl fixation
  const style = document.createElement("style");
  style.textContent = `
    .katex, .katex-display, .katex-html, .katex-mathml {
        direction: ltr !important;
        unicode-bidi: embed !important;
        text-align: left !important;
    }
`;
  document.head.appendChild(style);

  // add button when chat changed
  let lastUrl = window.location.href;
  const urlObserver = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      retryCount = 0;
      setTimeout(Starter, 500);
    }
  });
  urlObserver.observe(document.head, { childList: true, subtree: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", Starter);
  } else {
    Starter();
  }
}
