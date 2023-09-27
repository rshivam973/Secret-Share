import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navi from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { AuthContext } from '../../Context/AuthContext';

const Settings = () => {

    const {isLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const user = localStorage.getItem("user");


    useEffect(()=>{

        if(!user) navigate('/login'); 

    },[user]);

  return (
    <div>
        <Navi/>
        <div style={{display:"flex",flexDirection:"column",height:"80vh"}}>
            Settings
        </div>
        
        <Footer/>
    </div>
  )
}

export default Settings;