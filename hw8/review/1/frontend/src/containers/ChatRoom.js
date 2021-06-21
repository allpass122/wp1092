import '../App.css'
import { useState } from 'react'
import { Tabs, Input, message, Tag } from 'antd'
import ChatModal from '../components/ChatModal';
import ChatBox from '../components/ChatBox'
import useChatBox from '../hooks/useChatBox'
import useChat from '../hooks/useChat'

import {
    MSG_QUERY,
    CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION,
    MSG_SUBSCRIPTION,
} from '../graphql';
import { useQuery, useMutation } from '@apollo/react-hooks';

 const {TabPane} = Tabs;
 

 const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s
      const content = {
        content: msg,
        duration: 0.5
      }

      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'info':
          message.info(content)
          break
        case 'danger':
        default:
          message.error(content)
          break
      }
    }
}

 const ChatRoom = ({me}) => {
    const {chatBoxes, setChatBoxes, createChatBox, removeChatBox} = useChatBox()
    const {status, opened, messages, logs, sendMessage, setMessages, setLogs, clearMessages } = useChat({me})
    
    const [messageInput, setMessageInput] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const [activeKey, setActiveKey] = useState("")

    const makeName = (name, to) => {
        return [name, to].sort().join('_');
    };

    const handleChangeTab = ((key) => {
        console.log(key)
        let to
        if(key.split("_")[0] === me)
        {
            to = key.split("_")[1]
        }
        else
        {
            to = key.split("_")[0]
        }
        sendMessage("CHANGE", {name : me, to : to})
    })

    const addChatBox = () => {setModalVisible(true)}

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION)

     return(
         <>
            <div><h1>{me}'s Chat Room</h1></div>
            <div className="App-messages">
                <Tabs 
                    type="editable-card"
                    activeKey={activeKey}
                    onEdit={(targetKey, action) => {
                        if(action === "add")
                        {
                            addChatBox()
                        }
                        else if(action === 'remove')
                        {
                            removeChatBox(targetKey, activeKey, setActiveKey)
                        }
                    }}
                    onChange={(key) => {
                        setActiveKey(key)
                        handleChangeTab(key)
                    }}
                >
                    {chatBoxes.map(({friend, key, chatLog}) => {
                        if(logs[makeName(friend, me)])
                        {
                            return (
                                <TabPane 
                                    tab={friend}
                                    key={key}
                                    closable={true}
                                >
                                    <p>{friend}'s chatbox</p>
                                    {  
                                        logs[makeName(friend, me)].map(({ name, body }, i) => (
                                            (name === me) ? 
                                            <p className="App-message" key={i} align="right" style={{display : "flex", flexDirection : "row-reverse", justifyContent : "flex-start"}}>
                                                <Tag color="blue" style={{height : "25px"}}>{name}</Tag> <p style={{wordWrap : "break-word", maxWidth : "200px", marginRight : "10px"}}>{body} </p>
                                            </p> :
                                            <p className="App-message" key={i} align="left" style={{display : "flex", flexDirection : "row", justifyContent : "flex-start"}}>
                                            <Tag color="grey" style={{height : "25px"}}>{name}</Tag> <p style={{wordWrap : "break-word", maxWidth : "200px"}}>{body} </p>
                                            </p>
                                            
                                        ))
                                    }
                                </TabPane>
                            )
                        }
                        else
                        {
                            return (
                                <TabPane 
                                    tab={friend}
                                    key={key}
                                    closable={true}
                                >
                                    <p>{friend}'s chatbox</p>
                                </TabPane>
                            )
                        }
                        })
                    }
                    <ChatModal
                        visible={modalVisible}
                        onCreate={async ({name}) => {
                            await startChat({
                                variables: {
                                    name1: me,
                                    name2: name,
                                }
                            })
                            setModalVisible(false)

                        }}
                        onCancel={() => {
                            setModalVisible(false)
                        }}
                    >
                    </ChatModal>
                </Tabs>
            </div>
            <Input.Search
            value={messageInput}
            enterButton="Send"
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Enter message here..."
            onSearch={(msg) => {
                if(!msg)
                {
                    displayStatus({
                        type : "error",
                        msg : "Please enter message.",
                    })
                }
                else if(activeKey === "")
                {
                    displayStatus({
                        type : "error",
                        msg  : "Please add a chatbox first.",
                    })
                    setMessageInput("")
                    return
                }
                let toPerson = ""
                if(activeKey.split("_")[0] === me)
                {
                    toPerson = activeKey.split("_")[1]
                }
                else
                {
                    toPerson = activeKey.split("_")[0]
                }
                sendMessage("MESSAGE", {name : me, to : toPerson, body : msg})
                setMessageInput("")
            }}
            >
            </Input.Search>
         </>
     )
 }

 export default ChatRoom;