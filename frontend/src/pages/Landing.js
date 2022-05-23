import React, { useState, useEffect, useContext } from "react";
import "../../static/css/Landing.css";
import IPhoneInfo from "../components/IPhoneInfo"
import x from "../../static/img/iphone-x-later-put-device-into-recovery-mode-animation.gif";
import six from "../../static/img/iphone6-put-device-into-recovery-mode.png";
import seven from "../../static/img/iphone7-put-device-into-recovery-mode.png";




const HomePage = () => {
    const arr = [
    {
        id:0,
        headline: "iPhone X", 
        text:
          "Phone 8 oder neuer, einschließlich iPhone SE (2. Generation): Drücke die Lauter-Taste, und lasse sie sofort wieder los. Drücke die Leiser-Taste, und lasse sie sofort wieder los. Halte anschließend die Seitentaste gedrückt, bis der Bildschirm des Wiederherstellungsmodus angezeigt wird.",
        image: x
      
    },
    {
        id: 1,
        headline: "iPhone 7", 
        text:
          'iPhone 7, iPhone 7 Plus und iPod touch (7. Generation): Halte die Seitentaste oder die obere Taste und die Taste "Leiser" gleichzeitig gedrückt. Halte sie weiterhin gedrückt, bis der Bildschirm des Wiederherstellungsmodus angezeigt wird.',
        image: seven
    
    },
    {
        id:2,
        headline: "iPhone 6", 
        text:
          'iPhone 6s oder älter, einschließlich iPhone SE (1. Generation), und iPod touch (6. Generation) oder älter: Halte die Home-Taste und die obere Taste (oder Seitentaste) gleichzeitig gedrückt. Halte sie weiterhin gedrückt, bis der Bildschirm des Wiederherstellungsmodus angezeigt wird',
        image: six
      
    }
  ]

  const [phone, setPhone] = useState(0);
  return (
    <div>
      <h1 className="title text-center text-5xl">Wiederherstellungsmodus</h1>
      <nav className="menu ">


        <div className="menu-links">
          <ul>

            <li className={phone === 0 ? "border-green-700" : "border-none"} onClick={() => setPhone(0)}>
              <a className={phone === 0 ? "text-green-700" : "text-white"}>iPhone X</a>
            </li>

            <li className={phone === 1 ? "border-green-700" : "border-none"} onClick={() => setPhone(1)}>
              <a className={phone === 1 ? "text-green-700" : "text-white"} >iPhone 7</a>
            </li>

            <li className={phone === 2 ? "border-green-700" : "border-none"} onClick={() => setPhone(2)} >
              <a className={phone === 2 ? "text-green-700" : "text-white"}>iPhone 6</a>
            </li>



          </ul>
        </div>
      </nav>

      <div className="container">

        <div className="i">
          <img className="img my-2 float-right" src={arr[phone].image} alt="iphone 6" />
          <div className="textContainer">
            <h1 className="pb-2 text-2xl">{arr[phone].headline}</h1>
            <p>{arr[phone].text}</p>
          </div>
        </div>


      </div>
    </div>
  );
};
export default HomePage;