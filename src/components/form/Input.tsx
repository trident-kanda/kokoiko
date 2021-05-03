type props = {
  register: any;
  type: string;
  placeholder?: string;
  value?: any;
  message?: string;
  name: string;
  validate?: any;
  autoComplete?: "off";
};
const Input = ({
  register,
  type,
  placeholder,
  value,
  message,
  name,
  validate,
}: props) => {
  if (!validate) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className="block w-full focus:outline-none focus:border-green-500  border-gray-500 border-2 rounded px-2 py-1"
        {...register(name, {
          required: "必須項目です",
          pattern: {
            value: value,
            message: message,
          },
        })}
      />
    );
  } else {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-gray-300 border-2 rounded-md focus:outline-none focus:border-green-300 px-2 py-1"
        {...register(name, {
          required: "必須項目です",
          pattern: {
            value: value,
            message: message,
          },
          validate: (value: string) =>
            value === validate || "パスワードが一致しません",
        })}
      />
    );
  }
};

export default Input;
