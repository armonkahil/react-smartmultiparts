import React, { useState } from "react";
import FormFields from "../FormFields/FormFields";

import "../Form.css";

export const FormTwo = (props) => {
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");

  //function to render correct form component for file type
  const detectFile = () => {
    if (fileType === "") return "";

    const ext = fileType[0].name ? fileType[0].name.split(".")[1].toLowerCase() : "";

    const re = new RegExp(Object.keys(props.fileTypes).join("|"), "gi");

    if (!ext) return "Invalid Extention";

    if (re.test(ext) === true) {
      return <FormFields fields={props.fileTypes[ext]}/>;
    }

    else setFileType("INVALID");

    return "File type not supported.";
  };

  const upload = (e) => {
    const ext = fileType[0].name ? fileType[0].name.split(".")[1].toLowerCase() : "";
    e.preventDefault();
    const data = new FormData();
    data.append('file', fileType[0]);
    const fieldArr = props.fileTypes[ext];

    for(let i = 0; i < fieldArr.length; i++){
      data.append(fieldArr[i], e.target[fieldArr[i]].value);
    };

    props.cb(data);
  };

  const handleFile = (file) => {
    if (file[0] === undefined || file[0] === null) {
      return null;
    } else return file;
  };

  return (
    <>
      <div className="container">
          <p>
            Select your file, fill out the form and submit.
            <br />
            Supported File Types: {Object.keys(props.fileTypes).map(x => {
              return `.${x}`
            }).join(" ")}
          </p>

          <form
            onSubmit={(e) => upload(e)}
            className="entry-form"
            encType="multipart/form-data"
            method="post"
            name="upload"
          >
            <label htmlFor="file">Upload a file</label>
            <input
              id="file"
              type="file"
              name="upload"
              onChange={(e) => {
                let file = handleFile(e.target.files);

                if (file === null) {
                  return false;
                } else setFileType(file);
                setFileName(file[0].name);
              }}
            />
            <br />
            {detectFile()}
            <input id="submit" type="submit" className="button" />
            
          </form>
          <br />
      </div>
    </>
  );
};

