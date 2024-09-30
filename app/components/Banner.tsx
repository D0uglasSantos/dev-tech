import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

interface BannerProps {}

const Banner = ({}: BannerProps) => {
  return (
    <div className="h-screen flex justify-evenly bg-black items-center">
      <BannerText />
      <BannerActions />
      <AnimatedArrow />
    </div>
  );
};

// Componente para o texto do banner
const BannerText = () => (
  <div className="uppercase text-violet-600 font-extrabold text-left flex flex-col gap-2">
    <h3 className="text-4xl">Prontos para a maior</h3>
    <h1 className="text-8xl">promoção</h1>
    <h2 className="text-6xl">
      <span className="text-violet-400 text-7xl">30%</span> off
    </h2>
  </div>
);

// Componente para as ações do banner
const BannerActions = () => (
  <div className="flex flex-col justify-center items-center gap-4">
    <button className="bg-violet-600 hover:bg-violet-400 transition-all border-0.5 rounded-sm border-violet-400 uppercase text-2xl text-white font-bold px-6 py-2">
      compre agora
    </button>
    <p className="text-white text-lg font-bold uppercase">
      www.storedev.com.br
    </p>
  </div>
);

// Componente para a seta animada
const AnimatedArrow = () => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [0, 12, 0] }}
    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    style={{ position: "absolute", bottom: "85px" }}
  >
    <IoIosArrowDown className="text-white text-7xl" />
  </motion.div>
);

export default Banner;
