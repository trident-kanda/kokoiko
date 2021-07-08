import DeleteIcon from "./Icon/DeleteIcon";
type props = {
  id: string;
  name: string;
  deleteList: (id: string) => void;
};
const FriendView = ({ id, name, deleteList }: props) => {
  return (
    <div className=" bg-gray-100 rounded-md flex p-5 my-4 items-center">
      <h2 className=" text-lg w-1/2">名前:{name}</h2>
      <h2 className="  text-lg w-5/12">ID:{id}</h2>
      <DeleteIcon
        width="25"
        height="25"
        color={"rgb(107, 114, 128)"}
        id={id}
        deleteList={deleteList}
      />
    </div>
  );
};

export default FriendView;
