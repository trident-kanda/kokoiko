type props = {
  color: string;
};

const RecruitIcon = ({ color }: props) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="featherIconTitle"
      stroke={color}
      color="gray"
    >
      <path d="M5.126 17A15.84 15.84 0 005 19v2m.126-4C6.034 9.869 11.76 4 20 4l-1 4h-3l1 2-2 2h-4l2 2-1 2H8l-2.874 1z" />
    </svg>
  );
};

export default RecruitIcon;
