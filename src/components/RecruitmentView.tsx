type props = {
  title: string;
  date: string;
  name: string;
  overview: string;
  id: number;
};
const RecruitmentView = ({ title, date, name, overview, id }: props) => {
  return (
    <div className="w-full sm:w-1/2 p-2 border-gray-500 ">
      <div className="shadow h-full">
        <h2 className="text-xl bg-green-300 py-1  text-white text-center">
          {title}
        </h2>
        <div className="bg-gray-50 h-40 flex justify-center items-center">
          <p className="text-gray-200 text-3xl">NoImage</p>
        </div>
        <div className="p-1">
          <div className="flex justify-between">
            <a className="text-left">{date}</a>
            <a className="text-right">{name}</a>
          </div>
          <p className="break-words ">{overview}</p>
        </div>
      </div>
    </div>
  );
};
export default RecruitmentView;
