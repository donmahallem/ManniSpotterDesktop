import { TrapezeApiClient, VehicleStorage } from "@donmahallem/trapeze-api-client";
import * as express from "express";
import {
} from "./";
const app: express.Router = express.Router();

const trapezeApi: TrapezeApiClient = new TrapezeApiClient(process.argv[2]);
const str: VehicleStorage = new VehicleStorage(trapezeApi, 30000);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/api/geo/stations", (req, res) => {
    trapezeApi.getStations()
        .then((dataRes) => {
            res.json(dataRes);
        }).catch((err) => {
            res.status(500).send("error");
        });
});
app.get("/api/geo/vehicles", (req, res) => {
    if (!isNaN(req.query.left) && !isNaN(req.query.left) && !isNaN(req.query.left) && !isNaN(req.query.left)) {
        str.getVehicles(req.query.left,
            req.query.right,
            req.query.top,
            req.query.bottom)
            .then((dataRes) => {
                res.json({ vehicles: dataRes });
            }).catch((err) => {
                res.status(500)
                    .send("error");
            });
    } else {
        trapezeApi.getVehicleLocations()
            .then((dataRes) => {
                res.json(dataRes);
            }).catch((err) => {
                res.status(500)
                    .send("error");
            });
    }
});

app.get("/api/trip/:id/passages", (req, res) => {
    Promise.all([trapezeApi.getTripPassages(req.params.id, req.query.mode), str.getVehicleByTripId(req.params.id)])
        .then((result) => {/*
            const resp = {
                passages: result[0],
                location: result[1],
                tripId: req.params.id
            }*/
            const resp: any = result[0];
            resp.location = result[1];
            resp.tripId = req.params.id;
            res.json(resp);
        })
        .catch((err) => {
            if (err == null) {
                res.status(404).send("not found");
            } else {
                res.status(500).send("err");
            }
        });
});

app.get("/api/vehicle/:id/route", (req, res) => {
    trapezeApi.getRouteByVehicleId(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send("err");
        });
});
app.get("/api/trip/:id/route", (req, res) => {
    trapezeApi.getRouteByTripId(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send("err");
        });
});
app.get("/api/stop/:id/departures", (req, res) => {
    trapezeApi.getStopPassages(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send("err");
        });
});
app.get("/api/stop/:id/info", (req, res) => {
    trapezeApi.getStopInfo(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send("err");
        });
});
app.get("/api/stopPoint/:id/info", (req, res) => {
    trapezeApi.getStopPointInfo(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send("err");
        });
});
app.get("/api/geo/vehicle/:id", (req, res) => {
    str.getVehicle(req.params.id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            if (err == null) {
                res.status(404).send("not found");
            } else {
                res.status(500).send("err");
            }
        });
});
// app.use(express.static(__dirname + '/app/index.html'));
app.use(express.static(__dirname + "/../app"));
app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/../app/index.html");
});
module.exports = app;
