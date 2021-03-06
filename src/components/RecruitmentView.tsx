import Link from "next/link";

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
        <Link href={`/recruitment/${id}`}>
          <a className="text-xl bg-green-300 py-1  text-white text-center block">
            {title}
          </a>
        </Link>
        <div className="bg-gray-50 h-40 ">
          <Link href={`/recruitment/${id}`}>
            <a className="text-gray-200 text-3xl  h-full w-full flex items-center justify-center">
              <p>NoImage</p>
            </a>
          </Link>
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
