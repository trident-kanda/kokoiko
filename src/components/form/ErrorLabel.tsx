type labelProps = {
  name: string;
  error: any;
};
const ErrorLabel = ({ name, error }: labelProps) => {
  return (
    <label className="text-lg font-bold text-gray-700 ">
      {name}
      {error && (
        <span className="text-lg font-bold text-red-500 ml-2">
          {error.message}
        </span>
      )}
    </label>
  );
};

export default ErrorLabel;
