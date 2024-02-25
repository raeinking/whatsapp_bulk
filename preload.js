// preload.js
const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }

    const btn = document.querySelector('.dt-send');
    if (btn) {
        btn.addEventListener('click', () => {
            console.log('Button clicked');
            ipcRenderer.send('open-chrome');
        });
    }
});
