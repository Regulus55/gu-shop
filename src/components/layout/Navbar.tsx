import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuDesktop from "./MenuDesktop";
import { classNames } from "../../utiles/utiles";
import axios from "axios";

interface profileType {
  isAdmin?: boolean;
  roles?: string[];
}

const Navbar = () => {
  // 어드민인지 확인하는 부분
  const [profileInfo, setProfileInfo] = useState<profileType | null>(null);
  const getProfileData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const result = await axios.get("http://localhost:8000/api/auth", config);
      setProfileInfo(result.data.body);
      // console.log('result', result.data.body)
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);

  const navigate = useNavigate();
  const userData = null;
  // const isAdmin = profileInfo?.roles?.includes("admin") ?? false;
  const isAdmin = true;
  const loading = false;
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const logout = () => {};
  const onMouseEnter = () => {};
  const onMouseLeave = () => {};

  return (
    <header className="sticky top-0 left-0 w-full bg-white shadow z-50 border-b">
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
