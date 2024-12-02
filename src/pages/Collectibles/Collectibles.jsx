import Styles from "./Collectbiles.module.css"
import logo from "../../assets/icons/logo.svg"
import ImageGenerator from "../../components/ImageGenerator/ImageGenerator"
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit"
import { useEffect, useState } from "react"

const Collectibles = () =>{
    const account = useCurrentAccount();
    const [collectibles, setCollectibles] = useState([])


      const [address, setAddress] = useState("")
  const { data, isLoading, error } = useSuiClientQuery("getOwnedObjects", {
    owner: address,
    showContent: true,
    showOwner: true,
  });

  useEffect(()=> {
    if (data) {
        setCollectibles(data.length==null?[]:data)
    }
  }, [data])

  useEffect(()=>{
    if(account){
        setAddress(account.address);
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
         <ImageGenerator/>
        ))}
    </div>
</main>
    </>
}

export default Collectibles;