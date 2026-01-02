function getNumberTracked() {
    return trackedCurrencies.length;
}

function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    document.getElementById(viewId).classList.add('active');
}

function updateDisplay() {
    const trackedAmt = document.getElementById('tracked');
    if(getNumberTracked() === 0) {
        trackedAmt.textContent = 'none';
    } 
    else {
        trackedAmt.textContent = '';
    }
}

async function fetchCryptoData(ticker) {
    try {
        const res = await fetch(`https://api.coinbase.com/v2/prices/${ticker}-USD/spot`);
        const coin = await res.json();
        
        const cryptoInfo = {
            ticker: coin.data.base,
            price: parseFloat(coin.data.amount),
        };
        
        return cryptoInfo;
        
    } catch (error) {
        console.error(`Error fetching ${ticker}:`, error);
        return null;
    }
}

async function fetchAllData(supportedCurrencies) {
    const allData = await Promise.all(
        supportedCurrencies.map(ticker => fetchCryptoData(ticker))
    );
    
    return allData.filter(data => data !== null);
}

function startEventListeners() {
    document.getElementById('add-currency-btn').addEventListener('click', () => {
        showView('add-currency-view');
    });

    document.getElementById('price-alerts-btn').addEventListener('click', () => {
        showView('price-alerts-view');
    });

    document.querySelectorAll('.back-arrow').forEach(button => {
        button.addEventListener('click', () => {
            showView('main-view');
        });
    });
}

// --

let trackedCurrencies = [];
let allData = [];

async function init() {
    startEventListeners(); 
    allData = await fetchAllData(supportedCurrencies);
    updateDisplay();
}

init();