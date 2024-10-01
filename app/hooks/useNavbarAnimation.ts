const useNavbarAnimation = () => {
  const navbarAnimation = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return navbarAnimation;
};

export default useNavbarAnimation;
