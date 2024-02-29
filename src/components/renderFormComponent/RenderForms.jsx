import React, { useEffect, useState } from "react";
import "./RenderForms.css";
import archadeImage from "../../assets/images/icon-arcade.svg";
import advanceImage from "../../assets/images/icon-advanced.svg";
import proImage from "../../assets/images/icon-pro.svg";
import doneImage from "../../assets/images/checked.jfif";
import { emailValidation, numberValidation } from "../../commonUtil/CommonUtil";

const RenderForms = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [nameErrorFlag, setNameErrorFlag] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  const [emailErrorFlag, setEmailErrorFlag] = useState(false);
  const [emialErrorMessage, setEmailErrorMessage] = useState("");

  const [phoneErrorFlag, setPhoneErrorFlag] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

  const [selectPlain, setSelectPlain] = useState("");
  const [selectPlainDuration, setSelectPlainDuration] = useState("monthly");

  const handleNameChange = (e) => {
    let inputName = e.target.value;
    setName(inputName);
    var regex = /^[A-Za-z\s]+$/;
    console.log("LENGTH :: ", inputName.length);

    if (inputName.length === 0) {
      setNameErrorFlag(true);
      setNameErrorMessage("Field should not be empty");
    } else if (!regex.test(inputName)) {
      setNameErrorFlag(true);
      setNameErrorMessage("Only charecters allowed");
    } else {
      setNameErrorFlag(false);
      setNameErrorMessage("");
    }
  };

  const handleEmailChange = (e) => {
    let inputEmail = e.target.value;
    setEmail(inputEmail);

    if (inputEmail.length === 0) {
      setEmailErrorFlag(true);
      setEmailErrorMessage("Field should not be empty");
    } else if (!emailValidation(inputEmail) === true) {
      setEmailErrorFlag(true);
      setEmailErrorMessage("Enter valid email id");
    } else {
      setEmailErrorFlag(false);
      setEmailErrorMessage("");
    }
  };

  const handlePhoneChange = (e) => {
    let phoneNumber = e.target.value;
    setPhone(phoneNumber);
    var regex = /\D/g;

    if (phoneNumber.length === 0) {
      setPhoneErrorFlag(true);
      setPhoneErrorMessage("Field should not be empty");
    } else if (regex.test(phoneNumber)) {
      setPhoneErrorFlag(true);
      setPhoneErrorMessage("Enter valid phone number");
    } else {
      setPhoneErrorFlag(false);
      setPhoneErrorMessage("");
    }
  };

  const increment = () => {
    return props.handleIncrementStepChange();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let inputName = name;
    let inputEmail = email;
    let inputPhone = phone;

    if (
      inputName.length > 0 &&
      inputEmail.length > 0 &&
      emailValidation(inputEmail) &&
      inputPhone.length > 0 &&
      numberValidation(inputPhone)
    ) {
      console.log("********* not a issue ***********");
      sessionStorage.setItem("username", inputName.replace(/\s+/g, " "));
      increment();
    } else {
      console.log("********* issue ***********");
    }
  };

  const handleSelectCard = (target) => {
    for (var i = 1; i <= 3; i++) {
      console.log("TARGET :: ", target);
      var selectedOption = document.getElementById("selection-" + i);
      selectedOption.classList.remove("active");
    }
    var myOption = document.getElementById("selection-" + target);
    myOption.classList.add("active");

    switch (target) {
      case 1:
        setSelectPlain("Arcade");
        break;

      case 2:
        setSelectPlain("Advance");
        break;

      case 3:
        setSelectPlain("Pro");
        break;

      default:
        setSelectPlain("Arcade");
        break;
    }
  };

  const handleChangePlainDuration = (e) => {
    if (e.target.checked === true) {
        setSelectPlainDuration("yearly")
    }else{
        setSelectPlainDuration("monthly")
    }
  }

  const handleSubmitPlain = () =>{
      let plain = selectPlain
      let duration = selectPlainDuration
      console.log("PLAIN :: ",plain);
      console.log("PLAIN :: ",duration);
      if (plain.length === 0 || duration.length === 0) {
        console.log("ERROR MESSAGE");
      }else{
        increment();
      }
  }

  switch (props.stepNumber) {
    case 1:
      return (
        <form
          onSubmit={handleFormSubmit}
          className="personal-info-block"
          id="personal-info-id"
        >
          <div className="form-content-block">
            <div className="head-and-info-wrapper">
              <div className="form-header">
                <h2>Personal info</h2>
                <p>
                  Please provide your name, email address, and phone number.
                </p>
              </div>
              <div className="form-block-container">
                <div className="form-info-block">
                  <div className="form-info-label">
                    <div className="info-label">
                      <span>Name</span>
                    </div>
                    <div className="info-label-error">
                      <span id="error-name" className="name-error-message">
                        {nameErrorFlag && nameErrorMessage}
                      </span>
                      <span
                        id="error-name-1"
                        className="name-error-message"
                      ></span>
                    </div>
                  </div>
                  <div className="form-info-input-block">
                    <input
                      type="text"
                      className="info-input-box"
                      placeholder="e.g. Stephen King"
                      onChange={handleNameChange}
                      value={name}
                      maxLength={30}
                    />
                  </div>
                </div>
                <div className="form-info-block">
                  <div className="form-info-label">
                    <div className="info-label">
                      <span>Email Address</span>
                    </div>
                    <div className="info-label-error">
                      <span id="error-email" className="name-error-message">
                        {emailErrorFlag && emialErrorMessage}
                      </span>
                    </div>
                  </div>
                  <div className="form-info-input-block">
                    <input
                      type="email"
                      className="info-input-box"
                      placeholder="e.g. Stephen@gmail.com"
                      onChange={handleEmailChange}
                      value={email}
                    />
                  </div>
                </div>
                <div className="form-info-block">
                  <div className="form-info-label">
                    <div className="info-label">
                      <span>Phone number</span>
                    </div>
                    <div className="info-label-error">
                      <span
                        id="error-number"
                        className="name-error-message"
                      ></span>
                      <span id="error-number-1" className="name-error-message">
                        {phoneErrorFlag && phoneErrorMessage}
                      </span>
                    </div>
                  </div>
                  <div className="form-info-input-block">
                    <input
                      type="tel"
                      className="info-input-box"
                      placeholder="e.g. 9090909090"
                      onChange={handlePhoneChange}
                      value={phone}
                      maxLength={10}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="button-block">
            <div className="next-button-block">
              <div className="go-back-block"></div>
              <button className="next-button" type="submit">
                Next Step
              </button>
            </div>
          </div>
        </form>
      );

    case 2:
      console.log("I AM AT 2");
      return (
        <div className="select-plan-block" id="select-plan-id">
          <div className="form-content-block">
            <div className="head-and-info-wrapper">
              <div className="form-header">
                <h2>Select your plan</h2>
                <p>You have the option of monthly or yearly billing</p>
              </div>
              <div className="form-block-container">
                <div className="selection-block-container">
                  <div
                    className="selection-block"
                    onClick={() => handleSelectCard(1)}
                    id="selection-1"
                  >
                    <div className="selection-image">
                      <img src={archadeImage} alt="" />
                    </div>
                    <div className="selection-details">
                      <h5 className="selection-details-header">Arcade</h5>
                      <p className="selection-details-p" id="arcade-price"></p>
                      <div
                        className="selection-span-wrapper-block"
                        id="selection-span-wrapper-1"
                      >
                        <span
                          id="price-1"
                          className="selection-details-price-span"
                        >
                          $9/mo
                        </span>
                        <br />
                        <span className="selection-details-span">
                          2 months free
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="selection-block"
                    onClick={() => handleSelectCard(2)}
                    id="selection-2"
                  >
                    <div className="selection-image">
                      <img src={advanceImage} alt="" />
                    </div>
                    <div className="selection-details">
                      <h5 className="selection-details-header">Advanced</h5>
                      <p className="selection-details-p" id="arcade-price"></p>
                      <div
                        className="selection-span-wrapper-block"
                        id="selection-span-wrapper-1"
                      >
                        <span
                          id="price-2"
                          className="selection-details-price-span"
                        >
                          $12/mo
                        </span>
                        <br />
                        <span className="selection-details-span">
                          2 months free
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="selection-block"
                    onClick={() => handleSelectCard(3)}
                    id="selection-3"
                  >
                    <div className="selection-image">
                      <img src={proImage} alt="" />
                    </div>
                    <div className="selection-details">
                      <h5 className="selection-details-header">Pro</h5>
                      <p className="selection-details-p" id="arcade-price"></p>
                      <div
                        className="selection-span-wrapper-block"
                        id="selection-span-wrapper-1"
                      >
                        <span
                          id="price-3"
                          className="selection-details-price-span"
                        >
                          $15/mo
                        </span>
                        <br />
                        <span className="selection-details-span">
                          2 months free
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info-label-error">
                  <span
                    id="error-package"
                    className="package-error-message"
                  ></span>
                </div>
                <div className="period-selection-block">
                  <div className="period-selection-detials">
                    <h5>Monthly</h5>
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="period-check"
                        id="period-check-id"
                        onChange={handleChangePlainDuration}
                      />
                      <span className="slider round"></span>
                    </label>
                    <h5>Yearly</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="button-block">
            <div className="next-button-block">
              <div className="go-back-block">
                <span onClick={props.handleDecrementStepChange}>Go Back</span>
              </div>
              <button
                className="next-button"
                onClick={handleSubmitPlain}
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      );

    case 3:
      console.log("I AM AT 3");
      return (
        <div className="add-on-block" id="add-on-id">
          <div className="form-content-block">
            <div className="head-and-info-wrapper">
              <div className="form-header">
                <h2>Pick add-ons</h2>
                <p>Add-ons help enhance your gaming experience.</p>
              </div>
              <div className="form-block-container">
                <div className="add-on-container">
                  <div className="add-on-box" id="add-on-box-1">
                    <div className="add-on-check-info">
                      <div className="add-on-check-block">
                        <input
                          type="checkbox"
                          name=""
                          id="add-on-id-1"
                          className="add-on-check"
                        />
                      </div>
                      <div className="add-on-check-info-block">
                        <h5>Online Service</h5>
                        <p>Access to multiplayer games</p>
                      </div>
                    </div>
                    <div className="add-on-price-info">
                      <div className="price">
                        <p className="addon-price" id="online-price-id">
                          +$1/mo
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="add-on-box" id="add-on-box-2">
                    <div className="add-on-check-info">
                      <div className="add-on-check-block">
                        <input
                          type="checkbox"
                          name=""
                          id="add-on-id-2"
                          className="add-on-check"
                        />
                      </div>
                      <div className="add-on-check-info-block">
                        <h5>Larger storage</h5>
                        <p>Extra 1TB of cloud save</p>
                      </div>
                    </div>
                    <div className="add-on-price-info">
                      <div className="price">
                        <p className="addon-price" id="large-price-id">
                          +$2/mo
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="add-on-box" id="add-on-box-3">
                    <div className="add-on-check-info">
                      <div className="add-on-check-block">
                        <input
                          type="checkbox"
                          name=""
                          id="add-on-id-3"
                          className="add-on-check"
                        />
                      </div>
                      <div className="add-on-check-info-block">
                        <h5>Customizable Profile</h5>
                        <p>Custom theme on your profile</p>
                      </div>
                    </div>
                    <div className="add-on-price-info">
                      <div className="price">
                        <p className="addon-price" id="custom-price-id">
                          +$2/mo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="button-block">
            <div className="next-button-block">
              <div className="go-back-block">
                <span onClick={props.handleDecrementStepChange}>go back</span>
              </div>
              <button
                className="next-button"
                onClick={props.handleIncrementStepChange}
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      );

    case 4:
      console.log("I AM AT 4");
      return (
        <div className="finish-up-block" id="finish-up-id">
          <div className="form-content-block">
            <div className="head-and-info-wrapper">
              <div className="form-header">
                <h2>Finishing up</h2>
                <p>Double-check everything looks OK before confirming.</p>
              </div>
              <div className="form-block-container">
                <div className="finish-up-container">
                  <div className="finish-info-block">
                    <div className="finish-package-block">
                      <h5 id="finish-package-name-id">Arcade (Monthly)</h5>
                      <span className="change-text-click">Change</span>
                    </div>
                    <div className="finish-package-price-block">
                      <h5 id="finish-package-price-id">$9/mo</h5>
                    </div>
                  </div>
                  <div className="divider-line">
                    <hr />
                  </div>
                  <div
                    className="finish-add-on-wrapper"
                    id="add-on-wrapper-id"
                  ></div>
                </div>
                <div className="total-container">
                  <div className="total-text">
                    <span
                      className="finish-text-span"
                      id="finist-total-text-id"
                    >
                      Total
                    </span>
                  </div>
                  <div className="total-value">
                    <span
                      className="finish-value-span"
                      id="finist-total-total-id"
                    >
                      Total
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="button-block">
            <div className="next-button-block">
              <div className="go-back-block">
                <span onClick={props.handleDecrementStepChange}>go back</span>
              </div>
              <button
                className="next-button"
                onClick={props.handleIncrementStepChange}
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      );

    case 5:
      console.log("I AM AT 5");
      return (
        <div class="thank-you-block" id="thank-you-id">
          <div class="thank-you-card">
            <img src={doneImage} class="checked-image" alt="" />
            <h2>Thank you!</h2>
            <div class="thank-you-text-block">
              <p>
                Thanks for confirming your subscription! We hope you have fun
                using our platform. If you ever need support, please feel free
                to email us at support@loremgaming.com.
              </p>
            </div>
          </div>
        </div>
      );

    default:
      break;
  }

  //   return (
  //     <div>
  //       asdf
  //     </div>
  //   )
};

export default RenderForms;
