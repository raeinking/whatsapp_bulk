// preload.js
const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type]);
    }

    const btn = document.querySelector('.dt-send');
    if (btn) {
        btn.addEventListener('click', () => {
            console.log('Button clicked');
            ipcRenderer.send('open-chrome');
        });
    }

    function extractNumbersFromTable() {
        const numbers = [];
        const tableRows = document.querySelectorAll('#example tbody tr');
    
        tableRows.forEach(row => {
            const phoneNumberCell = row.querySelector('td:nth-child(2)');
            if (phoneNumberCell) {
                const phoneNumber = phoneNumberCell.textContent.trim();
                numbers.push(phoneNumber);
            }
        });
    
        return numbers;
    }
    

    const btnstart = document.querySelector('.dt-start');
    if (btnstart) {
        btnstart.addEventListener('click', () => {
            console.log('Button clicked');
            ipcRenderer.send('dt-start', extractNumbersFromTable());
        });
    }
    console.log('Preload script loaded');

    // Listen for the 'qr-code' event from the main process
    ipcRenderer.on('qr-code', (event, qrCodeData) => {
        // Display the QR code in the Electron window
        const qrCodeImage = document.createElement('img');
        qrCodeImage.src = `data:image/png;base64, ${qrCodeData.qrImage}`;
        
        // Clear previous QR codes before appending new ones
        const qrCodeContainer = document.querySelector('.qr-code-container');
        qrCodeContainer.innerHTML = '';
        
        qrCodeContainer.appendChild(qrCodeImage);
    });

    // Listen for WhatsApp alerts or notifications from the main process
    ipcRenderer.on('whatsapp-authenticated', () => {
        alert('WhatsApp is logged in');
        // Handle the authenticated event
    });

    ipcRenderer.on('whatsapp-ready', () => {
        alert('WhatsApp is ready');
        // Handle the ready event
    });

    ipcRenderer.on('whatsapp-auth-failure', () => {
        alert('Authentication failed');
        // Handle authentication failure
    });

    ipcRenderer.on('whatsapp-disconnected', (event, reason) => {
        alert('Disconnected: ' + reason);
        // Handle disconnection
    });
});
