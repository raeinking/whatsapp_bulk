const { app, BrowserWindow, ipcMain, screen } = require('electron');
const puppeteer = require('puppeteer-core');
const path = require('path');

// Function to create the main window
function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
}

// Create the main window when Electron is ready
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Listen for 'open-chrome' event from the renderer process
ipcMain.on('open-chrome', async () => {
    try {
        // Specify the path to the Chrome executable
        const chromePath = 'C:\\Users\\Rayan Developer\\Documents\\chrome-win64\\chrome-win64\\chrome.exe';

        // Launch Puppeteer with the specified Chrome executable path
        const browser = await puppeteer.launch({
            executablePath: chromePath,
            headless: false 
        });

        // Create a new page
        const page = await browser.newPage();

        // Navigate to WhatsApp
        await page.goto('https://web.whatsapp.com/');

        // Continuously check if the QR code is scanned
        const intervalId = setInterval(async () => {
            const qrCodeContainer = await page.$('canvas');

            if (qrCodeContainer === null) {
                // If the QR code container is no longer present, it means the QR code has been scanned
                clearInterval(intervalId);

                // Display alert when connected
                await page.evaluate(() => {
                    alert('WhatsApp connected!');
                });

                // Close the browser
                // await browser.close();
            }
        }, 1000); // Check every second
    } catch (error) {
        console.error('An error occurred:', error);
    }
});
