import React from 'react';

const TimelineStep = ({ step, order, isCompleted, isCurrent, isLastStep, icon, description }) => {
  // Define specific background colors for each step
  const stepBgColors = {
    Ordered: 'bg-red-500',
    Processing: 'bg-yellow-500',
    Shipped: 'bg-blue-500',
    Completed: 'bg-green-500',
  };

  const stepTextColors = {
    Ordered: 'text-red-500',
    Processing: 'text-yellow-500',
    Shipped: 'text-blue-500',
    Completed: 'text-green-500',
  };

  // Apply dynamic classes for different statuses
  const iconBgColor = isCompleted || isCurrent ? stepBgColors[step.label] : 'bg-gray-200';
  const iconTextColor = isCompleted || isCurrent ? 'text-white' : stepTextColors[step.label];
  const connectorColor = isCompleted ? 'bg-primary' : 'bg-gray-300';
  const labelTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';
  const descriptionTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';

  return (
    <li className="relative flex items-start justify-center">
      <div>
        {/* Icon and Connector */}
        <div className="flex items-center">
          {/* Status Icon */}
          <div
            className={`z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ease-in-out ${iconBgColor} ${iconTextColor} ring-0 ring-white shrink-0`}
          >
            <i className={`ri-${icon.iconName} text-xl`}></i>
          </div>

          {/* Connector Line */}
          {!isLastStep && (
            <div className={`hidden sm:flex w-full h-0.5 ${connectorColor} transition-colors duration-200`} />
          )}
        </div>

        {/* Step Description */}
        <div className="mt-4 sm:mt-0 sm:ml-8 text-left pl-10 w-3/4">
          <h3 className={`font-semibold text-base ${labelTextColor} transition-colors duration-200`}>
            {step.label}
          </h3>
          <time className="block mb-1 text-xs font-normal text-gray-400">
            {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'Time'}
          </time>
          <p className={`text-sm ${descriptionTextColor} transition-colors duration-200 w-60`}>{description}</p>
        </div>
      </div>
    </li>
  );
};

export default TimelineStep;
