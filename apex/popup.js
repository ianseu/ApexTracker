let trackedCurrencies = [];

function getNumberTracked() {
    return trackedCurrencies.length;
}

function updateDisplay() {
    const trackedAmt = document.getElementById('tracked');
    if(getNumberTracked() === 0) {
        trackedAmt.textContent = 'none';
    } 
}

updateDisplay();