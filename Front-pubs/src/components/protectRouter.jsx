import { Navigate, Outlet } from "react-router-dom";
import { validaToken } from "../utilidades/Funções";
import { useEffect, useState } from "react";

export function ProtectRoutes() {
  const [mensagem, setMensagem] = useState("");
  const [verificado, setVerificado] = useState("loading");
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    async function validar_JWT() {
      const token = localStorage.getItem("token");
      try {
        if (token) {
          const data = await validaToken("/Auth");
          setMensagem(data.mensagem);
        } else {
          setMensagem("Token inválido");
        }
      } catch (error) {
        setMensagem("Token inválido");
      }
    }
    validar_JWT();
  }, [repeat]);

  useEffect(() => {
    if (mensagem == "Usuário verificado") setVerificado("loaded");
    else if (mensagem !== "") {
      setVerificado("error");
    } else if (mensagem == "") {
      setRepeat(!repeat);
    }
  }, [mensagem]);

  if (verificado == "error") {
    return <Navigate to="/Home" replace />;
  } else if (verificado == "loaded") {
    return <Outlet />;
  }
}
