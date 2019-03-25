import * as req from "request";
import * as reqp from "request-promise-native";

export function getVehicleLocations() {
    const options = {
        headers: {
            "User-Agent": "Request-Promise",
        },
        json: true,
        qs: {
            colorType: "ROUTE",
            positionType: "CORRECTED",
        },
        uri: "https://kvg-kiel.de/internetservice/geoserviceDispatcher/services/vehicleinfo/vehicles",
        // Automatically parses the JSON string in the response
    };
    return reqp(options);
}
