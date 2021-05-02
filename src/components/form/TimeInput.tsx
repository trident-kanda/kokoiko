const TimeInput = ({ register }: any) => {
  return (
    <input
      className="block w-full focus:outline-none focus:border-green-500 p-1 border-gray-500 border-2 rounded"
      {...register("time", {
        required: "必須項目です。",
        pattern: {
          value: /^([01][0-9]|2[0-3]):[0-5][0-9]$/,
          message: "正しい時刻を入力してください。",
        },
      })}
      placeholder="08:00"
    />
  );
};

export default TimeInput;
