import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

interface BannerProps {}

const Banner = ({}: BannerProps) => {
  return (
    <div className="h-72 flex justify-evenly bg-custom-gradient items-center">
      <BannerText />
      <BannerActions />
    </div>
  );
};

// Componente para o texto do banner
const BannerText = () => (
  <div className="uppercase text-white font-extrabold text-left flex flex-col gap-2">
    <h3 className="text-4xl">Prontos para a maior</h3>
    <h1 className="text-8xl text-blue-950">promoção</h1>
    <h2 className="text-6xl">
      <span className="text-blue-950 text-7xl">30%</span> off
    </h2>
  </div>
);

// Componente para as ações do banner
const BannerActions = () => (
  <div className="flex flex-col justify-center items-center gap-4">
    <button className="bg-blue-600 hover:bg-blue-400 transition-all border-0.5 rounded-sm border-blue-400 uppercase text-2xl text-white font-bold px-6 py-2">
      compre agora
    </button>
    <p className="text-white text-lg font-bold uppercase">www.devtech.com.br</p>
  </div>
);

export default Banner;
