import React from "react";

//Add support for more input elements

function FormFields(props) {
  const renderFields = () => {
    return (
      <>
        {props.fields.map((field, index) => {
          if (field.match(/comments/gi)) {
            return (
              <>
                <label htmlFor='comments'>Comments:</label>
                <textarea
                  name="comments"
                  className="comments"
                  placeholder="Additional Comments"
                  key={"textarea-" + index.toString()}
                />
              </>
            );
          } else if(field.match(/filename/gi)){
            return `Filename: ${props.filename}`
          } else {
            return (
              <React.Fragment key={index}>
                <label htmlFor={field}>{field}:</label>
                <input type="text" name={field} id={field} />
              </React.Fragment>
            );
          }
        })}
      </>
    );
  };
  return <>{renderFields()}</>;
}

export default FormFields;