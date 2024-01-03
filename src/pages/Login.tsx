import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
export default function Login() {
  // const user = useAuthState(auth);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  return (
    <div className="section">
      <p className="mb-2">Sign In with Google To Continue</p>
      <div className="flex justify-start gap-4">
        <button className="auth-btn" onClick={signInWithGoogle}>
          Sign In
        </button>

        <button className="auth-btn" onClick={signOutUser}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
