import Styles from "./Collectbiles.module.css"
import logo from "../../assets/icons/logo.svg"
import ImageGenerator from "../../components/ImageGenerator/ImageGenerator"
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit"
import { useEffect, useState } from "react"

const Collectibles = () =>{
    const account = useCurrentAccount();
    const [collectibles, setCollectibles] = useState([])


  const { data, isLoading, error } = useSuiClientQuery("getOwnedObjects", {
    owner: window.location.href.split("=")[1],
    showContent: true,
    showOwner: true,
  });

  useEffect(()=> {
    console.log(data?.data)
    if (data) {
        setCollectibles(data?.data.length==null?[]:data?.data)
    }
  }, [data])

  useEffect(()=>{
    if(account){
        // setAddress(account.address);
    }
    
  }, [account])

    return <>
            <main>
    <div className={Styles.header}>
        <img src={logo} className='logoheader' alt="" />
        <p>COLLECTIBLES</p>
    </div>

    <div className={Styles.collectibles}>
    <p>
        Your Collectibles
    </p>
    {collectibles.map((item, index) => (
         <div>
            <ImageGenerator/>
            <p style={{"fontSize": "0.9rem"}}> {item?.data?.objectId}</p>
         </div>
        ))}
    </div>
</main>
    </>
}

export default Collectibles;