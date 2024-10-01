import { MdLocationOn } from "react-icons/md";
import useSocialIcons from "../hooks/useSocialIcons";

interface SocialIconProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const SocialIcon: React.FC<SocialIconProps> = ({ Icon }) => (
  <Icon className="cursor-pointer p-2 h-10 w-10 text-white bg-gray-400 rounded-full hover:text-white hover:bg-gray-500" />
);

const Footer = () => {
  const socialIcons = useSocialIcons();

  return (
    <section className="bg-zinc-900 pt-12 px-12">
      <div className="flex flex-wrap justify-between pb-4 border-b-0.3 border-white">
        {/* Seções do Footer */}
        <div className="flex justify-between gap-8 w-4/5">
          <NavigationSection />
          <HelpSection />
          <AboutSection />
          <BrandSection />
        </div>

        <div className="flex gap-2">
          {socialIcons.map(({ icon: Icon, key }) => (
            <SocialIcon key={key} Icon={Icon} />
          ))}
        </div>
      </div>

      <div className="flex justify-between gap-2 py-2 border-t-0.5">
        <LocationInfo />
        <Copyright />
      </div>
    </section>
  );
};

const NavigationSection = () => (
  <div>
    <ul className="text-white text-sm font-semibold flex flex-col gap-2 uppercase cursor-pointer">
      <li>Gift Cards</li>
      <li>Promoções</li>
      <li>Encontre a loja</li>
      <li>Seja um membro</li>
      <li>Nos envie seu feedback</li>
    </ul>
  </div>
);

const HelpSection = () => (
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
);

const AboutSection = () => (
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
);

const BrandSection = () => (
  <div>
    <p className="font-semibold text-white text-lg">DevTech</p>
  </div>
);

const LocationInfo = () => (
  <div className="flex items-center gap-1">
    <MdLocationOn className="text-white" />
    <p className="text-white font-semibold">Brasília - Distrito Federal</p>
  </div>
);

const Copyright = () => (
  <div className="font-thin text-[#909090]">
    <p>© 2024 DevTech Shop, Inc. Todos os Direitos Reservados</p>
  </div>
);

export default Footer;
