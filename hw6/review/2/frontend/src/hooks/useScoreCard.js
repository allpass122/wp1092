import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  messages: [],

  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
});

const makeMessage = (message, color) => {
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const addCardMessage = (message) => {
    const msg = []
    msg.push(makeMessage(message, ADD_MESSAGE_COLOR))
    setMessages(messages=> msg)
  };

  const addRegularMessage = (...ms) => {
    const msg = ms.map((m) => makeMessage(JSON.stringify(m), REGULAR_MESSAGE_COLOR))
    setMessages(messages=>msg);
  };

  const addErrorMessage = (message) => {
    const msg = []
    msg.push(makeMessage(message, ERROR_MESSAGE_COLOR))
    setMessages(messages=>msg);
  };


  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
