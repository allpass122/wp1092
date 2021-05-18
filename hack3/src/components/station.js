import React from "react";
import StationInfo from "./stationInfo";

function Station(props) {
  const data = props.data;
  const judge = () => {
    if (data["distance_to_next"] === -1 || data["station_order"] === 1) {
      return true;
    }
  };
  let mmm = { G: "green", R: "red", O: "orange", B: "biue" };
  let classname1 = `station-rectangle ${mmm[data["station_id"][0]]}${
    judge() ? " end" : ""
  }`;
  let classname2 = `line ${mmm[data["station_id"][0]]}`;

  const CC = () => {
    props.click(
      data["station_name"],
      data["address"],
      data["service_counter"],
      data["enable_bicycle"]
    );
  };
  return (
    <div className="station-line-container">
      <div
        id={`s-${data["station_id"]}`}
        className="station-and-name"
        onClick={CC}
      >
        {/* you should add both id and onClick to attributes */}

        <div className={classname1}> {data["station_id"]} </div>
        <div className="station-name"> {data["station_name"]} </div>
      </div>
      <div
        id={`l-${data["station_id"]}`}
        className={classname2}
        style={{ display: data["distance_to_next"] === -1 ? "none" : "block" }}
      ></div>{" "}
      {/* you should add both id to attributes */}
    </div>
  );
}

export default Station;
