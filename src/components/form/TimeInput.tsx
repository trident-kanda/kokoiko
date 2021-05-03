const TimeInput = ({ register }: any) => {
  return (
    <input
      className="block w-full focus:outline-none focus:border-green-500  border-gray-500 border-2 rounded px-2 py-1"
      {...register("time", {
        required: "必須項目です。",
        pattern: {
          value: /^([01][0-9]|2[0-3]):[0-5][0-9]$/,
          message: "正しい時刻を入力してください。",
        },
      })}
      placeholder="08:00"
      autoComplete="off"
    />
  );
};

export default TimeInput;
