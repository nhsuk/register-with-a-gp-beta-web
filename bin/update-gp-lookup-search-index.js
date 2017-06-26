import https from 'https';
import http from 'http';

const GPMedicalPracticesSourceURL = process.env.GPMedicalPracticesHost || "https://raw.githubusercontent.com/nhsuk/general-medical-practices/master/output/general-medical-practices.json";
const GPMedicalPractitionersSourceURL = process.env.GPMedicalPracticesHost || "https://raw.githubusercontent.com/nhsuk/general-medical-practitioners/master/output/general-medical-practitioners.json";

const GPLookupAPISSL = true;
const TIMEOUT = 10000;

let httpOrHttps;
if (GPLookupAPISSL) {
	httpOrHttps = https;
} else {
	httpOrHttps = http;
}

function getJsonResponse(host, path, timeout=TIMEOUT) {
	return new Promise((resolve, reject) => {
		const request = httpOrHttps.get({
			host: host,
			path: path,
			method: 'GET'
		}, function (response) {
			console.log(response.body);
			console.log(response.headers);
			let body = '';
			response.on('data', (d) => {
				console.log(d);
				body += d;
			});
			response.on('end', () => {
				resolve(body);
			});
			response.on('error', (err) => {
				console.log(err);
				reject(err);
			});
		});
		request.setTimeout(timeout, () => {
			request.abort();
			reject();
		});
	});
}

getJsonResponse(GPMedicalPracticesHost, GPMedicalPracticesPath)
	.then(function (body) {
		console.log(e);
	})
	.catch(err => {
		console.log(err);
	});