import React from 'react'
import Styles from "./Landing.module.css";
import bottommap from "../../assets/images/background.svg"
import logo from "../../assets/icons/logo.svg"
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const subheading = "Explore the city, one collectible at a time ;)";
  const getStarted = "Get Started -->";
  const navigate = useNavigate()
  return (
    <main className='main'>
      <div className={Styles.maincontent}>
        <img src={logo} alt="" />
        <h1 className={Styles.heading}>TOURIZZ</h1>
        <p>{subheading}</p>
        <p className={Styles.interGetStarted} onClick={()=>navigate('/login')}>{getStarted}</p>
      </div>
      <div>
        <img src={bottommap} className={Styles.bottommap} alt="" />
      </div>
    </main>
  )
}

export default Landing