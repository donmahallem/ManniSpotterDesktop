import * as req from "request";
import * as reqp from "request-promise-native";

export function getRouteByVehicleId(vehicleId) {
    const options = {
        headers: {
            // 'Referer': "https://www.kvg-kiel.de/fahrplan/echtzeit/",
            "User-Agent": "Request-Promise",
            // 'Origin': 'https://www.kvg-kiel.de'
        },
        json: true,
        method: "POST",
        query: {
            // Like <input type="text" name="name">
            id: vehicleId,
        },
        uri: "https://www.kvg-kiel.de/internetservice/geoserviceDispatcher/services/pathinfo/vehicle",

    };
    /*
    const options = {
        method: 'POST',
        uri: 'https://kvg-kiel.de/internetservice/services/routeInfo/routeStops',
        form: {
            // Like <input type="text" name="name">
            routeId: routeId
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };*/
    return reqp(options);
}

export function getRouteByTripId(vehicleId) {
    const options = {
        headers: {
            "User-Agent": "Request-Promise",
        },
        json: true,
        method: "POST",
        qs: {
            // Like <input type="text" name="name">
            id: vehicleId,
        },
        uri: "https://www.kvg-kiel.de/internetservice/geoserviceDispatcher/services/pathinfo/trip",
    };
    /*
    const options = {
        method: 'POST',
        uri: 'https://kvg-kiel.de/internetservice/services/routeInfo/routeStops',
        form: {
            // Like <input type="text" name="name">
            routeId: routeId
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };*/
    return reqp(options);
}
