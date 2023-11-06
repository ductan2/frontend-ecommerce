import React from 'react'

interface InputCustomProps extends React.InputHTMLAttributes<HTMLInputElement> {
   value?: string
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
   onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
   errorMessage?: string | boolean
   defaultValue?: string
}

export const InputCustom = ({ name, placeholder, type, className, onBlur, defaultValue, onChange, value, errorMessage, ...rest }: InputCustomProps) => {
   return (
      <div className="form-group ">
         <input type={type} name={name} className={`px-3 ${className}`}
            placeholder={placeholder} value={value} defaultValue={defaultValue}
            onBlur={onBlur} onChange={onChange}
            {...rest} />
         <div>
            {errorMessage && <span className="text-danger">{errorMessage}</span>}
         </div>
      </div>
   )
}
