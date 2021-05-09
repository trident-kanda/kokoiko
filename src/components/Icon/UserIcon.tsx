type props = {
  color: string;
  width: string | number;
  height: string | number;
};
const UserIcon = ({ color, width, height }: props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      aria-labelledby="peopleIconTitle"
      stroke={color}
      fill="none"
      color="gray"
    >
      <path d="M1 18c0-2.25 3-2.25 4.5-3.75.75-.75-1.5-.75-1.5-4.5C4 7.25 5 6 7 6s3 1.25 3 3.75c0 3.75-2.25 3.75-1.5 4.5C10 15.75 13 15.75 13 18m-.208-2.273c.492-.179.895-.344 1.21-.495.55-.265 1.082-.566 1.498-.982.75-.75-1.5-.75-1.5-4.5C14 7.25 15 6 17 6s3 1.25 3 3.75c0 3.75-2.25 3.75-1.5 4.5C20 15.75 23 15.75 23 18" />
    </svg>
  );
};

export default UserIcon;
