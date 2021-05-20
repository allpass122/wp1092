import { GetStations, CalculateDistance } from "./station";

const wrap =
  (fn) =>
  (...args) =>
    fn(...args).catch(args[2]);

function routes(app) {
  // set proper api path and connect the path with wrap(function)
  // coding here ...
  app.get("/api/getStations", wrap(GetStations));
  app.get("/api/calculateDistance", wrap(CalculateDistance));
  // wrap(app.get("/api/getStations", GetStations));
  // wrap(app.get("/api/calculateDistance", CalculateDistance));
}

export default routes;
