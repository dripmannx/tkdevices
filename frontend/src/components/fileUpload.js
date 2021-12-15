import React, { useState } from "react";
import "./../../static/css/fileUpload.css";
//Component not in use
import useAxios from "../utils/useAxios";

const fileUpload = () => {
  const url = "api/files";
const api = useAxios()
  const [file, setFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const onChangeHandler = (event) => {
    setFile(event.target.files[0])
    setIsFilePicked(true);
    console.log(event.target.files[0]);
    console.log("hi", file);
  };
  const onClickHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    console.log(file, data);
    /*
    const { loading, error, value } = useFetch(url, {
      method: "POST",
      headers: {
        Authorization: `Token ${(localStorage.getItem("token"))}`,
      },
    },[data]);
    */
    api.post(url,data)
    .then(res => {
      if(res.status === 200){
        console.log(res.data)
      }
    })};
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
          {isFilePicked ? (
            <>
              <div>
                <p>Filename: {file.name}</p>
                <p>Filetype: {file.type}</p>
                <p>Size in bytes: {file.size}</p>
                <p>
                  lastModifiedDate: {file.lastModifiedDate.toLocaleDateString()}
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-grey-600 Button-submit"
                onClick={() => {
                  onClickHandler();
                }}
              >
                Upload
              </button>
            </>
          ) : (
            <>
              {" "}
              <input type="file" id="upload" onChange={onChangeHandler} />
              <label htmlFor="upload">
                <i className="fa fa-file-text-o"></i>
                <p>
                  <strong>Durchsuchen </strong>
                </p>
              </label>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
export default fileUpload;
