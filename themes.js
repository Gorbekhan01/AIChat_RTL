
function cssCreator(primaryBg, secondaryBg, accentColor, textColor, opacity = 0.95) {

    const rgbaPrimary = (color, op) => {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${op})`;
    };
    
    const secondaryRgbaLight = rgbaPrimary(secondaryBg, opacity - 0.05);
    
    return `
        body, ._77cefa5, ._3d616d3, ._871cbca, .b8812f16, .a2f3d50e, .fbb737a4 {
            background: ${primaryBg} !important;
        }
        .f8d1e4c0 {
            background: ${primaryBg} !important;
            color: ${textColor} !important;
        }
        .f3d18f6a {
            background: ${primaryBg} !important;
            color: ${textColor} !important;
        }
        .d72636e2, ._254829d, ._1d72f01 {
            display: none !important;
        }
        ._0fcaa63 {
            background: transparent !important;
            color: ${textColor} !important;
        }
        ._5a8ac7a {
            background: ${secondaryBg} !important;
            color: ${textColor} !important;
            border: 1px solid ${accentColor} !important;
        }
        ._5a8ac7a:hover {
            background: ${accentColor} !important;
            color: ${primaryBg} !important;
        }
        ._121d384 {
            background: ${secondaryBg} !important;
            color: ${textColor} !important;
            border-color: ${accentColor} !important;
        }
        .b64fb9ae {
            background: ${secondaryBg} !important;
            color: ${textColor} !important;
        }
        .b64fb9ae:hover {
            background: ${accentColor} !important;
            color: ${primaryBg} !important;
        }
        ._3586175 {
            background: transparent !important;
            box-shadow: none !important;
        }
        ._6ffc3c9 {
            background: ${secondaryBg} !important;
            color: ${textColor} !important;
        }
        .ds-message > .fbb737a4  {
            background: ${secondaryBg} !important;
            backdrop-filter: blur(10px) !important;
            color: ${textColor} !important;
            border-radius: 20px !important;
            border: 1px solid ${accentColor}80 !important;
            margin: 10px !important;
            padding: 16px !important;
        }
        .ds-assistant-message-main-content {
            background: ${secondaryRgbaLight} !important;
            color: ${textColor} !important;
            border-radius: 20px !important;
            padding: 12px !important;
        }
        textarea, .ds-input, ._77cefa5, ._3d616d3 {
            background: ${secondaryBg} !important;
            color: ${textColor} !important;
            border: 1px solid ${accentColor} !important;
        }
        button, .ds-atom-button {
            background: ${accentColor} !important;
            color: ${primaryBg} !important;
            font-weight: bold !important;
            border: none !important;
            cursor: pointer !important;
        }
        button:hover, .ds-atom-button:hover {
            filter: brightness(1.1) !important;
        }
        ._871cbca {
            background: ${primaryBg} !important;
            box-shadow: none !important;
        }
        .b8812f16, .a2f3d50e {
            background: ${primaryBg} !important;
        } 
        ._6dbc175 {
            color : #FFF
        }
    `;
}

const forest = {
    css: cssCreator("#0a2f1f", "#1a3a2a", "#4caf50", "#d4e6d4", 0.95),
    color: "#0a2f1f",
    name: "Forest"
};

const ocean = {
    css: cssCreator("#0a2a3a", "#0d3b4f", "#4a9eb3", "#b8e4f0", 0.95),
    color: "#0a2a3a",
    name: "Ocean"
};

const candy = {
    css: cssCreator("#2a0a2a", "#3a1a3a", "#d47fa8", "#f0c0e0", 0.95),
    color: "#2a0a2a",
    name: "Candy"
};

const minimal = {
    css: cssCreator("#1a1a1a", "#2a2a2a", "#444444", "#e0e0e0", 0.95),
    color: "#1a1a1a",
    name: "Minimal"
};

const dark = {
    css: cssCreator("#0a0a14", "#1a1a30", "#2a2a4a", "#c0c0e0", 0.95),
    color: "#0a0a14",
    name: "Dark"
};

const matrix = {
    css: cssCreator("#000000", "#0a0f0a", "#00ff41", "#00ff41", 0.95),
    color: "#00ff41",
    name: "Matrix"
};

const meow = {
    css: cssCreator("#0a0a0a", "#1a0a1a", "#ff2a6d", "#ffb3c6", 0.95),
    color: "#ff2a6d",
    name: "Meow"
};

// you can add your theme here ^o-o^

const themes = {
    forest,
    ocean,
    candy,
    minimal,
    dark,
    matrix,
    meow
};

