import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import { FaFacebookF, FaThreads } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";

const useSocialIcons = () => {
  return [
    { icon: AiOutlineTwitter, key: "twitter" },
    { icon: FaFacebookF, key: "facebook" },
    { icon: AiOutlineInstagram, key: "instagram" },
    { icon: FaThreads, key: "threads" },
    { icon: AiFillYoutube, key: "youtube" },
  ];
};

export default useSocialIcons;
