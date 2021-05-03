const TextArea = ({ register, name }: any) => {
  return (
    <textarea
      {...register(name, { required: "必須項目です。" })}
      className="block w-full focus:outline-none focus:border-green-500 border-gray-500 border-2 rounded px-2 py-1"
    ></textarea>
  );
};

export default TextArea;
