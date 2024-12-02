import React from 'react'
import Styles from "./Leaderboard.module.css";
import bottommap from "../../assets/images/background.svg"
import logo from "../../assets/icons/logo.svg"
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../../components/ProfileIcon/ProfileIcon';

const Leaderboard = () => {

  const navigate = useNavigate()
  const addressData = [
    { address: "0x7eF4A9cDd5b3f6E2C8B4F2A7D6E9A3F1C7D2E3F8", collectibles: 94 },
    { address: "0x4B3D6F9C8A2E5D7F1A9C4E2B7F3A6D8F2C1E7B4", collectibles: 88 },
    { address: "0x3E7F2A9C8D6F1B4C5A2E8D3F9B7C6A4E7F2C1D5", collectibles: 76 },
    { address: "0x1A9C7D4F2B6E8F3A9C6D2B7E5F1A3C8F4E7B2D6", collectibles: 62 },
    { address: "0x9C6F1A3D7F4B2E5C8D3A9E7F2B6C1D4A3E8F7B5", collectibles: 55 },
    { address: "0xC8B6E4F7A3D9C1F5B2A6D8E9F3C7B4A2D1E5F2B", collectibles: 44 },
    { address: "0x2A7F3D6C9B1E8F5C4A9D7F2B6E1C3A4F8D2E7B9", collectibles: 38 },
    { address: "0xF1A6D3E9B7C4F2A5D9C8F3E1B2A4C7F6D8E3B5A", collectibles: 29 },
    { address: "0xB4C6D3A8F1E9F7B2A5C3D8F6E2B9A4D1C7F3E5A", collectibles: 17 },
    { address: "0xD1F5A9B7C4E8F2A6D9C3F7B2A4E1C8F6D3E7B5A", collectibles: 12 },
  ];

  const sortedData = addressData.sort((a, b) => b.collectibles - a.collectibles);

  return (
    <main>
    <div className={Styles.header}>
        <img src={logo} className='logoheader' alt="" />
        <p>LEADERBOARD</p>
    </div>
    <div className={Styles.mainbody}>
    <ol className={Styles.Leaderboard}>
        {sortedData.map((item, index) => (
          <li key={index}>{item.address} - {item.collectibles} collectibles
          </li>
        ))}
      </ol>
    </div>
</main>
  )
}

export default Leaderboard