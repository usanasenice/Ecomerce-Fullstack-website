import SignIn from "./SignIn";
import SignUp from "./SignUp";
import useStore from "src/store/zustand/useStore";

export default function Login() {
  const isSignIn = useStore((state) => state.isSignIn);

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
         backgroundImage: "url('./Background/background.jpg')" 
      }}
    >
      {isSignIn ? <SignIn /> : <SignUp />}
    </div>
  );
}
