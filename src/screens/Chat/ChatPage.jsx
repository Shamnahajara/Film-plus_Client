import  {useState} from 'react'
import {Box} from "@chakra-ui/layout"
import { ChatState } from '../../Context/ChatProvider'
import SideDrawer from '../../components/chat_components/SideDrawer'
import MyChats from '../../components/chat_components/MyChats'
import ChatBox from '../../components/chat_components/ChatBox'


function ChatPage() {
  const [fetchAgain , setFetchAgain] = useState(false); 
  const {user} =  ChatState()
  return (
    <div style={{width:"100%"}}>
         <SideDrawer/>
        <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
          {user && <MyChats/>}
          {user && <ChatBox/>}
          hello
        </Box>
    </div>
  )
}

export default ChatPage
