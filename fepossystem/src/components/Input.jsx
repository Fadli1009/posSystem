const Input = ({ type, placeholder, className, name, id, onChange, value  }) => {
    return (
            <input
                    type={type}
                    placeholder={placeholder}
                    className={className}
                    name={name}
                    id={id}
                    onChange={onChange}
                    value={value}
                  />
    );
}
 
export default Input;