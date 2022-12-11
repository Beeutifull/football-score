import { useState, useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { getSelectedText } from "../../utils/utils";
import { ChevronIcon } from "../../assets/icons/index";
import Button from "../Button/Button";

import styles from "./_styles.module.scss";

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
        <div className={styles.selectWrapper} ref={selectRef}>
            {label && <label className={styles.selectLabel}>{label}</label>}
            <Button
                type="button"
                className={styles.selectButton}
                onClick={() => setIsActive(!isActive)}
                icon={<ChevronIcon fill="#fff" />}
                minWidth="170px"
            >
                {buttonText}
            </Button>
            <div
                className={`${styles.drawerWrapper} ${
                    isActive ? styles.active : ""
                }`}
            >
                {isActive &&
                    options &&
                    options.map((item) => (
                        <div
                            className={styles.drawerItem}
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
        </div>
    );
};

export default Select;
