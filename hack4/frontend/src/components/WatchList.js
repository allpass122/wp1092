import constants from "../constants";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY } from "../graphql";

// Look at this file and see how the watchList is strucutred
const Help = (props) => {
  const { counts, idx, keyword } = props;
  const { loading, error, data, subscribeToMore } = useQuery(QUERY, {
    variables: {
      severity: 1,
      locationKeywords: keyword,
    },
  });
  //   console.log(data);
  return (
    <td id={`count-${idx}`}>
      {data == undefined ? null : data.persons.length}
    </td>
  );
};
export default function WatchList() {
  var counts = null;
  // TODO
  // query countStats

  //   const { loading, error, data, subscribeToMore } = useQuery(QUERY, {
  //     variables: {
  //       severity: 0,
  //       locationKeywords: "臺北市",
  //     },
  //   });
  // save the result in a counts variable

  //   console.log(data.persons);
  //   counts = data.persons.length;

  // TODO
  // use subscription

  // DO NOT MODIFY BELOW THIS LINE
  return (
    <table>
      <tbody>
        <tr>
          <th>Keyword</th>
          <th>Count</th>
        </tr>
        {constants.watchList.map((keyword, idx) => (
          <tr key={keyword}>
            <td>{keyword}</td>
            {/* You might need to see this */}
            <Help idx={idx} counts={counts} keyword={keyword} />
            {/* <td id={`count-${idx}`}>
              {!counts || !counts.statsCount || counts.statsCount[idx]}
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
