import '../App.css'
import { Input, message} from 'antd'
import {UserOutlined} from "@ant-design/icons"

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

const SignIn = ({me, setMe, setSignedIn}) => (
    <>
        <div className="App-title"><h1>My Chat Room</h1></div>
        <Input.Search
            prefix={<UserOutlined />}
            value={me}
            enterButton="Sign In"
            onChange={(e) => setMe(e.target.value)}
            placeholder="Enter your name"
            size="large"
            style={{width : 300, margin : 50}}
            onSearch={(name) => {
                if(!name)
                {
                    displayStatus({
                        type : "error",
                        msg : "Missing user name",
                    })
                }
                else
                {
                    setSignedIn(true)
                }
            }}
        >
        </Input.Search>
    </>
)

export default SignIn;