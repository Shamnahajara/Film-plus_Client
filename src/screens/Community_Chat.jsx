import Layout from '../layout/Layout'
import ChatLayout from '../components/community_components/ChatLayout'
import ChatList from '../components/community_components/ChatList'
import Messages from '../components/community_components/Messages'
import ProfileInfo from '../components/community_components/ProfileInfo'

function Community_Chat() {
  return (
    <Layout>
      <ChatLayout>
        <div className=' flex-1 min-w-0 xl:flex'>
          <ChatList />
          <Messages />
          <ProfileInfo/>
        </div>
      </ChatLayout>
    </Layout>
  )
}

export default Community_Chat