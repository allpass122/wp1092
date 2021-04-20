export default function Grid(props) {
  //let grid_id = `grid-0-0`;
  //let value_id = `value-0-0`;
  let temp_class_name = `grid level-${props.content}`;
  //console.log(temp_class_name);
  let grid_id = `grid-${props.r}-${props.c}`;
  let value_id = `value-${props.r}-${props.c}`;
  const mapping = {
    "": "",
    2: "NCTU",
    4: "NYMU",
    8: "NTU",
    16: "UCSD",
    32: "UBC",
    64: "CUHK",
    128: "UCLA",
    256: "NYU",
    512: "UCB",
    1024: "HKUST",
    2048: "UTokyo",
    4096: "Columbia",
    8192: "Yale",
    16384: "Cambridge",
    32768: "Stanford",
    65536: "MIT",
  };
  // #########################
  // # 1 #2 Modify everything here (including the above one) yourself

  // #########################
  //
  return (
    <td>
      <div
        className={props.content === 0 ? "grid" : temp_class_name}
        id={grid_id}
      >
        <div className="school-name" id={value_id}>
          {props.content === 0 ? "" : mapping[props.content]}
        </div>
      </div>
    </td>
  );
}
