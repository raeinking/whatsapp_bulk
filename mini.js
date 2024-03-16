    const { app, BrowserWindow, ipcMain, screen } = require('electron');
    const puppeteer = require('puppeteer-core');
    const path = require('path');
    const fs = require('fs');
    const { Client } = require('whatsapp-web.js');
    const qrcode = require('qrcode-terminal');
    const { WebDriver, Builder, By, until } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    
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
    
        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    
        // Handle newpage event
        ipcMain.on('newpage', (_, tableData) => {
            // Convert tableData to a JSON string
            const jsonData = JSON.stringify(tableData);
            
            // Load media.html with query parameters including the extracted numbers
            mainWindow.loadURL(`file://${__dirname}/media.html?data=${encodeURIComponent(jsonData)}`);
        });
    
        // Handle dt-start event
        ipcMain.on('dt-start', (event, data) => {
            console.log('Received dt-start event with data:', data);
            // You can perform any necessary actions with the data here
            // Pass the tableData directly to the 'newpage' event
            mainWindow.webContents.send('newpage', tableData);
        });
    }
    
    
    
    // Function to find Chrome executable path
    function findChromePath() {
        const possiblePaths = [
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        ];

        for (const path of possiblePaths) {
            if (fs.existsSync(path)) {
                return path;
            }
        }
        
        return null;
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
    let browser;  // declare browser variable outside the 'open-chrome' event listener

    // Listen for 'open-chrome' event from the renderer process
    ipcMain.on('open-chrome', async () => {
        try {
            // Find Chrome executable path
            const chromePath = findChromePath();
    
            if (!chromePath) {
                throw new Error('Chrome executable not found.');
            }
    
            // Launch Puppeteer with the found Chrome executable path
            browser = await puppeteer.launch({
                executablePath: chromePath,
                headless: false 
            });
    
            // Get existing pages or create a new one
            const pages = await browser.pages();
            const page = pages.length > 0 ? pages[0] : await browser.newPage();
    
            // Set the viewport size manually
            const { width, height } = mainWindow.getContentSize();

                // Set the viewport size to match the content size of the Electron window
            await page.setViewport({ width: 1000, height: 800 });
                            
            // Navigate to WhatsApp website
            await page.goto('https://web.whatsapp.com/');
    
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
    // Listen for 'dt-start' event from the renderer process
// Define the sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Event handler to send messages to numbers
ipcMain.on('dt-start', async (event, data) => {
    try {
        const { filePath, textContent, tableData } = data;

        // Ensure that the browser instance is available
        if (!browser) {
            throw new Error('Browser instance not available. Open Chrome first.');
        }

        // Get the existing pages
        const pages = await browser.pages();

        // If there are no open pages, throw an error
        if (pages.length === 0) {
            throw new Error('No open pages available.');
        }

        // Use the first page to send messages
        const page = pages[0];

        // Loop through each number to send a message
        for (let idx = 0; idx < tableData.length; idx++) {
            const number = tableData[idx].trim();
            if (number === "") {
                continue;
            }
            
            console.log(`${idx + 1}/${tableData.length} => Sending message to ${number}.`);

            try {
                // Navigate to the URL for sending message to the current number
                await page.goto(`https://web.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(textContent)}`, { waitUntil: 'load' });

                // Wait for the attachment button to appear with an increased timeout after page fully loaded
                
                // Click on the attachment button
                
                // Wait for the text input field to appear
                // await page.waitForSelector('._3Uu1_', { timeout: 10000 }).catch(error => {
                    //     console.error('Failed lto find text input fied:', error);
                    // });
                    
                if (filePath) {
                    await page.waitForSelector('[data-icon="attach-menu-plus"]', { timeout: 10000 });
                    await page.evaluate(() => {
                        // Find the element with class 'bo8jc6qi' and click it
                        const attachMenuPlus = document.querySelector('[data-icon="attach-menu-plus"]')
                        if (attachMenuPlus) {
                            attachMenuPlus.click();
                        } else {
                            console.log("can't find this btn: ");
                        }
                    });
                    
                    const extname = path.extname(filePath).toLowerCase();
                    let fileTypeSelector;

                    switch (extname) {
                        case '.jpg':
                        case '.jpeg':
                        case '.png':
                            fileTypeSelector = 'input[type="file"][accept*="image"]';
                            break;
                        case '.mp4':
                        case '.mov':
                            fileTypeSelector = 'input[type="file"][accept*="video"]';
                            break;
                        default:
                            throw new Error(`Unsupported file type: ${extname}`);
                    }

                    // Upload the file using the determined file type selector
                    const input = await page.$(fileTypeSelector);
                    await input.uploadFile(filePath);
                    
                    // Wait for the text input field to appear
                    await page.waitForSelector('._ah9q', { timeout: 10000 }).catch(error => {
                        console.error('Failed lto find text input fied:', error);
                    });
                }
                
                const sendButton = await page.waitForSelector('[data-icon="send"]', { timeout: 10000 }).catch(error => {
                    console.error('Failed to find send button:', error);
                });

                // Wait for the send button to become clickable

                if (sendButton) {
                    await sleep(3000)
                    await sendButton.click();
                    await sleep(12000);
                } else {
                    console.error("Send button not found.");
                }
            } catch (error) {
                console.error(`Error occurred while sending message to ${number}:`, error);
                continue;
            } 
        }
        
        // Close the browser after sending all messages
        // await browser.close();
        // console.log('All messages sent. Browser closed.');
        
    } catch (error) {
        console.error('An error occurred:', error);
        // Handle overall error if needed
    }
});