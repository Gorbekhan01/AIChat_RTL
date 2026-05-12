let currentMode = localStorage.getItem("mode") || "auto";
let debounceTimer = null;
let retryCount = 0;
const MAX_RETRIES = 15;

const SELECTORS = {
    buttonsContainer: ".ec4f5d61",
    originalButton: ".ds-atom-button",
    buttonTextTarget: "._6dbc175",
    iconToRemove: ".ds-icon.ds-atom-button__icon",
    targetElements: ".ds-markdown-paragraph, h1, h2, h3, h4, h5, ol, ul, li, p, ._27c9245, table",
};

function setDirection(elements, dir) {
    const isAuto = dir === 'auto';
    elements.forEach(element => {
        if (isAuto) {
            element.removeAttribute("dir");
            element.style.direction = "";
        } else {
            element.setAttribute("dir", dir);
            element.style.direction = dir;
        }
    });
}

function applyDirection() {
    const elements = document.querySelectorAll(SELECTORS.targetElements);
    if (elements.length === 0) return;

    switch(currentMode) {
        case 'rtl': setDirection(elements, 'rtl'); break;
        case 'ltr': setDirection(elements, 'ltr'); break;
        default: setDirection(elements, 'auto');
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
    const statusMap = { "rtl": "1", "ltr": "2", "auto": "0" };
    const textMap = { "rtl": "RTL", "ltr": "LTR", "auto": "Auto" };

    dirButton.setAttribute("status", statusMap[currentMode]);
    if (buttonText) buttonText.textContent = textMap[currentMode];
}

function createDirButton() {
    if (document.querySelector(".dir_button")) return true;

    const container = document.querySelector(SELECTORS.buttonsContainer);
    const baseButton = container?.querySelector(SELECTORS.originalButton);
    
    if (!container || !baseButton) return false;

    const clonedButton = baseButton.cloneNode(true);
    clonedButton.classList.add("dir_button");
    clonedButton.setAttribute("status", "0");

    const textLabel = clonedButton.querySelector(SELECTORS.buttonTextTarget);
    if (textLabel) textLabel.textContent = "Auto";

    const icon = clonedButton.querySelector(SELECTORS.iconToRemove);
    if (icon) icon.remove();

    const buttons = container.querySelectorAll(SELECTORS.originalButton);
    const referenceNode = buttons[1] || buttons[0];
    referenceNode.insertAdjacentElement("afterend", clonedButton);

    clonedButton.addEventListener('click', () => {
        const status = clonedButton.getAttribute("status");
        if (status === "0") updateMode('rtl');
        else if (status === "1") updateMode('ltr');
        else updateMode('auto');
    });

    return true;
}

function Starter() {
    if (createDirButton()) {
        updateButtonUI();
        applyDirection();
    } else if (retryCount < MAX_RETRIES) {
        retryCount++;
        setTimeout(Starter, 500);
    }
}

const observer = new MutationObserver((mutations) => {
    let needsDirectionUpdate = false;
    let needsButtonCheck = false;

    for (let i = 0; i < mutations.length; i++) {
        const mutation = mutations[i];
        
        if (mutation.addedNodes.length > 0) {
            needsDirectionUpdate = true;
            needsButtonCheck = true; 
        }
        
        if (mutation.removedNodes.length > 0) {
            for (let j = 0; j < mutation.removedNodes.length; j++) {
                if (mutation.removedNodes[j].classList?.contains("dir_button")) {
                    needsButtonCheck = true;
                    break;
                }
            }
        }
        if (needsDirectionUpdate && needsButtonCheck) break;
    }

    if (needsButtonCheck && !document.querySelector(".dir_button")) {
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
const style = document.createElement('style');
style.textContent = `
    .katex, .katex-display, .katex-html, .katex-mathml {
        direction: ltr !important;
        unicode-bidi: embed !important;
        text-align: left !important;
    }
`;
document.head.appendChild(style);

// add button in every chat
let lastUrl = window.location.href;
const urlObserver = new MutationObserver(() => {
    if (location.href !== lastUrl) {
        lastUrl = location.href;
        retryCount = 0;
        setTimeout(Starter, 500);
    }
});
urlObserver.observe(document.head, { childList: true, subtree: true });


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', Starter);
} else {
    Starter();
}

// ,
//   "action": {
//     "default_popup": "popup.html",
//     "default_icon": "icon.png"
//   }