import React from 'react'
import Styles from "./Leaderboard.module.css";
import bottommap from "../../assets/images/background.svg"
import logo from "../../assets/icons/logo.svg"
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../../components/ProfileIcon/ProfileIcon';

const Leaderboard = () => {
  const subheading = "Explore the city, one collectible at a time ;)";
  const getStarted = "Get Started -->";
  const navigate = useNavigate()
  return (
    <main>
    <div className={Styles.header}>
        <img src={logo} className='logoheader' alt="" />
        <p>LEADERBOARD</p>
        <ProfileIcon/>
    </div>
    <div className={Styles.mainbody}>
        <p className={Styles.heading}>Login Using Zero Knowledge (ZK)</p>
        <p className={Styles.interGetStarted} onClick={()=>navigate('/explore')}>{"next -->"}</p>
    </div>
    <div>
    <img src={bottommap} className={Styles.bottommap} alt="" />
  </div>
</main>
  )
}

export default Leaderboard