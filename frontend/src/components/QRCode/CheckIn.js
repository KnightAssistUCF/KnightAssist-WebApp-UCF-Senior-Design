import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import { buildPath } from '../../path';


// HTML Code goes here:
/*
        <div id="qr-reader" style="width:500px"></div>
        <div id="qr-reader-results"></div>

*/

function CheckIn(){

	async function onScanSuccess(decodedText, decodedResult) {
		console.log(`QR Code detected: ${decodedText}`); // decoded text will be the event ID
				
		let url = buildPath('api/checkIn_Afterscan');

		console.log(url);

		await fetch(url, {
				method: 'POST',
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({qrCodeData_eventID: decodedText, studentId: sessionStorage.getItem("ID")})
		})
		.then(response => {
				console.log(response.text());
				// if the response is success then redirect to success page
				// else redirect to failure page
				if (response.status == 200) {
						console.log("Success");
						//window.location.href = ''; // plug page later here [TODO]
				} else {
						console.log("Already checked in");
						//window.location.href = ''; // plug page later here [TODO]
				}
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div id="reader"/>
	);
}

export default CheckIn;