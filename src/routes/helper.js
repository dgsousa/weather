const https = require('https');
const key1 = "AIzaSyBq5sH5ZGsj21YvMM8i1G0d_ZcGds7Ll4I"//process.env.GOOGLE_API_KEY;
const key2 = "efc9eb6642cbfb5aa7be713b8a9ab9de"//process.env.DARKSKY_API_KEY;



//Gathers and returns response data
const getData = (url) => {
	return new Promise((resolve, reject) =>
		https.get(url, response => {
			let body = "";
			response
				.on("data", chunk => body += chunk)
				.on("end", () => {
					if(response.statusCode === 200) {
						body = JSON.parse(body);
						resolve(body);
					} else {
						const err = new Error("Oops! Something went wrong.");
						err.status = response.statusCode;
						reject(err);
					}
				})
		}).on("error", (error) => {
			const err = new Error("Oops! Something went wrong.");
			err.status = 500;
			reject(err);
		})
	);
}


//Gets weather data based on IP Address
const getWeatherFromIP = async (req, res, next) => {
	try {
		let locationData = await getData("https://ipapi.co/json");
		let weatherData = await getData(`https://api.darksky.net/forecast/${key2}/${locationData.latitude},${locationData.longitude}`);
		res.send({...locationData, ...weatherData });
	} catch(err) {
		next(err);
	}
}


//Gets weather Data based on search query
const getWeatherFromSearch = async (req, res, next) => {
	try {
		let locationData = await getData(`https://maps.googleapis.com/maps/api/geocode/json?${req.body.location}&key=${key1}`);
		if(locationData.results[0]) {
			let {lat, lng} = locationData.results[0].geometry.location;
			//Get City and State based on Lat/Lon
			locationData = await getData(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key1}`);
			let weatherData = await getData(`https://api.darksky.net/forecast/${key2}/${lat},${lng}`);
			
			res.send({
				city: locationData.results[0].address_components[3].long_name,
				state: locationData.results[0].address_components[5].long_name,
				...weatherData
			});
		} else {
			throw new Error("Invalid Location.");
		}
	} catch(err) {
		next(err);
	}
}


module.exports = {getWeatherFromIP, getWeatherFromSearch};

