import React from "react";

function Station(props) {
  const data = props.data;
  let mmm = { G: "green", R: "red", O: "orange", B: "biue" };
  let classname1 = `station-rectangle ${mmm[data["station_id"][0]]}`;
  let classname2 = `line ${mmm[data["station_id"][0]]}`;
  return (
    <div className="station-line-container">
      <div id={`s-${data["station_id"]}`} className="station-and-name">
        {" "}
        {/* you should add both id and onClick to attributes */}
        <div className={classname1}> {data["station_id"]} </div>
        <div className="station-name"> {data["station_name"]} </div>
      </div>
      <div id={`l-${data["station_id"]}`} className={classname2}></div>{" "}
      {/* you should add both id to attributes */}
    </div>
  );
}

export default Station;
