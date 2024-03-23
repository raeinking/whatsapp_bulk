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
            ipcRenderer.send('open-chrome');
        });
    }       

    window.extractNumbersFromTable = function() {
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
    };

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
    

    // const newPageButton = document.querySelector('.dt-newpage');
    // if (newPageButton) {
    //     newPageButton.addEventListener('click', () => {
    //         // Extract numbers from the table
    //         const tableData = extractNumbersFromTable();

    //         // Convert tableData to a JSON string
    //         const jsonData = JSON.stringify(tableData);

    //         // Send the data to the main process with the event name 'newpage'
    //         ipcRenderer.send('newpage', jsonData);
    //     });
    // }
    function sendDataToMainProcess(tableData) {
        // ipcRenderer.send('table-data', tableData); // Sending tableData to the main process
        ipcRenderer.send('newpage', tableData);
    }


    let tableData = [];

    // Find the button with class '.dt-newpage'
const newPageButton = document.querySelector('.dt-newpage');
if (newPageButton) {
    newPageButton.addEventListener('click', () => {
        // Extract numbers from the table
        tableData = extractNumbersFromTable();

        // Call the function to send data to the main process
        sendDataToMainProcess(tableData);
    });
}        
const btnstart = document.querySelector('.dt-start');
console.log('Button clicked');
if (btnstart) {
    btnstart.addEventListener('click', () => {
        console.log(tableData);

        // Get file input and textarea
        const fileInput = document.querySelectorAll('.fileinput');
        const textarea = document.getElementById('textarea');

        // Get the selected file and its path
        const file = fileInput[0].files[0];
        const filePath = file ? file.path : null;

        // Get the content of the textarea
        const textContent = textarea.value;

        // Send the data to the main process
        ipcRenderer.send('dt-start', { filePath, textContent, tableData });
    });
}
    
        // const btnstart = document.querySelector('.dt-start');
        // console.log('Button clicked');
        // if (btnstart) {
        //     btnstart.addEventListener('click', () => {
        //         console.log('Button clicked');
    
        //         // Get file input and textarea
        //         const fileInput = document.querySelectorAll('.fileinput');
        //         const textarea = document.getElementById('textarea');
    
        //         // Get the selected file and its path
        //         const file = fileInput[0].files[0];
        //         const filePath = file ? file.path : null;
    
        //         // Get the content of the textarea
        //         const textContent = textarea.value;
    
        //         // Extract numbers from the table
        //         const tableData = extractNumbersFromTable();
    
        //         // Send the data to the main process
        //         ipcRenderer.send('dt-start', { filePath, textContent, tableData });
        //     });
        // }
        
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
