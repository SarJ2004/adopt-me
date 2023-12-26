import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
// despite being a different part of application, the modal is still being rendered above root(use inspect)
const Modal = ({ children }) => {
  const elRef = useRef(null); //null by default
  //   ref is like if we have a piece of something and we want the same thing back every single time
  if (!elRef.current) {
    elRef.current = document.createElement("div");
    // its going to create the save div everytime we re render
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    // this is the setup function that returns a cleanup code
    return () => modalRoot.removeChild(elRef.current);
    // this removes the div, when the modal is not being rendered
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
  //   we couldve just passed children in there, but due to the way we have used css styling, we are returning a div with the cchilren
};

export default Modal;
