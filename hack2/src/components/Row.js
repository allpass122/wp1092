import Grid from "../components/Grid";
import React, { Component } from "react";
function Row(props) {
  return (
    <>
      <tr>
        {props.rows.map((c, c_idx) => (
          <Grid r={props.r_idx} c={c_idx} content={c} />
        ))}
      </tr>
    </>
  );
}
export default Row;
