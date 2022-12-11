import { useState, useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { getSelectedText } from "../../utils/utils";

const Select = ({
    label,
    selected,
    placeholder,
    options,
    onClick,
    onChange,
}) => {
    const [isActive, setIsActive] = useState(false);
    const selectRef = useRef(null);
    const selectedText = getSelectedText(options, selected);
    const buttonText = selectedText || placeholder;

    useOutsideClick([selectRef], () => {
        setIsActive(false);
    });

    const handleOptionClick = (item) => {
        if (onChange) {
            onChange(item);
        }
    };

    return (
        <div className="select-wrapper" ref={selectRef}>
            {label && <label>{label}</label>}
            <button
                type="button"
                className="select-button"
                onClick={() => setIsActive(!isActive)}
            >
                {buttonText}
            </button>
            {isActive &&
                options &&
                options.map((item) => (
                    <div
                        className="select-drawer"
                        key={item.value}
                        onClick={() => {
                            if (handleOptionClick)
                                handleOptionClick(item.value);
                            setIsActive(false);
                        }}
                    >
                        {item.text}
                    </div>
                ))}
        </div>
    );
};

export default Select;
