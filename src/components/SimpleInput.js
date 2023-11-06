import { useState } from "react";
import useInput from "../hooks/use-input";
import axios from 'axios'
axios.defaults.baseURL="http://localhost:8080/"
const SimpleInput = (props) => {
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

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(enterName);

    if (!enteredNameIsValid) {
      return;
    }
    const response = await axios.post('/create',{name:enterName,Email:enteredEmail})
    if(response.data.success){
      alert("data stored successfully")
    }
    console.log(response);
    console.log(enterName);
    console.log(enteredEmail);
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
    <form onSubmit={formSubmitHandler}>
      <div className={enteredName}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enterName}
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
          value={enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
      </div>
      {enteredEmailIsInvalid && (
        <p className="error-text">Eneter valid email</p>
      )}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
//  const data =async(req)=>{
// const response= await axios.put('/')
// return response
// }