import React,{useState} from 'react'
const fileUpload = () => {
    const[ file,setFile] =useState(null);
    const onChangeHandler = (event) => { setFile({selectedFile: event.target.files[0],
      loaded: 0}),
    console.log(event.target.files[0], file);}
    return (
      <div>
        <input type="file" name="file" onChange={onChangeHandler} />
      </div>
    );
}
export default fileUpload;