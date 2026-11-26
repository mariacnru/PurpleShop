import { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import authContext from "../../../context/authContext";
import { useNavigate } from "react-router";

const Logout = () => {
  const { Logout, refreshUser } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Logout();
    } catch (error) {
      console.log(error);
    } finally {
      refreshUser();
      navigate("/auth", { replace: true });
    }
  };

  return (
    <footer className="p-3 w-full group" onClick={handleLogout}>
      <button className="flex items-center gap-3 duration-150 transition-all bg-zinc-500/20 group-hover:bg-red-500/20 p-1.5 rounded-lg group relative w-full cursor-pointer">
        <span className="w-1 absolute top-0 rounded-full opacity-50 bottom-0 my-auto -right-1 h-[80%] z-0" />

        <div className="size-10 rounded-lg group-hover:text-red-500 flex items-center text-gray-200 justify-center text-xl relative overflow-hidden">
          <span className="size-full bg-gray-200 absolute z-0 opacity-15 inset-0"></span>
          <BiLogOut />
        </div>
        <span className="text-sm text-zinc-200 group-hover:text-red-500">
          خروج از حساب
        </span>
      </button>
    </footer>
  );
};

export default Logout;
