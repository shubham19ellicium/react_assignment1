import React from "react";

const DisplaySummary = (props) => {
  let { title, price } = props.obj;
  return (
    <>
      <div class="finish-add-on-block">
        <div class="finish-add-detail-block">
          <p>{title}</p>
        </div>
        <div class="finish-add-on-price-block">
          <p>{price}</p>
        </div>
      </div>
    </>
  );
};

export default DisplaySummary;
