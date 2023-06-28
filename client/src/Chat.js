import React,{useState,useEffect} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({socket,username,room}) => {
    const [currentMessage,setCurrentMessage]=useState("");
    const [messageList,setMessageList]=useState([]);

    const sendMessage=async ()=>{
        if(currentMessage!=="" && room!=="" && username!==""){
            const messageData={
                room:room,
                author:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
            }
            setMessageList((list)=>[...list,messageData])
            setCurrentMessage("")
            await socket.emit("send_message",messageData);
        }
    }
    useEffect(() => {
        
        socket.on("receive_message",(data)=>{
            setMessageList((list)=>[...list,data])
            console.log(data);
            console.log(messageList);
        })
    }, [socket])
    
  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Live Chat Room {room} ({username})</p>
        </div>
        <div className='chat-body'>
        <ScrollToBottom className='message-container'>

            {messageList.map((message)=>{
                return(
                    <div className='message' id={username===message.author ?"you":"other"}>
                        <div>

                        <div className='message-content'>
<p>{message.message}</p>
                        </div>
                        <div className='message-meta'>
                            <p>{message.time}</p>
                            <p>{message.author}</p>
                        </div>
                        </div>
                    </div>
                )
            })}
            </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type="text" placeholder='hey' value={currentMessage} onChange={e=>setCurrentMessage(e.target.value)} onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}/>
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
  )
}

export default Chat