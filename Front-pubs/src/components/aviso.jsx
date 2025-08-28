import { useEffect, useRef } from "react";
import "./aviso.css";

function Aviso({ mensagem, mostrar, cor }) {
  const avisoRef = useRef(null);

  useEffect(() => {
    let aviso = document.querySelector(".error");


    function abrir() {
      aviso.classList.add("open");
    }
    function fechar() {
      aviso.classList.remove("open");
    }

    if (mostrar) {
      abrir();

      const timer = setTimeout(() => {
        fechar();
      }, 3000);
      mostrar = false
      return () => clearTimeout(timer); // boa prática para evitar vazamentos
    }
  }, [mostrar]);

  return (
    <div className="error" style={{ border: "1px solid " + cor}}ref={avisoRef}>
      <i className="bi bi-x-circle"></i>
      <h1>{mensagem}</h1>
    </div>
  );
}

export default Aviso;
