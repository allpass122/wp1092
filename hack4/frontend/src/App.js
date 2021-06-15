import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Upload from "./containers/Upload";
import Stats from "./containers/Stats";
import Header from "./components/Header";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY } from "./graphql";

function App() {
  //   const { loading, error, data, subscribeToMore } = useQuery(QUERY, {
  //     variables: {
  //       severity: 0,
  //       locationKeywords: "臺北市",
  //     },
  //   });
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/">
            <Stats />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
