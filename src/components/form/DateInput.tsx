const DateInput = ({ register }: any) => {
  return (
    <input
      className="block w-full focus:outline-none focus:border-green-500 border-gray-500 border rounded px-2 py-1"
      {...register("date", {
        required: "必須項目です。",
        pattern: {
          value: /^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/,
          message: "正しい日付を入力してください。",
        },
      })}
      placeholder="2020/01/31"
      autoComplete="off"
      maxLength="10"
    />
  );
};

export default DateInput;
