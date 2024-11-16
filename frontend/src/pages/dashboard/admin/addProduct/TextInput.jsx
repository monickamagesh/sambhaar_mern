import React from 'react'

const TextInput = ({label, name, value, onChange, type="text", placeholder}) => {
  return (
    <div>
        <label htmlFor={name} className='block text-sm font-medium text-gray-700'>{label}</label>
        <input type={type} name={name} id={name} placeholder={placeholder}
        value={value}
        onChange={onChange}
        className=' mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
        />
        
    </div>
  )
}

export default TextInput