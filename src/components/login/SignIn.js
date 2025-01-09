// Import statements remain unchanged
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { BsGoogle } from "react-icons/bs";
import { GrLinkedinOption } from "react-icons/gr";
import classes from "styles/input-effect.module.css";
import useStore from "src/store/zustand/useStore";
import { useEffect, useRef } from "react";
import useHtttp from "src/hooks/useHttp";
import { signInAccount } from "src/hooks/lib/api";
import Modal from "../common/Modal";
import LoadingSpinner from "../common/LoadingSpinner";
import { useRouter } from "next/router";

export default function SignIn() {
  const setIsSignIn = useStore((state) => state.setIsSignIn);
  const { sendRequest, data, error, status } = useHtttp(signInAccount);
  const isShowModal = useStore((state) => state.isShowModal);
  const setShowModal = useStore((state) => state.setShowModal);
  const login = useStore((state) => state.login);
  const setEmail = useStore((state) => state.setEmail);
  const setAvatar = useStore((state) => state.setAvatar);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();

  const signInHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    sendRequest({
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    });
    setShowModal();
  };
  useEffect(() => {
    const avatars = [
      "https://i.ibb.co/zrXfKsJ/catface-7.jpg",
      "https://i.ibb.co/rd3PGq5/catface-9.png",
      "https://i.ibb.co/Htq4LWJ/catface-8.png",
      "https://i.ibb.co/9mPr2ds/catface-3.jpg",
      "https://i.ibb.co/b6TT6Y4/catface-6.jpg",
      "https://i.ibb.co/0pNx0nv/catface-4.jpg",
      "https://i.ibb.co/StzXrVH/catface.jpg",
      "https://i.ibb.co/KDdd4zN/catface-2.jpg",
      "https://i.ibb.co/stB42Nb/catface-5.jpg",
    ];
    const userAvatar =
      avatars[Math.floor(Math.random() * avatars.length - 1) + 0];
    if (status === "completed" && !error) {
      login(data.idToken);
      setEmail(data.email);
      setAvatar(userAvatar);

      router.push("/men");
    }
  }, [status, router, login, data, error, setEmail, setAvatar]);
  return (
    <>
      {error && isShowModal && (
        <Modal
          type="fail"
          title="FAILED!"
          message={`Your login is failed because ${error}`}
          action="Try again."
        />
      )}
      {!error && status === "pending" && (
        <div className="absolute-center">
          <LoadingSpinner />
        </div>
      )}
      <div
        className="absolute top-[30px] right-[30px] bg-white max-w-[600px] h-[650px] rounded-2xl
      px-12 sm:px-4"
      >
        <h1 className="font-bold text-5xl text-[#6F42C1] text-center mt-[80px] mb-7">
          Sign in to Lighthouse
        </h1>
        <div className="flex items-center justify-center gap-5 mb-12">
          <div className="h-12 w-12 rounded-full border shadow-sm flex-center">
            <FaFacebookF className="text-2xl text-[#6F42C1]" />
          </div>
          <div className="h-12 w-12 rounded-full border shadow-sm flex-center">
            <BsGoogle className="text-2xl text-[#6F42C1]" />
          </div>
          <div className="h-12 w-12 rounded-full border shadow-sm flex-center">
            <GrLinkedinOption className="text-2xl text-[#6F42C1]" />
          </div>
        </div>
        <div className="text-center text-[#343A40] tracking-widest mb-6">
          or use your email account:
        </div>
        <form onSubmit={signInHandler} className="max-w-[400px] mx-auto">
          <div
            className={`bg-[#F6F5F3] flex items-center px-3 mb-3 ${classes["input__div-effect"]}`}
          >
            <HiOutlineMail className="text-2xl text-[#343A40]" />
            <input
              type="text"
              className={`bg-transparent flex-1 py-4 px-5 outline-none font-jakarta ${classes["input__input-effect"]}`}
              placeholder="Email"
              ref={emailInputRef}
            />
            <span className={classes["input__span-effect"]} />
          </div>
          <div
            className={`bg-[#F6F5F3] flex items-center px-3 mb-5 ${classes["input__div-effect"]}`}
          >
            <RiLockPasswordLine className="text-2xl text-[#343A40]" />
            <input
              type="password"
              className={`bg-transparent flex-1 py-4 px-5 outline-none font-jakarta ${classes["input__input-effect"]}`}
              placeholder="Password"
              ref={passwordInputRef}
            />
            <span className={classes["input__span-effect"]} />
          </div>
          <div className="mt-5 text-center text-[#343A40] mb-8">
            <button className="text-[#6F42C1] hover:text-[#343A40] transition">
              Forget your password?
            </button>
          </div>
          <button
            type="submit"
            className="uppercase bg-[#6F42C1] text-white font-extrabold text-xl 
                shadow-md rounded-full
                active:shadow-sm active:scale-[.98] active:translate-y-0 
                active:bg-[#5A32A0]
                hover:bg-[#ddcefb] hover:text-[#343A40] 
                hover:-translate-y-[2px] 
                transition-all duration-[250ms] 
                z-10 relative overflow-hidden 
                py-5 px-20
                mx-auto block
                group"
          >
            Sign In
            <div
              className="-z-10 bg-[#ffffff33] 
                  absolute top-[-1000%] bottom-[-375%] 
                  w-9 
                  translate3d-rotate group-hover:transition group-hover:duration-[1000ms] group-hover:ease-in-out group-hover:translate3d-rotate-hover"
            ></div>
          </button>
        </form>
        <div className="mt-5 text-center text-[#343A40]">
          Don&apos;t have any accounts?
          <button
            className="text-[#6F42C1] hover:text-[#ddcefb] transition"
            onClick={setIsSignIn.bind(null, false)}
          >
            &nbsp; Sign up
          </button>
        </div>
      </div>
    </>
  );
}
