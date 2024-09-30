import { IoSearch } from "react-icons/io5"; // Importa o ícone de busca

const Search = () => {
  return (
    <div className="flex justify-between items-center w-1/3 h-10 px-4 bg-white border border-violet-700 rounded-sm shadow-sm cursor-pointer">
      <input
        className="px-3 py-3 bg-transparent text-gray-600 
          focus:outline-none text-base placeholder:text-base placeholder:text-gray-600"
        placeholder="Search" 
      />
      <IoSearch className="w-5 h-5 text-gray-500" /> {/* Ícone de busca */}
    </div>
  );
};

export default Search; // Exporta o componente Search
