function chooseAI() {
    
    let url = window.location.href;
    
    if (url.includes("chat.deepseek.com")) {
        deepSeekStart();
    }
    
}

chooseAI();