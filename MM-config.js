/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "localhost",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",			// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
					  		// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.0.117"],	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 12,
	units: "metric",

	modules: [		
		// Left-hand side modules
		{
			module: 'MMM-GrafanaChart', // Average humidity (daily)
			position: 'top_left',   
			config: {
					url: "http://192.168.0.117:3000/d-solo/d8d651af-91b8-46f8-b851-655c8f17d055/smart-mirror?orgId=1&panelId=2", 
					width: "100%", 
					height: "100%", 
					scrolling: "no", 
					refreshInterval: 3600 
			}
		},
		{
			module: 'MMM-GrafanaChart', // Average temp. (daily)
			position: 'top_left',   
			config: {
					url: "http://192.168.0.117:3000/d-solo/d8d651af-91b8-46f8-b851-655c8f17d055/smart-mirror?orgId=1&panelId=4", 
					width: "100%", 
					height: "100%", 
					scrolling: "no", 
					refreshInterval: 3600 
			}
		},
		{
			module: 'MMM-GrafanaChart', // Current humidity
			position: 'bottom_left',   
			config: {
					url: "http://192.168.0.117:3000/d-solo/d8d651af-91b8-46f8-b851-655c8f17d055/smart-mirror?orgId=1&panelId=1", // see below on how to get the URL from Grafana
					width: "100%", 
					height: "100%", 
					scrolling: "no", 
					refreshInterval: 3600 
			}
		},
		{
			module: 'MMM-GrafanaChart', // Current temperature
			position: 'bottom_left',   
			config: {
					url: "http://192.168.0.117:3000/d-solo/d8d651af-91b8-46f8-b851-655c8f17d055/smart-mirror?orgId=1&panelId=3", // see below on how to get the URL from Grafana
					width: "100%", 
					height: "100%", 
					scrolling: "no", 
					refreshInterval: 3600 
			}
		},
		{
			module: "weather", // current weather
			position: "bottom_left",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "Kuala Lumpur",
				locationID: "1733045", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "d34096246055d217c7c4c05de66e19fa",
				showHumidity: true
			}
		},
		// Right-hand side modules
		{
			module: "clock",
			position: "top_right",
			config: {
				timezone: "Etc/UTC+8",
				showPeriod: true,
				showPeriodUpper: true,
				clockBold: true
			}
		},
		{
			module: "calendar",
			header: "MYS Holidays",
			position: "top_right",
			config: {
				calendars: [
					{
						fetchInterval: 7 * 24 * 60 * 60 * 1000,
						symbol: "calendar-check",
						url: "https://ics.calendarlabs.com/58/b60fbce5/Malaysia_Holidays.ics"
					}
				]
			}
		},
		{
			module: "weather", // forecast
			position: "top_right",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				location: "Kuala Lumpur",
				locationID: "1733045", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "d34096246055d217c7c4c05de66e19fa"
			}
		},
		// Default unused modules
		// {
		// 	module: "alert",
		// },
		// {
		// 	module: "updatenotification",
		// 	position: "top_bar"
		// },
		// {
		// 	module: "compliments",
		// 	position: "lower_third"
		// },
		// {
		// 	module: "newsfeed",
		// 	position: "bottom_bar",
		// 	config: {
		// 		feeds: [
		// 			{
		// 				title: "New York Times",
		// 				url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
		// 			}
		// 		],
		// 		showSourceTitle: true,
		// 		showPublishDate: true,
		// 		broadcastNewsFeeds: true,
		// 		broadcastNewsUpdates: true
		// 	}
		// },
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
