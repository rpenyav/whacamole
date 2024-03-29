import { FC, ReactNode, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { backFlores, exit, ribbon } from "../assets";

interface LayoutProps {
  children: ReactNode;
}

const variants = {
  initial: { x: "100%" },
  enter: {
    x: "0%",
    transition: { duration: 0.4, ease: [0.48, 0.15, 0.25, 0.96] },
  },
  exit: {
    x: "-100%",
    transition: { duration: 0.4, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleGotoWallOfFame = () => {
    navigate("/scores");
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background-image",
      `url(${backFlores})`
    );
  }, []);

  return (
    <div className="verticality back-flowers">
      <header className="bg-dark">
        <div className="jumbo-title text-center">Whac-A-Mole</div>
      </header>
      <main className="text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={window.location.pathname}
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="d-flex justify-content-between pb-3 ps-4 pe-4">
        <div>
          rpenyav 2023
          <img
            onClick={handleLogout}
            className="ms-3 icon-exit"
            src={exit}
            alt="exit/disconnect"
          />
        </div>

        <div className="pintetpointer" onClick={handleGotoWallOfFame}>
          <img
            className="ms-3 icon-exit"
            src={ribbon}
            alt="got to wall of fame"
          />{" "}
          View Wall of fame
        </div>
      </footer>
    </div>
  );
};

export default Layout;
