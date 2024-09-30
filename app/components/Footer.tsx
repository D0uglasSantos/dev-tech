import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";

// Lista de ícones sociais com suas respectivas chaves
const socialIcons = [
  { icon: AiOutlineTwitter, key: "twitter" },
  { icon: FaFacebookF, key: "facebook" },
  { icon: AiOutlineInstagram, key: "instagram" },
  { icon: FaThreads, key: "threads" },
  { icon: AiFillYoutube, key: "youtube" },
];

interface SocialIconProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// Componente para exibir um ícone social
const SocialIcon: React.FC<SocialIconProps> = ({ Icon }) => (
  <Icon className="cursor-pointer p-2 h-10 w-10 text-white bg-violet-600 rounded-full hover:text-white hover:bg-violet-400" />
);

const Footer = () => {
  return (
    <section className="bg-black pt-12 px-12">
      <div className="flex flex-wrap justify-between pb-4 border-b-0.3 border-white">
        {/* Seções do Footer */}
        <div className="flex justify-between gap-8 w-4/5">
          {/* Links de navegação */}
          <div>
            <ul className="text-white text-sm font-semibold flex flex-col gap-2 uppercase cursor-pointer">
              <li>Gift Cards</li>
              <li>Promoções</li>
              <li>Encontre a loja</li>
              <li>Seja um membro</li>
              <li>Nos envie seu feedback</li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-col gap-2 cursor-pointer">
              <li className="font-semibold text-white">Obtenha ajuda</li>
              <li className="text-sm font-medium text-gray-400 hover:text-white transition-all">
                Status do pedido
              </li>
              <li className="text-sm font-medium text-gray-400 hover:text-white transition-all">
                Devoluções
              </li>
              <li className="text-sm font-medium text-gray-400 hover:text-white transition-all">
                Cancelamento de pedido
              </li>
              <li className="text-sm font-medium text-gray-400 hover:text-white transition-all">
                Contate-nos
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-col gap-1 cursor-pointer">
              <li className="font-semibold text-white">Já era hora</li>
              <li className="text-sm font-medium text-gray-400 hover:text-white transition-all">
                Novos
              </li>
              <li className="text-sm font-medium text-gray-400 hover:text-white transition-all">
                Carreiras
              </li>
              <li className="text-sm font-medium text-gray-400 hover:text-white transition-all">
                Investidores
              </li>
              <li className="text-sm font-medium text-gray-400 hover:text-white transition-all">
                Propósito
              </li>
              <li className="text-sm font-medium text-gray-400 hover:text-white transition-all">
                Sustentabilidade
              </li>
            </ul>
          </div>
          <div>
            <p className="uppercase font-semibold text-white">
              Store <span className="text-violet-600">dev__</span>
            </p>
          </div>
        </div>

        {/* Ícones sociais */}
        <div className="flex gap-2">
          {socialIcons.map(({ icon: Icon, key }) => (
            <SocialIcon key={key} Icon={Icon} />
          ))}
        </div>
      </div>

      {/* Informações de localização e direitos autorais */}
      <div className="flex justify-between gap-2 py-2 border-t-2">
        <div className="flex items-center gap-1">
          <MdLocationOn className="text-white" />
          <p className="text-white font-semibold">
            Brasília - Distrito Federal
          </p>
        </div>
        <div className="font-thin text-[#909090]">
          <p>© 2024 Store Dev Shop, Inc. Todos os Direitos Reservados</p>
        </div>
      </div>
    </section>
  );
};

export default Footer; // Exporta o componente Footer
