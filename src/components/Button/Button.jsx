import styles from "./_styles.module.scss";

const Button = ({
    icon,
    children,
    onClick,
    disabled = false,
    type = "button",
    minWidth = "auto",
}) => (
    <button
        type={type}
        className={styles.button}
        onClick={onClick}
        disabled={disabled}
        style={{ minWidth }}
    >
        {children}
        {icon && <span className={styles.buttonIcon}>{icon}</span>}
    </button>
);

export default Button;
