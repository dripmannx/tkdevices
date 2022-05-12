import React, { useState, useEffect, useContext } from "react";
import "../../static/css/Landing.css";

import { css } from "@emotion/react";
import x from "../../static/img/iphone-x-later-put-device-into-recovery-mode-animation.gif";
import six from "../../static/img/iphone6-put-device-into-recovery-mode.png";
import seven from "../../static/img/iphone7-put-device-into-recovery-mode.png";
const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
  z-index: 9999;
`;




const HomePage = () => {

  return (
    <div>
      <h1 className="title text-center text-5xl">Wiederherstellungsmodus</h1>

      <div className="container">



        <div className="i iphonex">
          <img className="img my-2 float-right" src={x} alt="iphone x" />
          <h1 className="text text-white text-center text-xl">iPhone X
          <p>iPhone 8 oder neuer, einschließlich iPhone SE (2. Generation): Drücke die Lauter-Taste, und lasse sie sofort wieder los. Drücke die Leiser-Taste, und lasse sie sofort wieder los. Halte anschließend die Seitentaste gedrückt, bis der Bildschirm des Wiederherstellungsmodus angezeigt wird.</p></h1>
        </div>
        
        <div className="i iphone7">

          <img className="img my-4" src={seven} alt="iphone 7" />
          <h1 className="text text-white text-center text-xl">iPhone 7
          <p>iPhone 7, iPhone 7 Plus und iPod touch (7. Generation): Halte die Seitentaste oder die obere Taste und die Taste "Leiser" gleichzeitig gedrückt. Halte sie weiterhin gedrückt, bis der Bildschirm des Wiederherstellungsmodus angezeigt wird.</p></h1>

        </div>
        <div className="i iphone6">

          <img className="img my-2 float-right" src={six} alt="iphone 6" />
          <h1 className="text text-white text-center text-xl ">iPhone 6
          <p>iPhone 6s oder älter, einschließlich iPhone SE (1. Generation), und iPod touch (6. Generation) oder älter: Halte die Home-Taste und die obere Taste (oder Seitentaste) gleichzeitig gedrückt. Halte sie weiterhin gedrückt, bis der Bildschirm des Wiederherstellungsmodus angezeigt wird.</p></h1>
        </div>
      </div>
    </div>
  );
};
export default HomePage;