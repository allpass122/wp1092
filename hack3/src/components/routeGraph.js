import React from "react";
import Station from "./station";

function RouteGraph(props) {
  const data = props.route_data;
  console.log(`dsd ${typeof data}`);
  console.log(data);
  return (
    <div className="route-graph-container">
      {
        // generate many stations
        // use <Station /> with your own customized parameters
        // coding here ...
        data.map((m) => (
          //console.log(m);
          <Station data={m} />
        ))
      }
    </div>
  );
}

export default RouteGraph;
