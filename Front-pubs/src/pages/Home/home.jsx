import { Link } from "react-router-dom";
import { easeInOut, motion } from "motion/react";
import { useState, useEffect } from "react";

import "./home.css";
import Menu from "../../components/menu";
import { validaToken } from "../../utilidades/Funções";

function Home() {
  const [end, setEnd] = useState("/Login");
  const [menu, setMenu] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function recebeMensagem() {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await validaToken("/Home");
        setMensagem(data.mensagem);
      }
    }
    recebeMensagem();
  }, []);

  useEffect(() => {
    setMensagem("Logout");
  }, [localStorage.getItem("token")]);

  useEffect(() => {
    if (mensagem == "Usuário verificado") {
      setEnd("/Create");
      setMenu(["create", "logout", "projects"]);
    } else {
      setEnd("/Login");
      setMenu(["login"]);
    }
  }, [mensagem]);

  return (
    <section className="home">
      <Menu itens={menu} />
      <motion.div
        className="box"
        id="home"
        initial={{
          y: 1000,
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
        }}
        animate={{
          y: 0,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
        exit={{ y: -1000 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div>
          <h1>Crie publicações incríveis com a ajuda da IA.</h1>
          <p>
            Gere textos prontos para redes sociais, blogs e muito mais{" "}
            <span>— com apenas um clique.</span>
          </p>
        </div>
        <div>
          <Link to={end}>
            <button id="btn_start">Começar</button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default Home;
