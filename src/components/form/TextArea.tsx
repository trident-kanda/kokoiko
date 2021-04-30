const TextArea = ({ register, name }: any) => {
  return (
    <textarea
      {...register(name, { required: "必須項目です。" })}
      className="block w-full focus:outline-none focus:border-green-500 p-1 border-gray-500 border-2 rounded"
    ></textarea>
  );
};

export default TextArea;
