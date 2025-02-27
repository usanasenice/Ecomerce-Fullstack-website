import React, { useState, useRef } from "react";
import { useAppSelector } from "src/store/redux-toolkit/hooks";
import classes from "styles/input-effect.module.css";
import useStore from "src/store/zustand/useStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import thankU from "assets/thankyou2.png";
import Image from "next/image";
import { Transition } from "react-transition-group";
import "animate.css";

const PROMOCODE = ["111", "222", "333", "444", "555", "666", "777", "888", "999"];

export default function CartSummary() {
  const cartState = useAppSelector((state) => state.cart);
  const [shippingState, setShippingState] = useState("standard");
  const [promo, setPromo] = useState("");
  const inputPromoRef = useRef<HTMLInputElement>(null);
  const nodeRef = useRef(null);

  const ShippingHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShippingState(e.target.value);
  };

  const shippingFee =
    shippingState === "standard" ? 4 : shippingState === "express" ? 7 : 0;

  const PromoHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enterPromo = inputPromoRef.current!.value;
    if (enterPromo.trim().length === 0) {
      return;
    }
    setPromo(enterPromo);
  };

  let promoFee = 0;
  if (PROMOCODE.includes(promo)) {
    promoFee = +promo[0] * 10;
  }

  const finalPrice = cartState.totalAmount + shippingFee - promoFee;
  const isLoggedIn = useStore((state) => !!state.tokenId);
  const router = useRouter();
  const [showThankU, setShowThankU] = useState(false);

  const handleCheckout = () => {
    if (!isLoggedIn) {
      toast.error("You have to log in to checkout!", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
      return;
    }
    setShowThankU(true);
  };

  const closeBackdrop = () => {
    setShowThankU(false);
  };

  return (
    <div className="pl-11 pr-4 text-purple-900">
      <ToastContainer />
      <h2
        className="text-2xl font-semibold pb-12 mb-[40px] mt-[44px] border-b-2"
        style={{ borderColor: "#FADADD" }}
      >
        Order Summary
      </h2>
      <div className="flex-between mb-10">
        <p className="font-medium text-black">
          ITEMS: <span className="font-bold">{cartState.totalQuantity}</span>
        </p>
        <p className="font-semibold text-xl">{`$${+cartState.totalAmount.toFixed(2)}`}</p>
      </div>
      <div className="pb-14 border-b-2 mb-7" style={{ borderColor: "#FADADD" }}>
        <div className="mb-10">
          <label
            htmlFor="shipping"
            className="block mb-7 font-medium text-black"
          >
            SHIPPING
          </label>
          <select
            id="shipping"
            name="shipping"
            onChange={ShippingHandler}
            className="w-full rounded-md py-4 px-5 shadow-sm text-purple-800 outline-none"
            style={{ color: "#d3d3d3" }} // Light grey text
          >
            <option value="standard">Standard Delivery - $4.00</option>
            <option value="express">Express Delivery - $7.00</option>
            <option value="no-money">I Have No Money</option>
          </select>
        </div>
        <form>
          <label
            htmlFor="code"
            className="block mb-7 font-medium text-black"
          >
            PROMO CODE
          </label>
          <div className={`${classes["input__div-effect"]} mb-5`}>
            <input
              id="code"
              type="text"
              name="code"
              className={`w-full rounded-md py-4 px-5 shadow-sm outline-none text-sm text-purple-800 ${classes["input__input-effect"]}`}
              placeholder="Enter 111 or 222 or 333... to see discount"
              ref={inputPromoRef}
            />
            <span className={`${classes["input__span-effect"]}`}></span>
          </div>
          <button
            onClick={PromoHandler}
            type="submit"
            className="bg-[#FADADD] text-purple-900 font-medium rounded-sm shadow-sm py-3 px-5 hover:bg-[#DDCEFB] transition"
          >
            APPLY
          </button>
          {PROMOCODE.includes(promo) && (
            <p className="mt-3 text-green-500">Applied promo code successfully.</p>
          )}
          {!PROMOCODE.includes(promo) && promo !== "" && (
            <p className="mt-3 text-red-500">Invalid promo code.</p>
          )}
        </form>
      </div>
      <div className="mb-10 flex-between">
        <p className="font-medium text-black">TOTAL COST</p>
        <p className="font-bold text-2xl">
          {cartState.items.length > 0 ? `$${+finalPrice.toFixed(2)}` : `$${0}`}
        </p>
      </div>
      <button
        onClick={handleCheckout}
        className="uppercase bg-purple-700 text-white font-extrabold text-xl shadow-md rounded-sm w-full py-5 hover:bg-[#DDCEFB] transition"
      >
        {shippingState === "no-money" ? "LMAO :)" : "checkout"}
      </button>
      <Transition
        in={showThankU}
        timeout={1000}
        mountOnEnter
        unmountOnExit
        nodeRef={nodeRef}
      >
        {(state) => (
          <div
            ref={nodeRef}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${
              state === "entering"
                ? "animate__animated animate__zoomIn"
                : state === "exiting"
                ? "animate__animated animate__zoomOut"
                : ""
            }`}
          >
            <Image src={thankU} alt="Thank You" />
          </div>
        )}
      </Transition>
      {showThankU && (
        <div
          onClick={closeBackdrop}
          className="fixed top-0 left-0 w-full h-full bg-black/70 z-40"
        ></div>
      )}
    </div>
  );
}
