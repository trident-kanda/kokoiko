const PeopleSelect = ({ register }: any) => {
  const peopleArray = [1, 2, 3, 4, 5];
  return (
    <select
      {...register("numberPeople")}
      className="block w-full focus:outline-none focus:border-green-500 p-1 border-gray-500 border-2 rounded"
    >
      {peopleArray.map((number) => {
        return (
          <option key={number} value={number}>
            {number}人
          </option>
        );
      })}
    </select>
  );
};

export default PeopleSelect;
