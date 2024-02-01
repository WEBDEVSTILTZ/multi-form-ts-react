import React from 'react'

interface TextAreaProps {
    label: string
    placeholder: string
    value: string
    onChange: (value: string) => void
    errorMessage: string
    hasError: boolean
    clearError: () => void
}

export function TextArea({ label, placeholder, value, onChange, errorMessage, hasError, clearError }: TextAreaProps) {

    function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value
        onChange(value)
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between">
                <label className="text-denim text-xs sm:text-sm">{label}</label>
                {hasError && <span className="text-red text-xs sm:text-sm">{errorMessage}</span>}
            </div>
            <textarea
                className={`
                    px-4 py-3 rounded ${hasError ? 'border-red' : 'border-border-color'} border-[1px] text-base text-denim font-medium  
                    placeholder:text-grey
                    focus:outline-none focus:border-stiltzyellow
                    w-full
                `}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                onFocus={() => clearError()}
            />
        </div>
    )
}