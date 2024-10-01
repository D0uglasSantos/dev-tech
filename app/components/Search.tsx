import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <div className="flex justify-between items-center w-2/5 h-10 px-4 bg-gray-700 borde rounded-3xl shadow-sm cursor-pointer">
      <input
        className="px-3 py-3 bg-transparent text-gray-400 
          focus:outline-none text-base placeholder:text-base placeholder:text-gray-400 placeholder:font-light"
        placeholder="Encontre seu produto"
      />
      <IoSearch className="w-5 h-5 text-white" />
    </div>
  );
};

export default Search;
