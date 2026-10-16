const display = document.getElementById('display');
const windowEl = document.getElementById('window');
const calcBody = document.querySelector('.calculator');
let isMaximized = false;

// 1. Keyboard Input Handle Karna
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers aur Math symbols allow karo
    if (/[0-9\+\-\*\/\.\(\)%]/.test(key)) {
        append(key);
    } 
    // Enter dabane par calculate ho
    else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // Enter ka default behavior roko
        calculate();
    } 
    // Backspace se ek number kate
    else if (key === 'Backspace') {
        backspace();
    } 
    // Escape dabane par clear ho jaye
    else if (key === 'Escape') {
        clearDisplay();
    }
});

function append(char) {
    display.value += char;
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        if (display.value.trim() === '') return;
        let result = eval(display.value);
        if (!isFinite(result)) {
            display.value = "Math Error";
            setTimeout(clearDisplay, 1500);
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = "Syntax Error";
        setTimeout(clearDisplay, 1500);
    }
}

// 2. Window Controls (Minimize, Maximize, Close)
function minimize() {
    // Calculator body ko hide/show karega
    if (calcBody.style.display === 'none') {
        calcBody.style.display = 'block';
    } else {
        calcBody.style.display = 'none';
    }
}

function maximize() {
    // Full screen aur normal screen ke beech switch karega
    if (!isMaximized) {
        windowEl.style.width = '100vw';
        windowEl.style.height = '100vh';
        windowEl.style.borderRadius = '0';
        isMaximized = true;
    } else {
        windowEl.style.width = '320px';
        windowEl.style.height = 'auto';
        windowEl.style.borderRadius = '20px';
        isMaximized = false;
    }
}

function closeWindow() {
    // Pura calculator gayab kar dega
    windowEl.style.display = 'none';
    alert("Calculator closed. Refresh the page to open again.");
}
const CACHE_NAME = 'prince-calc-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json'
];

// App install hone par files ko offline memory mein save karna
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Bina internet ke app kholne par saved files dikhana
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});