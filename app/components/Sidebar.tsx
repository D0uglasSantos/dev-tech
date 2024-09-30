import { useState } from "react"; // Importa o hook useState do React
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Importa ícones para o dropdown
import { motion, AnimatePresence } from "framer-motion"; // Importa animações do framer-motion

// Define a interface para as propriedades do Dropdown
interface DropdownProps {
  title: string; // Título do dropdown
  options: string[]; // Opções do dropdown
  isOpen: boolean; // Estado de abertura do dropdown
  toggle: () => void; // Função para alternar o estado de abertura
}

// Componente Dropdown
const Dropdown = ({ title, options, isOpen, toggle }: DropdownProps) => (
  <li className="border-b border-gray-600 pb-2">
    <button
      onClick={toggle} // Chama a função de alternar ao clicar
      className="w-full flex justify-between items-center text-left font-medium focus:outline-none"
    >
      {title}
      {isOpen ? <FiChevronUp /> : <FiChevronDown />}{" "}
      {/* Exibe o ícone correspondente */}
    </button>
    <AnimatePresence>
      {isOpen && ( // Exibe as opções se o dropdown estiver aberto
        <motion.ul
          initial={{ opacity: 0, height: 0 }} // Animação inicial
          animate={{ opacity: 1, height: "auto" }} // Animação ao abrir
          exit={{ opacity: 0, height: 0 }} // Animação ao fechar
          transition={{ duration: 0.3 }} // Duração da animação
          className="mt-2 ml-4 space-y-2 text-sm"
        >
          {options.map((option) => (
            <li key={option} className="flex items-center">
              <input type="checkbox" className="mr-2" />{" "}
              {/* Checkbox para cada opção */}
              {option}
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  </li>
);

// Componente Sidebar
const Sidebar = () => {
  // Estado para controlar a abertura de cada seção do dropdown
  const [open, setOpen] = useState({
    categorias: false,
    marca: false,
    utilidade: false,
    tipo: false,
    genero: false,
    preco: false,
  });

  // Função para alternar a abertura de uma seção do dropdown
  const toggleDropdown = (section: keyof typeof open) => {
    setOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section], // Inverte o estado da seção clicada
    }));
  };

  return (
    <div className="w-64 bg-black p-4 h-screen">
      <ul className="text-white space-y-4">
        {/* Renderiza os dropdowns */}
        <Dropdown
          title="Categorias"
          options={["Roupas", "Calçados", "Acessórios", "Tecnologias"]}
          isOpen={open.categorias}
          toggle={() => toggleDropdown("categorias")}
        />
        <Dropdown
          title="Marca"
          options={[
            "Nike",
            "Adidas",
            "Puma",
            "Sandisk",
            "SP",
            "WD",
            "Acer",
            "Slim Clothes",
          ]}
          isOpen={open.marca}
          toggle={() => toggleDropdown("marca")}
        />
        <Dropdown
          title="Utilidade"
          options={["Esportivo", "Casual", "Trabalho", "Tecnologia"]}
          isOpen={open.utilidade}
          toggle={() => toggleDropdown("utilidade")}
        />
        <Dropdown
          title="Tipo"
          options={["Masculino", "Feminino", "Unissex"]}
          isOpen={open.tipo}
          toggle={() => toggleDropdown("tipo")}
        />
        <Dropdown
          title="Gênero"
          options={["Homem", "Mulher", "Crianças"]}
          isOpen={open.genero}
          toggle={() => toggleDropdown("genero")}
        />
        <Dropdown
          title="Preço"
          options={["Abaixo de R$100", "R$100 - R$200", "Acima de R$200"]}
          isOpen={open.preco}
          toggle={() => toggleDropdown("preco")}
        />
      </ul>
    </div>
  );
};

export default Sidebar; // Exporta o componente Sidebar
