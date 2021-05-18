import React from "react";

function StationInfo(props) {
  const labels = [
    { label: "車站名稱", value: props.A },
    { label: "車站位址", value: props.B },
    { label: "詢問處位置", value: props.C },
    { label: "自行車進出", value: props.D },
  ];

  return (
    <div className="station-info-container">
      <table className="station-info-table">
        <thead>
          <tr>
            <th colSpan="2">車站資訊</th>
          </tr>
        </thead>
        <tbody>
          {
            // generate multiple
            <tr>
              <td>{labels[0].label}</td>
              <td>{labels[0].value}</td>
            </tr>
            // coding here ...
          }
          {
            <tr>
              <td>{labels[1].label}</td>
              <td>{labels[1].value}</td>
            </tr>
          }
          {
            <tr>
              <td>{labels[2].label}</td>
              <td>{labels[2].value}</td>
            </tr>
          }
          {
            <tr>
              <td>{labels[3].label}</td>
              <td>{labels[3].value}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
}

export default StationInfo;
