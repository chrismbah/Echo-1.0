import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export default function Nav() {
  const [user] = useAuthState(auth);

  const signOutUser = async () => {
    await signOut(auth);
  };

  return (
    <nav className="shadow-md navbar py-1 lg:py-3 flex justify-between items-center">
      <div className={`${user ? "logo basis-1/4" : ""}`}>
        <h3 className="font-semibold text-[24px]">
          <Link to={"/"}>ECHO.</Link>
        </h3>
      </div>
      <ul
        className={`${
          user ? "basis-2/4 justify-center" : "justify-end"
        } flex-1 flex  items-center gap-5 lg:text-lg`}
      >
        <li className="hover:border-b-2 text-[15px] duration-250 border-blue-500 ">
          <Link to={"/"}>Home</Link>
        </li>
        {user ? (
          <li className=" hover:border-b-2 text-[15px] duration-250 border-blue-500">
            <Link to={"/new"}>New Post</Link>
          </li>
        ) : (
          <li className=" hover:underline text-[15px] decoration-blue-500">
            <Link to={"/login"}>Login</Link>
          </li>
        )}
      </ul>
      {user && (
        <div
          className={` ${
            user ? "basis-1/4" : ""
          } user flex items-center justify-center gap-[5px]`}
        >
          <p className="text-sm lg:text-md">{user?.displayName}</p>
          <img
            src={user?.photoURL || ""}
            alt="userImage"
            className="rounded-full w-[30px] h-[30px] mr-2"
          />
          <button className="auth-btn ml-2" onClick={signOutUser}>
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
}
