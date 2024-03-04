import React from "react";
import "./SideNav";

const SideNav = (props) => {
  const { circleFlag, handleStepChange, circleCount, text, title, noneFlag } =
    props.data;
  return (
    <>
      <div className="step-block">
        <div
          className={
            circleFlag.circleFlag[`circl${circleCount}`] === true
              ? "step-circle-active"
              : "step-circle"
          }
          // onClick={() => handleStepChange.handleStepChange(circleCount)}
          onClick={() => {
            if (noneFlag === false) {
              return handleStepChange.handleStepChange(circleCount);
            }
          }}
        >
          <span>{circleCount}</span>
        </div>
        <div className="step-title-block">
          <p className="step-text">{text}</p>
          <p className="step-title">{title}</p>
        </div>
      </div>
    </>
  );
};

export default SideNav;
