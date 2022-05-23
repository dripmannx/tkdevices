import React from 'react'
import "../../static/css/iPhoneInfo.css";
import x from "../../static/img/iphone-x-later-put-device-into-recovery-mode-animation.gif";
import six from "../../static/img/iphone6-put-device-into-recovery-mode.png";
import seven from "../../static/img/iphone7-put-device-into-recovery-mode.png";
export  const arr = [
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
        headline: "iPhone X", 
        text:
          'iPhone 6s oder älter, einschließlich iPhone SE (1. Generation), und iPod touch (6. Generation) oder älter: Halte die Home-Taste und die obere Taste (oder Seitentaste) gleichzeitig gedrückt. Halte sie weiterhin gedrückt, bis der Bildschirm des Wiederherstellungsmodus angezeigt wird',
        image: six
      
    }
  ]
function IPhoneInfo({ model }) {
    const iphoneX = {
        headline: "iPhone X", text:
            "Phone 8 oder neuer, einschließlich iPhone SE (2. Generation): Drücke die Lauter-Taste, und lasse sie sofort wieder los. Drücke die Leiser-Taste, und lasse sie sofort wieder los. Halte anschließend die Seitentaste gedrückt, bis der Bildschirm des Wiederherstellungsmodus angezeigt wird."
    }
    const iphone7 = {
        headline: "iPhone 7", text:
            'iPhone 7, iPhone 7 Plus und iPod touch (7. Generation): Halte die Seitentaste oder die obere Taste und die Taste "Leiser" gleichzeitig gedrückt. Halte sie weiterhin gedrückt, bis der Bildschirm des Wiederherstellungsmodus angezeigt wird.'
    }
    const iphone6 = {
        headline: "iPhone X", text:
            'iPhone 6s oder älter, einschließlich iPhone SE (1. Generation), und iPod touch (6. Generation) oder älter: Halte die Home-Taste und die obere Taste (oder Seitentaste) gleichzeitig gedrückt. Halte sie weiterhin gedrückt, bis der Bildschirm des Wiederherstellungsmodus angezeigt wird'
    }


    return (
        <div>
            <div className="container">
                {model === "6" && (
                    <div className="i">
                        <img className="img my-2 float-right" src={six} alt="iphone 6" />
                        <div className="textContainer">
                        <h1  className="text-2xl">{iphone6.headline}</h1>
                        <p>{iphone6.text}</p>
                        </div>
                    </div>
                )}
                {model === "7" && (
                    <div className="i">
                        <img className="img my-2 float-right" src={seven} alt="iphone 7" />
                        <div className="textContainer">
                        <h1  className="text-2xl">{iphone7.headline}</h1>
                        <p>{iphone7.text}</p></div>
                        </div>
                )}
                {model === "10" && (
                    <div className="i">
                        <img className="img my-2 float-right" src={x} alt="iphone 10" />
                        <div className="textContainer">
                        <h1 className="text-2xl">{iphoneX.headline}</h1>
                        <p>{iphoneX.text}</p></div>
                        </div>
                )}
            </div>
        </div>
    );

}

export default IPhoneInfo;