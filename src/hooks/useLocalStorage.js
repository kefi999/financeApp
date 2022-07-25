import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    //* Next 2 lines serve as loading
    //in case there is something in local storage with the key, we place it in the jsonValue
    const jsonValue = localStorage.getItem(key);
    //we check if indeed there is something we return it as JSON object,our value is going to store(have as inital value stuff we saved)
    if (jsonValue != null) return JSON.parse(jsonValue);
    //*

    //in case defaultValue is defined as function, in the function calling this , if statement is going to invoke it here and do whatever is stated there.
    if (typeof defaultValue === "function") {
      return defaultValue();
    } //in case it's just a value, like in our case empty array it will just return and the value here will also be an empty array.
    else {
      return defaultValue;
    }
  });
  //useEffect will listen for 2 changes, key change which will probably never change, and a value change that will change whenever we use setBudgets,setExpenses in BudgetsContext
  //it will track changes for these 2 values and whenever on of them change it will the key and the stringified value to the local storage, which after
  //will be stored in jsonValue and returned as describe etc...
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  //this is necessary for keeping the same style as useState would've been, so we return inital value and the function to change it.
  return [value, setValue];
}
