type props = {
  register: any;
  name: string;
  length?: number;
  placeholder?: string;
};

const TextArea = ({ register, name, length, placeholder }: props) => {
  return (
    <textarea
      {...register(name, { required: "必須項目です。" })}
      className="block w-full focus:outline-none focus:border-green-500 border-gray-500 border rounded px-2 py-1"
      maxLength={length}
      placeholder={placeholder}
    ></textarea>
  );
};

export default TextArea;
