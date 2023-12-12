import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

// HTML Code goes here:
/*
        <div id="qr-reader" style="width:500px"></div>
        <div id="qr-reader-results"></div>

*/

function CheckIn(){

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
                .then(response => {
                        // if the response is success then redirect to success page
                        // else redirect to failure page
                        if (response.status == 200) {
                                //window.location.href = ''; // plug page later here [TODO]
                        } else {
                                //window.location.href = ''; // plug page later here [TODO]
                        }
                })
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

        useEffect(() => {
                let html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
        
                html5QrcodeScanner.render(onScanSuccess, onScanFailure);
        }, []);

        return (
                <div id="reader"/>
        );
}

export default CheckIn;