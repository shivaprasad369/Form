import { useState } from "react";
import useInput from "../hooks/use-input";
import View from "./View";
import axios from 'axios'
axios.defaults.baseURL="http://localhost:8080/"
const EditingForm = ({data}) => {
   
    const [cancel, setCancel] = useState(false)
  const {
    value: enterName,
    hasError: enteredNameIsInvalid,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameInputChangeHandler,
    valueBlurHandler: nameInputBlurHandler,
    reset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    hasError: enteredEmailIsInvalid,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailInputChangeHandler,
    valueBlurHandler: emailInputBlurHandler,
    reset: emailReset,
  } = useInput((value) => value.includes("@"));

  const [enteredFormIsValid, setEnteredFormIsValid] = useState(false);
  let formIsValid = false;
  if (enteredNameIsValid) {
    formIsValid = true;
  }
const cancelHandler=()=>{
    setCancel(cancel=>!cancel)
}

  const formSubmitHandler = async (event) => {
    const id=data.id
    event.preventDefault();
    console.log(enterName);

    if (!enteredNameIsValid) {
      return;
    }
    const response = await axios.patch('/update/'+id,{name:enterName,Email:enteredEmail})
  
    console.log(response.json);
    reset();
    emailReset();
  };

  const enteredName = enteredNameIsInvalid
    ? "form-control invalid"
    : "form-control";
  const enteredEmailClasses = enteredEmailIsInvalid
    ? "form-control invalid"
    : "form-control";
  return (
    <>
       {cancel ? <View/> :<form onSubmit={formSubmitHandler}>
      <div className={enteredName}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
         
          defaultValue={data.name}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
      </div>
      {enteredNameIsInvalid && <p className="error-text">Eneter valid name</p>}

      <div className={enteredEmailClasses}>
        <label htmlFor="email">E-Mail</label>
        <input
          type="text"
          id="email"
          defaultValue={data.Email}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
      </div>
      {enteredEmailIsInvalid && (
        <p className="error-text">Eneter valid email</p>
      )}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
        <button onClick={cancelHandler}>Cancel</button>
      </div>
    </form>}
    </>

  );
};

export default EditingForm;
//  const data =async(req)=>{
// const response= await axios.put('/')
// return response
// }