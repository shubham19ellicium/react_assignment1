import React from "react";

const StepOne = (name,
    phone,
    email,
    handleFormSubmit,
    nameErrorFlag,
    nameErrorMessage,
    handleNameChange,
    emailErrorFlag,
    emialErrorMessage,
    handleEmailChange,
    phoneErrorFlag,
    phoneErrorMessage,
    handlePhoneChange,) => {

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="personal-info-block"
        id="personal-info-id"
      >
        <div className="form-content-block">
          <div className="head-and-info-wrapper">
            <div className="form-header">
              <h2>Personal info</h2>
              <p>Please provide your name, email address, and phone number.</p>
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
    </>
  );
};

export default StepOne;
