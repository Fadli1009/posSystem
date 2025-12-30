const Input = ({ type, placeholder, className, name, id, onChange, value, checked }) => {
    return (
            <input
                    type={type}
                    placeholder={placeholder}
                    className={className}
                    name={name}
                    id={id}
                    onChange={onChange}
                    value={value}
                    checked={checked}
                  />
    );
}
 
export default Input;