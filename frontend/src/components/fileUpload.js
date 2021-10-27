import React, { useState } from "react";
import "./../../static/css/fileUpload.css";
const fileUpload = () => {
  const [file, setFile] = useState(null);
  const onChangeHandler = (event) => {
    setFile({ selectedFile: event.target.files[0], loaded: 0 }),
      console.log(event.target.files[0], file);
  };
  return (
    <div className="wrapper">
      <div className="file__upload">
        <div className="header">
          <p>
            <i className="fa fa-cloud-upload"></i>
            <span>upload File</span>
          </p>
        </div>
        <form className="body">
          <input type="file" id="upload" onChange={onChangeHandler} />
          <label for="upload">
            <i className="fa fa-file-text-o"></i>
            <p>
              <strong>Durchsuchen </strong>
                
            </p>
          </label>
        </form>
      </div>
    </div>
  );
};
export default fileUpload;
