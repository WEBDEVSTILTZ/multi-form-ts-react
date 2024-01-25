interface TextInputProps {
  label: string;
  placeholder: string;

}

export function AddressTextInput({ label, placeholder,}: TextInputProps) {


  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center justify-between">
        <label className="text-denim text-xs sm:text-sm	">{label}</label>
      </div>
      <input
        className={`
          px-4 py-3 rounded border-[1px] text-base text-denim font-medium  
          placeholder:text-grey
          focus:outline-none focus:border-purple
        `}
        type="text"
        placeholder={placeholder}
      />
    </div>
  )
} 
