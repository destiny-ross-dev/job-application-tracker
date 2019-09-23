import React from "react";

const FormStepper = ({ steps, currentStep, children }) => {
  return (
    <div className="FormStepper">
      {steps.map((e, i) => {
        return (
          <div className="FormStepper__Step">
            <p
              className={`FormStepper__Step-Number FormStepper__Step-Number${
                currentStep >= i + 1 ? "--colored" : "--grey"
              }`}
            >
              {i + 1}
            </p>
            <p className="FormStepper__Step-Description">{e.desc}</p>
          </div>
        );
      })}
      {children}
    </div>
  );
};

export default FormStepper;
