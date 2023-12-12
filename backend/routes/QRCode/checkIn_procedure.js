import { Html5QrcodeScanner } from "html5-qrcode";


// HTML Code goes here:
/*
        <div id="qr-reader" style="width:500px"></div>
        <div id="qr-reader-results"></div>

*/

function onScanSuccess(decodedText, decodedResult) {
        console.log(`QR Code detected: ${decodedText}`); // decoded text will be the event ID

        // this will take the api called checkIn_Aftrscan.js
        fetch('', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                },
                body: JSON.stringify({ qrCodeData: decodedText, studentId: '' }),
        })
                .then(response => response.json())
                .then(data => {
                        console.log('Success:', data);
                })
                .catch((error) => {
                        console.error('Error:', error);
                });
}

function onScanFailure(error) {
        console.warn(`QR Code scan failure: ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanFailure);
