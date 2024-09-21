import React from 'react';

interface ProgressIndicatorProps {
  currentStep: 'cart' | 'address' | 'payment';
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  const steps = ['cart', 'address', 'payment'];

  return (
    <div className="flex items-center justify-center w-full max-w-3xl mx-auto px-4 py-2">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-max h-8 sm:w-max sm:h-10 px-4 py-2  rounded-full flex items-center justify-center text-sm sm:text-base font-medium ${steps.indexOf(currentStep) >= index
                  ? 'bg-[#2ed396] text-white'
                  : 'bg-gray-200 text-black'
                }`}
            >
              <p className={` text-xs  sm:text-sm font-medium
                }`}>
                {step.charAt(0).toUpperCase() + step.slice(1)}
              </p>
            </div>

          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-px bg-gray-300 mx-2 sm:mx-4"
              aria-hidden="true">
              <div
                className={`h-full ${steps.indexOf(currentStep) > index ? 'bg-[#2ed396]' : ''
                  }`}
                style={{
                  width: steps.indexOf(currentStep) > index ? '100%' : '0%',
                  transition: 'width 0.3s ease-in-out'
                }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressIndicator;