import React from 'react'
import Layout from '../layout/Layout'
import Chat from '../screens/Chat/Chat'
import CommunityLanding from './Chat/CommunityLanding'

function Community() {
  return (
    <Layout>
        <CommunityLanding/>
        <Chat/>
    </Layout>
  )
}

export default Community