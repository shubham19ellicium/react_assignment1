import { useState } from "react";
import "./App.css";
import RenderForms from "./components/RenderForms";

function App() {
  const [stepNumber, setStepNumber] = useState(1);

  const handleIncrementStepChange = (e) => {
    setStepNumber((prev) => prev + 1);
  };

  const handleDecrementStepChange = (e) => {
    setStepNumber((prev) => prev - 1);
  };

  return (
    <div className="main-container">
      <div className="container">
        <div className="left-block">
          <div className="steps-container">
            <div className="step-block">
              <div
                className="step-circle"
                // onclick="manageClick(1)"
                id="step-circle-1-id"
              >
                <span>1</span>
              </div>
              <div className="step-title-block">
                <p className="step-text">STEP 1</p>
                <p className="step-title">YOUR INFO</p>
              </div>
            </div>
            <div className="step-block">
              <div
                className="step-circle"
                // onclick="manageClick(2)"
                id="step-circle-2-id"
              >
                <span>2</span>
              </div>
              <div className="step-title-block">
                <p className="step-text">STEP 2</p>
                <p className="step-title">SELECT PLAN</p>
              </div>
            </div>
            <div className="step-block">
              <div
                className="step-circle"
                // onclick="manageClick(3)"
                id="step-circle-3-id"
              >
                <span>3</span>
              </div>
              <div className="step-title-block">
                <p className="step-text">STEP 3</p>
                <p className="step-title">ADD ONS</p>
              </div>
            </div>
            <div className="step-block">
              <div
                className="step-circle"
                // onclick="manageClick(4)"
                id="step-circle-4-id"
              >
                <span>4</span>
              </div>
              <div className="step-title-block">
                <p className="step-text">STEP 4</p>
                <p className="step-title">SUMMARY</p>
              </div>
            </div>
          </div>
        </div>
        <div className="right-block">
          <div className="form-wrapper">
            <RenderForms
              stepNumber={stepNumber}
              handleIncrementStepChange={handleIncrementStepChange}
              handleDecrementStepChange={handleDecrementStepChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
