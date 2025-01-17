import React, { useState } from 'react'
import SideBar from '../src/Components/SideBar.jsx'
import ContactBox from '../src/Components/ContactBox.jsx'
import ChatBox from '../src/Components/ChatBox.jsx'

const App = () => {

  const [activeUser, setActiveUser] = useState(null);

  return (
    <>
      <SideBar />
      <ContactBox setActiveUser={setActiveUser} />
      <ChatBox activeUser={activeUser} />
    </>
  )
}

export default App