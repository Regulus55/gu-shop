import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuDesktop from "./MenuDesktop";
import { classNames } from "../../utiles/utiles";

const Navbar = () => {
  const navigate = useNavigate();
  const userData = null;
  const isAdmin = true; //관리자
  const loading = false;
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const logout = () => {};
  const onMouseEnter = () => {};
  const onMouseLeave = () => {};

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50 border-b">
      <MenuDesktop
        classNames={classNames}
        setOpen={setOpen}
        navigate={navigate}
        userData={userData}
        loading={loading}
        logout={logout}
        isAdmin={isAdmin}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={buttonRef}
      />
    </header>
  );
};

export default Navbar;
