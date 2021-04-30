type labelProps = {
  name: String;
};
const Label = ({ name }: labelProps) => {
  return <label className="text-lg font-bold text-gray-700 ">{name}</label>;
};

export default Label;
