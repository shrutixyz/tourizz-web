import React from 'react'
import Styles from "./ProfileIcon.module.css";
import { useNavigate } from 'react-router-dom';

const ProfileIcon = () => {
  const navigate = useNavigate()
  return (
    <div className={Styles.profileIcon} onClick={()=>navigate('/profile')}>

    </div>
  )
}

export default ProfileIcon