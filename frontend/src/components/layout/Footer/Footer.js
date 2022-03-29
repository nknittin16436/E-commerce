import React from 'react'
import playStore from '../../../images/playstore.png'
import appStore from '../../../images/Appstore.png'
import './Footer.css'

const Footer = () => {
    return (
    <footer id='footer'>
        <div className="leftFooter">
            <h4>Download our App</h4>
            <p>Download our app for Android and IOS mobile phone</p>
            <img src={playStore} alt="playStore icon" />
            <img src={appStore} alt="appStore icon" />
        </div>

        <div className="midFooter">
            <h1>Maya Grocery Store</h1>
            <p>High quality is our priority</p>
            <p>copyright 2021 &copy; maya grocery store</p>
        </div>

        <div className="rightFooter">
            <h4>Follow Us </h4>
            <a href="https://www.google.com">Instagram</a>
            <a href="https://www.google.com">FaceBook</a>
            <a href="https://www.google.com">Linkedin</a>
        </div>
    </footer>
  );
}

export default Footer