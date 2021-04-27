type props = {
  color: string;
};
const HomeIcon = ({ color }: props) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="homeAlt2IconTitle"
      stroke={color}
      fill="none"
      color="gray"
    >
      <path d="M2 12l3-2.7M22 12l-3-2.7m0 0L12 3 5 9.3m14 0V21H5V9.3" />
    </svg>
  );
};

export default HomeIcon;
