import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4000/api/guess" });

const startGame = async () => {
  const resp = await instance.post("/start").catch((error) => {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log("A");
      console.log(error.request);
      alert(`Server is dead :(( `);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("B");
      console.log("Error", error.message);
      alert(
        `Something happened in setting up the request that triggered an Error`
      );
    }
    return;
  });
  return resp === undefined ? undefined : resp.data.msg;
};
// error handling: https://stackoverflow.com/questions/49967779/axios-handling-errors
const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  const resp = await instance
    .get("/guess", { params: { number } })
    .catch((error) => {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(`Error: ${number} is not a valid number (1 - 100)`);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("A");
        console.log(error.request);
        alert(`Server is dead :(( `);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("B");
        console.log("Error", error.message);
        alert(
          `Something happened in setting up the request that triggered an Error`
        );
      }
      return;
    });
  //console.log(resp);
  if (resp !== undefined && resp.status === 200) {
    console.log(resp);
    //console.log(`mmsg:${resp.data.msg} ${resp.data.msg2}`);
  }
  return resp;
};

const restart = async () => {
  const {
    data: { msg },
  } = await instance.post("/restart");

  return msg;
};

export { startGame, guess, restart };
