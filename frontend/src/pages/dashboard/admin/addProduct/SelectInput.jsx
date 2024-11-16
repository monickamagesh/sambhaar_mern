import React from 'react'

const SelectInput = ({ label, name, value, onChange, options }) => {
    return (
        <div>
            <label htmlFor={name} className='block text-sm font-medium text-gray-700'>{label}</label>
            <select name={name} id={name}
            value={value}
            onChange={onChange}
            className='mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
            >
                {
                    options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default SelectInput