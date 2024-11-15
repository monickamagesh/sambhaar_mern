import React from 'react'

const TimelineStep = ({step, order, isCompleted, isCurrent, isLastStep, icon, description}) => {
    const iconBgColor = isCompleted || isCurrent ? `bg-${icon.bgColor}` : 'bg-gray-100';
    const iconTextColor = isCompleted || isCurrent ? 'text-white' : `text-${icon.textColor}`;
    const connectorColor = isCompleted ? 'bg-gray-200' : 'bg-red-200';
    const labelTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';
    const descriptionTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';
  return (
    
    <section>
        <li className='relative flex items-start justify-center'>
        <div>
        <div className='flex items-center'>
            <div className={`z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ease-in-out ${step?.status === 'Completed' ? 'bg-green-900 text-green-100' : step?.status === 'Ordered' ? 'bg-red-700 text-red-100' : step?.status === 'Processing' ? 'bg-blue-600 text-blue-100' : 'bg-gray-200 text-gray-800'}  rounded-full ring-0 ring-white shrink-0`}>
                <i className={`ri-${icon.iconName} text-xl`}></i>
            </div>
            {!isLastStep && (<div className={`hidden sm:flex  w-full h-0.5 ${connectorColor}`}>

            </div>)}
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-8 text-left pl-10 w-3/4">
                <h3 className={`font-semibold text-base ${labelTextColor} transition-colors duration-200`}>
                    {step.label}
                </h3>
                <time className="block mb-1 text-xs font-normal text-gray-400">
                    {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'Time'}
                </time>
                <p className={`text-sm ${descriptionTextColor} transition-colors duration-200 w-60`}>
                    {description}
                </p>
            </div>

            </div>
    </li>

    </section>
  )
}

export default TimelineStep