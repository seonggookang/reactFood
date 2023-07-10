import { useRef } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim().length === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    // .current는 ref 안에 저장된 실제 값에 대한 엑세스를 제공함. (이경우 Input 요소)
    // 이제 .value에도 엑세스 할 수 있음. js의 모든 입력 요소 객체는 해당 입력 요소에 입력된 실제 값을 갖고 있는 값 프로퍼티가 있기 때문
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName); // 뭔가 쓰였으면 true
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode); // !와 Not 네이밍은 헷갈림

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid & enteredCityIsValid & enteredPostalCodeIsValid;

    if (formIsValid) {
      // submit the cart data;
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Co de</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {/*숫자지만 text로 처리해야 이것을 Null값으로 처리하지 않음*/}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
