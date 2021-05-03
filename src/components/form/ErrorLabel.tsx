type labelProps = {
  name: string;
  error: any;
  anotherError?: string | null;
  required?: true;
};
const ErrorLabel = ({ name, error, anotherError, required }: labelProps) => {
  return (
    <label className="text-lg font-bold text-gray-700 ">
      {name}
      {required && <span className=" text-red-500">*</span>}
      {error && (
        <span className="text-lg font-bold text-red-500 ml-2">
          {error.message}
        </span>
      )}
      {anotherError && (
        <span className="ml-3 text-red-500">{anotherError}</span>
      )}
    </label>
  );
};

export default ErrorLabel;
