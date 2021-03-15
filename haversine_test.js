const haversine = require('haversine');

const start = {
  latitude: 12.97375,
  longitude: 77.62499
}

var end = [
	{
		latitude: 12.9609917,
		longitude: 77.6387256
	},
	{
		latitude: 12.9719025,
		longitude: 77.6411435
	},
	{
		latitude: 125.750885,
		longitude: 39.025989
	}
]

end.forEach(epo => {
	console.log(haversine(start, epo));
});

