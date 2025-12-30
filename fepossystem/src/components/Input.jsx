const Input = ({ type, placeholder, className, name, id  }) => {
    return (
            <input
                    type={type}
                    placeholder={placeholder}
                    className={className}
                    name={name}
                    id={id}
                  />
    );
}
 
export default Input;