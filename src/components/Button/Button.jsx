const Button = ({ children, onClick, disabled = false }) => (
    <button onClick={onClick} disabled={disabled}>
        {children}
    </button>
);

export default Button;
