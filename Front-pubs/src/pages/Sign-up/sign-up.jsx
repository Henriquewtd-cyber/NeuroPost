import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import Aviso from "../../components/aviso";
import Menu from "../../components/menu";
import "./sign-up.css";

import { useNavigate } from "react-router-dom";

function Sign() {
  const navigate = useNavigate();

  const inputNome = useRef();
  const inputEmail = useRef();
  const inputSenha = useRef();
  const inputSenha2 = useRef();

  const [mostrar_aviso, setMostrarAviso] = useState(false);
  const [checked, setchecked] = useState(false);
  const [corAviso, setCor] = useState("red");
  const [mensagem, setMensagem] = useState("a");
  const [loading, setLoading] = useState(false);

  function check_box() {
    setchecked(!checked);
  }

  function next() {
    const timer = setTimeout(() => {
      navigate("/Login");
    }, 4000);
    return () => clearTimeout(timer);
  }

  function verifica_dados(nome, email, senha, senha2) {
    if (senha != senha2) {
      setMensagem("As senhas devem ser iguais");
      setCor("red");
      return false;
    }
    if (!checked) {
      setMensagem("Aceite os termos para seguir");
      setCor("red");
      return false;
    }
    if (nome.length != 0 && email.length != 0 && senha.length != 0) {
      setCor("green");
      return true;
    } else {
      setMensagem("Preencha os dados corretamente");
      setCor("red");
      return false;
    }
  }

  async function sign_up(event) {
    event.preventDefault();

    let nome = inputNome.current.value;
    let email = inputEmail.current.value;
    let senha = inputSenha.current.value;
    let senha2 = inputSenha2.current.value;

    if (verifica_dados(nome, email, senha, senha2)) {
      setLoading(true);

      const res = await api.post("/Sign-up", {
        nome,
        email,
        senha,
      });

      if (res.data.mensagem == "Usuário cadastrado com sucesso.") {
        setMensagem("Usuário cadastrado com sucesso");
        setCor("green");
        setMostrarAviso(true);
        next();
      }
    } else {
      setMostrarAviso(true);
    }

    setLoading(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarAviso(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [mostrar_aviso]);

  return (
    <section className="cadastro" id="cadastro">
      <Aviso mensagem={mensagem} mostrar={mostrar_aviso} cor={corAviso}></Aviso>
      <Menu itens={[""]} />

      <form onSubmit={sign_up} id="sign-up-form">
        <motion.div
          className="box"
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
          <h1>Cadastrar</h1>

          <div className="nome">
            <input type="text" placeholder="Nome" ref={inputNome} />
            <i className="bi bi-person-fill"></i>
          </div>

          <div className="email">
            <input type="email" placeholder="Email" ref={inputEmail} />
            <i className="bi bi-envelope-fill"></i>
          </div>

          <div className="senha">
            <input type="password" placeholder="Senha" ref={inputSenha} />
            <i className="bx  bx-lock-keyhole-open"></i>
            <i className="bi bi-lock-fill"></i>
          </div>

          <div className="senha">
            <input
              type="password"
              placeholder="Confirmar senha"
              ref={inputSenha2}
            />
            <i className="bi bi-lock-fill"></i>
          </div>

          <div className="accept">
            <label>
              <input type="checkbox" onChange={check_box} />
              <p>Aceito todos os </p>
              <a href="#"> termos de privacidade</a>
            </label>
          </div>

          <div className="btn">
            <button type="submit">Cadastrar</button>
          </div>

          <div className="login-up">
            <p>Já possuí uma conta?</p>
            <Link to={"/Login"}>
              <p className="link">Entrar</p>
            </Link>
          </div>

          <div className="loaderDiv">
            {loading && <div className="loader"></div>}
          </div>
        </motion.div>
      </form>
    </section>
  );
}

export default Sign;
