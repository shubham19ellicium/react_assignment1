import React, { useEffect, useState } from "react";
import "./RenderForms.css";
import archadeImage from "../../assets/images/icon-arcade.svg";
import advanceImage from "../../assets/images/icon-advanced.svg";
import proImage from "../../assets/images/icon-pro.svg";
import doneImage from "../../assets/images/checked.jfif";
import {
  emailValidation,
  formatString,
  numberValidation,
} from "../../commonUtil/CommonUtil";
import AddOnBlock from "../addOnsBlock/AddOnBlock";
import DisplaySummary from "../summaryDisplay/DisplaySummary";
import AddOn from "../addOnsBlock/AddOn";
import StepOne from "../step1/StepOne";

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
  const [plainErrorFlag, setPlainErrorFlag] = useState(false);
  const [selectPlainDuration, setSelectPlainDuration] = useState("monthly");

  const [selectedPlainPrice, setSelectedPlainPrice] = useState({});
  const [addOnSelectedItem, setAddOnSelectedItem] = useState([]);
  const [addOnSelectedItemObj, setAddOnSelectedItemObj] = useState({
    onlineServices: false,
    largerStorage: false,
    customizableProfile: false,
  });

  const [selectPlainUI, setSelectPlainUI] = useState(null);

  let MONTHLY_PRICE = {
    archad_plan: 9,
    advance_plan: 12,
    pro_plan: 15,
    online_service: 1,
    large_service: 2,
    custom_service: 2,
  };
  let YEARLY_PRICE = {
    archad_plan: 90,
    advance_plan: 120,
    pro_plan: 150,
    online_service: 10,
    large_service: 20,
    custom_service: 20,
  };

  useEffect(() => {
    switch (selectPlain) {
      case "Arcade":
        setSelectedPlainPrice(
          selectPlainDuration === "monthly"
            ? MONTHLY_PRICE.archad_plan
            : YEARLY_PRICE.archad_plan
        );
        break;

      case "Advance":
        setSelectedPlainPrice(
          selectPlainDuration === "monthly"
            ? MONTHLY_PRICE.advance_plan
            : YEARLY_PRICE.advance_plan
        );
        break;

      case "Pro":
        setSelectedPlainPrice(
          selectPlainDuration === "monthly"
            ? MONTHLY_PRICE.pro_plan
            : YEARLY_PRICE.pro_plan
        );
        break;

      default:
        break;
    }
  }, [selectPlainDuration]);

  useEffect(() => {
    if (props.stepNumber === 5) {
      setTimeout(() => {
        window.location.reload();
      }, 3000);

      props.handleStepFlag(true);
      console.log("I AM PRINTING");
    }
  }, [props.stepNumber]);

  let checkName = (inputName) => {
    var regex = /^[A-Za-z\s]+$/;

    if (inputName.length === 0) {
      setNameErrorFlag(true);
      setNameErrorMessage("Field should not be empty");
    } else if (!regex.test(inputName)) {
      setNameErrorFlag(true);
      setNameErrorMessage("Only charecters allowed");
    } else if (inputName.length === 30) {
      setNameErrorFlag(true);
      setNameErrorMessage("Reached Max Limit");

      setTimeout(() => {
        setNameErrorFlag(false);
        setNameErrorMessage("");
      }, 1000);
    } else {
      setNameErrorFlag(false);
      setNameErrorMessage("");
    }
  };

  let checkEmail = (inputEmail) => {
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

  let checkPhone = (phoneNumber) => {
    var regex = /\D/g;

    if (phoneNumber.length === 0) {
      setPhoneErrorFlag(true);
      setPhoneErrorMessage("Field should not be empty");
    } else if (regex.test(phoneNumber)) {
      setPhoneErrorFlag(true);
      setPhoneErrorMessage("Enter valid phone number");
    } else if (phoneNumber.length === 10) {
      setPhoneErrorFlag(true);
      setPhoneErrorMessage("Reached Max Limit");

      setTimeout(() => {
        setPhoneErrorFlag(false);
        setPhoneErrorMessage("");
      }, 1000);
    } else {
      setPhoneErrorFlag(false);
      setPhoneErrorMessage("");
    }
  };

  const handleNameChange = (e) => {
    let inputName = e.target.value;

    setName(inputName);
    checkName(inputName);
  };

  const handleEmailChange = (e) => {
    let inputEmail = e.target.value;
    setEmail(inputEmail);
    checkEmail(inputEmail);
  };

  const handlePhoneChange = (e) => {
    let phoneNumber = e.target.value;
    setPhone(phoneNumber);
    checkPhone(phoneNumber);
  };

  const increment = () => {
    return props.handleIncrementStepChange();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let inputName = name;
    let inputEmail = email;
    let inputPhone = phone;
    var regex = /^[A-Za-z\s]+$/;

    if (
      inputName.length > 0 &&
      regex.test(inputName) &&
      inputEmail.length > 0 &&
      emailValidation(inputEmail) &&
      inputPhone.length > 0 &&
      numberValidation(inputPhone)
    ) {
      sessionStorage.setItem("username", inputName.replace(/\s+/g, " "));
      // sessionStorage.setItem("username", inputName);
      increment();
    } else {
      console.log("*********  ***********");
      checkPhone(inputPhone);
      checkName(inputName);
    }
  };

  const handleSelectCard = (target) => {
    setPlainErrorFlag(false);
    // for (var i = 1; i <= 3; i++) {
    //   var selectedOption = document.getElementById("selection-" + i);
    //   selectedOption.classList.remove("active");
    // }
    // var myOption = document.getElementById("selection-" + target);
    // myOption.classList.add("active");

    switch (target) {
      case 1:
        setSelectPlainUI(0);
        setSelectPlain("Arcade");
        setSelectedPlainPrice(
          selectPlainDuration === "monthly"
            ? MONTHLY_PRICE.archad_plan
            : YEARLY_PRICE.archad_plan
        );
        break;

      case 2:
        setSelectPlainUI(1);
        setSelectPlain("Advance");
        setSelectedPlainPrice(
          selectPlainDuration === "monthly"
            ? MONTHLY_PRICE.advance_plan
            : YEARLY_PRICE.advance_plan
        );
        break;

      case 3:
        setSelectPlainUI(2);
        setSelectPlain("Pro");
        setSelectedPlainPrice(
          selectPlainDuration === "monthly"
            ? MONTHLY_PRICE.pro_plan
            : YEARLY_PRICE.pro_plan
        );
        break;

      default:
        setSelectPlainUI(0);
        setSelectPlain("Arcade");
        break;
    }
  };

  const handleChangePlainDuration = (e) => {
    if (e.target.checked === true) {
      setSelectPlainDuration("yearly");
    } else {
      setSelectPlainDuration("monthly");
    }
  };

  const handleSubmitPlain = () => {
    let plain = selectPlain;
    let duration = selectPlainDuration;
    if (plain.length === 0 || duration.length === 0) {
      setPlainErrorFlag(true);
    } else {
      increment();
    }
  };

  // let addOnObject = [
  //   {
  //     title: "Online Service",
  //     subTitle: "Access to multiplayer games",
  //     plainDuration:
  //       selectPlainDuration === "monthly"
  //         ? formatString("month", MONTHLY_PRICE.online_service)
  //         : formatString("year", YEARLY_PRICE.online_service),
  //     key: "Online Service",
  //     money:
  //       selectPlainDuration === "monthly"
  //         ? MONTHLY_PRICE.online_service
  //         : YEARLY_PRICE.online_service,
  //   },
  //   {
  //     title: "Larger storage",
  //     subTitle: "Extra 1TB of cloud save",
  //     plainDuration:
  //       selectPlainDuration === "monthly"
  //         ? formatString("month", MONTHLY_PRICE.large_service)
  //         : formatString("year", YEARLY_PRICE.large_service),
  //     key: "Large Service",
  //     money:
  //       selectPlainDuration === "monthly"
  //         ? MONTHLY_PRICE.large_service
  //         : YEARLY_PRICE.large_service,
  //   },
  //   {
  //     title: "Customizable Profile",
  //     subTitle: "Custom theme on your profile",
  //     plainDuration:
  //       selectPlainDuration === "monthly"
  //         ? formatString("month", MONTHLY_PRICE.custom_service)
  //         : formatString("year", YEARLY_PRICE.custom_service),
  //     key: "Custom Service",
  //     money:
  //       selectPlainDuration === "monthly"
  //         ? MONTHLY_PRICE.custom_service
  //         : YEARLY_PRICE.custom_service,
  //   },
  // ];

  // eslint-disable-next-line no-extend-native
  // String.prototype.capitalizeFirstLetter = function () {
  //   return this.charAt(0).toUpperCase() + this.slice(1);
  // };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleUpdatePackageName = () => {
    // let nameString = `${selectPlain} (${selectPlainDuration.capitalizeFirstLetter()})`;
    let nameString = `${selectPlain} (${capitalizeFirstLetter(
      selectPlainDuration
    )})`;
    return nameString;
  };

  const handlePriceDisplay = () => {
    let price = selectedPlainPrice;
    let period = selectPlainDuration;
    let formatPeriod;
    if (period === "monthly") {
      formatPeriod = "month";
    } else if (period === "yearly") {
      formatPeriod = "year";
    }

    return formatString(formatPeriod, price);
  };

  const handleTotalCalculation = () => {
    // let addOnSum = addOnSelectedItem.reduce((accumulator, currentValue) => {
    //   return accumulator + currentValue.price;
    // }, 0);

    // Object.keys(services.addons).map((addon, idx) =>{
    //   console.log("services.addons[addon].money ",services.addons[addon].money);
    // })
    let addOnSum = Object.keys(services.addons).reduce(
      (accumulator, currentValue) => {
        if (formData[currentValue] === true) {
          return accumulator + services.addons[currentValue].money;
        }
        return accumulator;
      },
      0
    );

    let totalSum = addOnSum + selectedPlainPrice;

    let returnSum =
      selectPlainDuration === "monthly"
        ? formatString("month", totalSum)
        : formatString("year", totalSum);

    return returnSum;
  };

  const services = {
    addons: {
      onlineServices: {
        title: "Online Service",
        subtitle: "Access to multiplayer games",
        mo: 1,
        yr: 10,
        plainDuration:
          selectPlainDuration === "monthly"
            ? formatString("month", MONTHLY_PRICE.online_service)
            : formatString("year", YEARLY_PRICE.online_service),
        key: "Online Service",
        money:
          selectPlainDuration === "monthly"
            ? MONTHLY_PRICE.online_service
            : YEARLY_PRICE.online_service,
      },
      largerStorage: {
        title: "Larger storage",
        subtitle: "Extra 1TB of cloud save",
        mo: 2,
        yr: 20,
        plainDuration:
          selectPlainDuration === "monthly"
            ? formatString("month", MONTHLY_PRICE.large_service)
            : formatString("year", YEARLY_PRICE.large_service),
        key: "Large Service",
        money:
          selectPlainDuration === "monthly"
            ? MONTHLY_PRICE.large_service
            : YEARLY_PRICE.large_service,
      },
      customizableProfile: {
        title: "Customizable Profile",
        subtitle: "Custom theme on your profile",
        mo: 2,
        yr: 20,
        plainDuration:
          selectPlainDuration === "monthly"
            ? formatString("month", MONTHLY_PRICE.custom_service)
            : formatString("year", YEARLY_PRICE.custom_service),
        key: "Custom Service",
        money:
          selectPlainDuration === "monthly"
            ? MONTHLY_PRICE.custom_service
            : YEARLY_PRICE.custom_service,
      },
    },
  };

  const [formData, setFormData] = useState({
    onlineServices: false,
    largerStorage: false,
    customizableProfile: false,
  });

  const handlePlanClick = (addon) => {
    setFormData((prev) => {
      return { ...prev, [addon]: !prev[addon] };
    });
  };

  switch (props.stepNumber) {
    case 1:
      return (
        // <>
        //   <StepOne
        //     name={name}
        //     phone={phone}
        //     email={email}
        //     handleFormSubmit={handleFormSubmit}
        //     nameErrorFlag= {nameErrorFlag}
        //     nameErrorMessage = {nameErrorMessage}
        //     handleNameChange = {handleNameChange}
        //     emailErrorFlag= {emailErrorFlag}
        //     emialErrorMessage = {emialErrorMessage}
        //     handleEmailChange = {handleEmailChange}
        //     phoneErrorFlag= {phoneErrorFlag}
        //     phoneErrorMessage = {phoneErrorMessage}
        //     handlePhoneChange = {handlePhoneChange}
        //   />
        // </>
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
                      required
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
                      required
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
                      required
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
                    className={
                      selectPlainUI === 0
                        ? "selection-block active-select-block"
                        : "selection-block"
                    }
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
                          {selectPlainDuration === "monthly"
                            ? formatString("month", MONTHLY_PRICE.archad_plan)
                            : formatString("year", YEARLY_PRICE.archad_plan)}
                        </span>
                        <br />
                        <span className="selection-details-span">
                          {selectPlainDuration === "yearly" && "2 months free"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    // className="selection-block"
                    className={
                      selectPlainUI === 1
                        ? "selection-block active-select-block"
                        : "selection-block"
                    }
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
                          {selectPlainDuration === "monthly"
                            ? formatString("month", MONTHLY_PRICE.advance_plan)
                            : formatString("year", YEARLY_PRICE.advance_plan)}
                        </span>
                        <br />
                        <span className="selection-details-span">
                          {selectPlainDuration === "yearly" && "2 months free"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    // className="selection-block"
                    className={
                      selectPlainUI === 2
                        ? "selection-block active-select-block"
                        : "selection-block"
                    }
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
                          {selectPlainDuration === "monthly"
                            ? formatString("month", MONTHLY_PRICE.pro_plan)
                            : formatString("year", YEARLY_PRICE.pro_plan)}
                        </span>
                        <br />
                        <span className="selection-details-span">
                          {selectPlainDuration === "yearly" && "2 months free"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info-label-error-addon">
                  <span id="error-package" className="package-error-message">
                    {plainErrorFlag && "Please select plan"}
                  </span>
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
                        checked={selectPlainDuration === "yearly"}
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
              <button className="next-button" onClick={handleSubmitPlain}>
                Next Step
              </button>
            </div>
          </div>
        </div>
      );

    case 3:
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
                  {/* {addOnObject.map((obj, index) => { */}
                  {Object.keys(services.addons).map((addon, idx) => {
                    return (
                      <AddOn
                        key={addon + idx}
                        title={services.addons[addon].title}
                        subtitle={services.addons[addon].subtitle}
                        rate={services.addons[addon][formData.billing]}
                        active={formData[addon]}
                        type={addon}
                        handlePlanClick={handlePlanClick}
                        plainDuration={services.addons[addon].plainDuration}
                        formData={formData}
                      />
                      // <AddOnBlock
                      //   key={index}
                      //   addons={{
                      //     title: obj.title,
                      //     subTitle: obj.subTitle,
                      //     plainDuration: obj.plainDuration,
                      //     index: index,
                      //     key: obj.key,
                      //     func: setAddOnSelectedItem,
                      //     money: obj.money,
                      //     addOnProp:addOnSelectedItem,
                      //     selectObj:setAddOnSelectedItemObj,
                      //   }}
                      // />
                    );
                  })}
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
                // onClick={props.handleIncrementStepChange}
                onClick={props.handleIncrementStepChange}
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      );

    case 4:
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
                      <h5 id="finish-package-name-id">
                        {handleUpdatePackageName()}
                      </h5>
                      <span
                        className="change-text-click"
                        onClick={() => props.handleStepChange(2)}
                      >
                        Change
                      </span>
                    </div>
                    <div className="finish-package-price-block">
                      <h5 id="finish-package-price-id">
                        {handlePriceDisplay()}
                      </h5>
                    </div>
                  </div>
                  <div className="divider-line">
                    <hr />
                  </div>
                  <div className="finish-add-on-wrapper" id="add-on-wrapper-id">
                    {/* {addOnSelectedItem.map((data, index) => { */}
                    {Object.keys(services.addons).map((addon, idx) => {
                      if (formData[addon] === true) {
                        return (
                          <DisplaySummary
                            key={idx}
                            obj={{
                              title: services.addons[addon].title,
                              price:
                                selectPlainDuration === "monthly"
                                  ? formatString(
                                      "month",
                                      services.addons[addon].money
                                    )
                                  : formatString(
                                      "year",
                                      services.addons[addon].money
                                    ),
                            }}
                          />
                        );
                      }
                    })}
                  </div>
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
                      {handleTotalCalculation()}
                    </span>
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
                onClick={props.handleIncrementStepChange}
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      );

    case 5:
      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000);

      // props.handleStepFlag(true);

      return (
        <div className="thank-you-block" id="thank-you-id">
          <div className="thank-you-card">
            <img src={doneImage} className="checked-image" alt="" />
            <h2>Thank you!</h2>
            <div className="thank-you-text-block">
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
