type labelProps = {
  name: string;
  errors: any;
};
const ErrorLabel = ({ name, errors }: labelProps) => {
  console.log(errors);
  return (
    <label className="text-lg font-bold text-gray-700 ">
      {name}
      {errors && (
        <span className="text-lg font-bold text-red-500 ml-2">
          {errors.message}
        </span>
      )}
    </label>
  );
};

export default ErrorLabel;
