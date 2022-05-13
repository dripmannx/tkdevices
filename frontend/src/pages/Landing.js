import React, { useState, useEffect, useContext } from "react";
import "../../static/css/Landing.css";
import IPhoneInfo from "../components/IPhoneInfo"






const HomePage = () => {
const [phone,setPhone] = useState(10);
console.log(phone)
  return (
    <div>
      <h1 className="title text-center text-5xl">Wiederherstellungsmodus</h1>
      <nav className="menu ">


        <div className="menu-links">
          <ul>

            <li className={phone===10?"border-green-800":"border-none"}onClick={()=>setPhone(10)}>
              <a className={phone===10?"text-green-800":"text-white"}>iPhone X</a>
            </li>

            <li className={phone===7?"border-green-800":"border-none"}onClick={()=>setPhone(7)}>
              <a className={phone===7?"text-green-800":"text-white"} >iPhone 7</a>
            </li>

            <li className={phone===6?"border-green-800":"border-none"}onClick={()=>setPhone(6)} >
              <a className={phone===6?"text-green-800":"text-white"}>iPhone 6</a>
            </li>



          </ul>
        </div>
      </nav>
      {phone === 6 && <IPhoneInfo model="6" />}
      {phone === 7 && <IPhoneInfo model="7" />}
      {phone === 10 && <IPhoneInfo model="10" />}
      
    </div>
  );
};
export default HomePage;