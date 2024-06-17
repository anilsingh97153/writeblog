/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useId} from "react";

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="w-full">
            {label && (
                    <label htmlFor={id}
                    className="inline-block mb-1 pl-1 mr-2 font-semibold"
                    >
                        {label} 
                    </label>
            )}
            <select
            {...props}
            id={id}
            ref={ref}
            className="bg-black text-white px-1 rounded-md pb-1"
            >
                {options.map((option) => (
                    <option 
                    key={option}
                    value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}


export default React.forwardRef(Select);