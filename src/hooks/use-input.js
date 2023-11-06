import React,{useState} from 'react'

export default function useInput(validateValue) {
    const [enterValue, setEnterValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validateValue(enterValue);
    const hasError = !isValid && isTouched;

    const valueChangeHandler = (event) => {
        setEnterValue(event.target.value);
      };

      const valueBlurHandler = (event) => {
        setIsTouched(true);
      };
      const reset =()=>{
        setIsTouched(false);
        setEnterValue("");
      }
  return ({
   value:enterValue,
   hasError,
   isValid,
   valueChangeHandler,
   valueBlurHandler,
   reset
  }
  );
}
