interface DropdownProps {
  title: string;
  options: string[];
}

const SidebarItens = ({ title, options }: DropdownProps) => (
  <ul className="">
    <p className="text-lg">{title}</p>
    <li className="mt-2 ml-4 space-y-2 text-sm">
      {options.map((option) => (
        <p
          key={option}
          className="flex items-center justify-between pb-1 border-b-0.5 border-gray-400 text-gray-400"
        >
          {option}
          <input type="checkbox" className="mr-2" />{" "}
        </p>
      ))}
    </li>
  </ul>
);

const Sidebar = () => {
  return (
    <div className="w-64 bg-zinc-900 px-4 py-8 h-max">
      <ul className="text-white space-y-6">
        <SidebarItens
          title="Categorias"
          options={["SSD", "WD", "HD", "Monitor"]}
        />
        <SidebarItens
          title="Marca"
          options={["Sandisk", "SP", "WD", "Acer", "Samsung"]}
        />
        <SidebarItens
          title="Preço"
          options={["Abaixo de R$100", "R$100 - R$200", "Acima de R$200"]}
        />
      </ul>
    </div>
  );
};

export default Sidebar;
