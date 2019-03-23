import * as req from 'request';
import * as reqp from 'request-promise-native';

export function getVehicleLocations() {
    const options = {
        uri: 'https://kvg-kiel.de/internetservice/geoserviceDispatcher/services/vehicleinfo/vehicles',
        qs: {
            positionType: "CORRECTED",
            colorType: "ROUTE"
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    return reqp(options);
}

