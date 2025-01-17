import React, { useState } from 'react'
import chatIcon from '../assets/chat.svg'
import statusIcon from '../assets/status.svg'
import channelIcon from '../assets/channel.svg'
import communitiesIcon from '../assets/communities.svg'
import settingIcon from '../assets/setting.svg'
import userIcon from '../assets/userImg.jpg'
import toolIcon from '../assets/tool.svg'
import adInFacebookIcon from '../assets/adInFacebook.svg'
import './Sidebar.css'

const SideBar = () => {
  
  const [current, setCurrent] = useState("chat");
  
  return (
    
    <div className='sideBarDiv'>

        <div className="firstSideBar">

          <div className="firstSideBarFirst">

            <div className="sideLink" onClick={()=>setCurrent("chat")}>
              <div className={`${current==="chat"?"activeIconSideLinkCircle":""} iconSideLinkCircle`}>
                <img src={chatIcon} alt="ChatIcon" />
              </div>
              <div className="hiddenLabel">Chat</div>
            </div>

            <div className="sideLink" onClick={()=>setCurrent("status")}>
              <div className={`${current==="status"?"activeIconSideLinkCircle":""} iconSideLinkCircle`}>
                <img src={statusIcon} alt="statusIcon" />
              </div>
              <div className="hiddenLabel">Status</div>
            </div>

            <div className="sideLink" onClick={()=>setCurrent("channel")}>
            <div className={`${current==="channel"?"activeIconSideLinkCircle":""} iconSideLinkCircle`}>
                <img src={channelIcon} alt="channelIcon" />
              </div>
              <div className="hiddenLabel">Channel</div>
            </div>

            <div className="sideLink" onClick={()=>setCurrent("communities")}>
            <div className={`${current==="communities"?"activeIconSideLinkCircle":""} iconSideLinkCircle`}>
                <img src={communitiesIcon} alt="CommunitiesIcon" />
              </div>
              <div className="hiddenLabel">Communities</div>
            </div>

          </div>

          <div className="firstSideBarSecond">

            <div className="sideLink" onClick={()=>setCurrent("tools")}>
              <div className={`${current==="tools"?"activeIconSideLinkCircle":""} iconSideLinkCircle`}>
                <img src={toolIcon} alt="ToolIcon" />
              </div>
              <div className="hiddenLabel">Tools</div>
            </div>

            <div className="sideLink" onClick={()=>setCurrent("adInFacebook")}>
            <div className={`${current==="adInFacebook"?"activeIconSideLinkCircle":""} iconSideLinkCircle`}>
                  <img src={adInFacebookIcon} alt="AdInFacebookIcon" />
                </div>
                <div className="hiddenLabel">Advertise on Facebook</div>
            </div>

          </div>

        </div>

        <div className="secondSideBar">

          <div className="sideLink" onClick={()=>setCurrent("setting")}>
          <div className={`${current==="setting"?"activeIconSideLinkCircle":""} iconSideLinkCircle`}>
                <img src={settingIcon} alt="settingIcon" />
              </div>
            <div className="hiddenLabel">Setting</div>
          </div>

          <div className="sideLink" onClick={()=>setCurrent("user")}>
          <div className={`${current==="user"?"activeIconSideLinkCircle":""} iconSideLinkCircle`}>
                <img className='userImg' src={userIcon} alt="userIcon" />
              </div>
            <div className="hiddenLabel">Profile</div>
          </div>

        </div>

    </div>
  )
}

export default SideBar