type labelProps = {
  name: string;
  errors: any;
};
const ErrorLabel = ({ name, errors }: labelProps) => {
  return (
    <label className="text-lg font-bold text-gray-700 ">
      {name}
      {errors.detailsPlace && (
        <span className="text-lg font-bold text-red-500 ml-2">
          {errors.detailsPlace.message}
        </span>
      )}
    </label>
  );
};

export default ErrorLabel;
