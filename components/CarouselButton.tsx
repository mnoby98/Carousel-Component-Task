"use client";
import { ReactNode } from "react";

interface button {
  swipFun: () => void;
  children: ReactNode;
}
const Button = ({ swipFun, children }: button) => {
  return (
    <button
      onClick={swipFun}
      className=" bg-white z-10 flex justify-center items-center hover:bg-slate-100 text-xl  w-12 h-10 border rounded-full">
      {children}
    </button>
  );
};

export default Button;
