import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import Menu from "../../components/menu";
import api from "../../services/api";

import Aviso from "../../components/aviso";
import { useNavigate } from "react-router-dom";

import "./login.css";

function Login() {
  const navigate = useNavigate();

  const inputEmail = useRef();
  const inputSenha = useRef();

  const [mostrar_aviso, setMostrarAviso] = useState(false);
  const [loading, setLoading] = useState(false);
  const [corAviso, setCor] = useState("red");
  const [mensagem, setMensagem] = useState("");

  const [manter, setManter] = useState(false);

  const openEye = "bi  bi-eye";
  const closeEye = "bi  bi-eye-slash";

  const [inputType, setInputType] = useState("password");
  const [currentEye, setCurrentEye] = useState(closeEye);

  function tooglePassword() {
    if (inputType == "password") {
      setInputType("text");
      setCurrentEye(openEye);
    } else {
      setInputType("password");
      setCurrentEye(closeEye);
    }
  }

  function voltar() {
    const timer = setTimeout(() => {
      navigate("/Home");
    }, 4000);
    return () => clearTimeout(timer);
  }

  function toogleManter() {
    setManter(!manter);
  }

  function verifica_dados(email, senha) {
    if (email.length == 0 || senha.length == 0) {
      setMensagem("Preencha todos os campos");
      setCor("red");
      setMostrarAviso(true);

      return false;
    }
    return true;
  }
  async function forgotPassword() {
    let email = inputEmail.current.value;
    if (!verifica_dados(email, "12345678")) {
      return;
    }
    try {
      setLoading(true);

      const res = await api.post("/Forgot-Password", {
        email,
      });

      if (res.data.mensagem !== "Senha enviada com sucesso") {
        setMensagem(res.data.mensagem);
        setCor("red");
        setMostrarAviso(true);
      } else {
        setMensagem("Senha nova enviada no email");
        setCor("green");
        setMostrarAviso(true);
      }
      setLoading(false);
    } catch (error) {}
  }

  async function try_login(event) {
    event.preventDefault();

    let email = inputEmail.current.value;
    let senha = inputSenha.current.value;

    if (verifica_dados(email, senha)) {
      try {
        setLoading(true);

        const res = await api.post("/Login", {
          email,
          senha,
          manter,
        });

        const token = res.data.token;

        if (token) {
          setMensagem("Login efetuado com sucesso!");
          setCor("green");
          setMostrarAviso(true);
          localStorage.setItem("token", token);
          setLoading(false);

          voltar();

          return;
        }
      } catch (error) {
        console.warn("Erro no login" + error);
        setMensagem("Alguma coisa não deu certo");
        setCor("red");
        setMostrarAviso(true);
        setLoading(false);
      }
    } else {
      setMostrarAviso(true);
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarAviso(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [mostrar_aviso]);

  return (
    <section className="login" id="login">
      <Aviso mensagem={mensagem} mostrar={mostrar_aviso} cor={corAviso}></Aviso>
      <Menu itens={[""]} />

      <form onSubmit={try_login} id="login-form">
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
          <h1>Login</h1>

          <div className="email">
            <input type="email" placeholder="Email" ref={inputEmail} />
            <i className="bi bi-person-fill"></i>
          </div>

          <div className="senha">
            <input type={inputType} placeholder="Senha" ref={inputSenha} />
            <i className={currentEye} onClick={tooglePassword}></i>
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" onClick={toogleManter} />
              <p>Manter sessão</p>
            </label>
            <a href="#" onClick={forgotPassword}>
              Esqueceu a senha?
            </a>
          </div>

          <div className="btn">
            <button type="submit">Login</button>
          </div>

          <div className="sign-up">
            <p>Novo por aqui?</p>
            <Link to={"/Sign-up"}>
              <p className="link">Cadastrar</p>
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

export default Login;
