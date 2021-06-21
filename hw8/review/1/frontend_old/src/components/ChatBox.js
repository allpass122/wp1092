import { useState } from 'react'

const client = new WebSocket('ws://localhost:8080')

const useChat = ({me}) => {
  const [messages, setMessages] = useState([])
  const [logs, setLogs] = useState({})
  const [status, setStatus] = useState({})
  const [opened, setOpened] = useState(false)

  const makeName = (name, to) => {
    return [name, to].sort().join('_');
  };

  client.addEventListener("open", () => {
      console.log("Connected")
  })

  client.onmessage = (message) => {
    const receivedData = JSON.parse(message.data)
    const type = receivedData["type"]
    console.log(type)

    console.log("Received data", receivedData)

    switch (type) {
      case 'CHAT': {
        setMessages(receivedData["data"]["messages"])
        let copiedLog = JSON.parse(JSON.stringify(logs));
        let pair = makeName(receivedData["to"], me)
        copiedLog[pair] = receivedData["data"]["messages"]
        setLogs(copiedLog)
        break
      }
      case 'MESSAGE': {
        setMessages([...messages, receivedData["data"]["message"]])
        let copiedLog = JSON.parse(JSON.stringify(logs));
        let pair = makeName(receivedData["data"]["message"]["name"], receivedData["to"])
        copiedLog[pair].push(receivedData["data"]["message"])
        setLogs(copiedLog)
        console.log("logs set", copiedLog)
        break
      }
      default:
        break
    }
  }

  client.onopen = () => {
    setOpened(true)
  }

  const sendData = (data) => {
    // TODO
    client.send(JSON.stringify(data))
  }

  const sendMessage = (type, msg) => {
    // TODO
    sendData({type : type, data : msg})
  }

  const clearMessages = () => {
    // TODO
    sendData(['clear', ''])
  }

  return {
    status,
    opened,
    messages,
    logs,
    sendMessage,
    setMessages,
    setLogs,
    clearMessages
  }
}

export default ChatBox

