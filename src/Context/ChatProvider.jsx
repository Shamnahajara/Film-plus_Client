import { createContext ,useContext, useState, useEffect} from "react";
import { useSelector } from "react-redux";
import  axiosInstance   from "../api/axios";
const ChatContext = createContext();

const ChatProvider = ({children})=>{
    const {userId} = useSelector((state)=>state.User);
    const [selectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState();
    useEffect(()=>{
        axiosInstance.get(`/user//allusers/${userId}`).then((res)=>{
            setUser(res?.data?.user);
        }).catch((err)=>{
            console.log("userInfo",err)
        })
    },[]);

    <ChatContext.Provider value={{selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,}}>
        {children}
    </ChatContext.Provider>
};

export const ChatState = () =>{
    return useContext(ChatContext)
}

export default ChatProvider;