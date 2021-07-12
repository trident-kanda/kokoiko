type props = {
  title: string;
};
const RecruitmentView = ({ title }: any) => {
  return (
    <div className="w-full sm:w-1/2 p-2">
      <h2 className="text-xl bg-green-300 py-1  text-white text-center">
        {title}
      </h2>
    </div>
  );
};
export default RecruitmentView;
