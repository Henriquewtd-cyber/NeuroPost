import { useRef, useEffect, useState, useContext } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import "./create.css";
import Menu from "../../components/menu";
import Aviso from "../../components/aviso";
import { DadosContext } from "../../context/DadosContext";
import { promptIA } from "../../utilidades/Funções";

function Create() {
  const navigate = useNavigate();

  const inputDesc = useRef();
  const inputImg = useRef();

  const [mostrar_aviso, setMostrarAviso] = useState(false);
  const [aviso, setAviso] = useState("");
  const [cor, setCor] = useState("red");

  const [checkDesc, setDesc] = useState(false);
  const [checkImg, setImg] = useState(false);

  const [loading, setLoading] = useState(false);

  const { setDados } = useContext(DadosContext);

  function checkBoxDesc() {
    setDesc(!checkDesc);
  }
  function checkBoxImg() {
    setImg(!checkImg);
  }

  function verificarCampos() {
    if (checkDesc) {
      if (inputDesc.current.value.length < 10) {
        setAviso("Dados inválidos");
        setMostrarAviso(true);
        setCor("red");

        return false;
      }
    }
    if (checkImg) {
      if (inputImg.current.value.length < 10) {
        setAviso("Dados inválidos");
        setMostrarAviso(true);
        setCor("red");

        return false;
      }
    }
    if (!checkDesc && !checkImg) {
      setAviso("Dados inválidos");
      setMostrarAviso(true);
      setCor("red");
      return false;
    }
    return true;
  }

  function limparDesc() {
    inputDesc.current.value = "";
  }

  function limparImg() {
    inputImg.current.value = "";
  }

  function nextPage(dados) {
    const timer = setTimeout(() => {
      setDados(dados);
      navigate("/View");
    }, 4000);
    return () => clearTimeout(timer);
  }

  async function sendData(event) {
    event.preventDefault();
    if (!verificarCampos()) {
      return;
    }

    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      const info = await promptIA(
        inputDesc.current.value,
        inputImg.current.value
      );
      const status = info.status;
      if (status == 200) {
        setAviso(info.data.mensagem);
        setCor("green");
        setMostrarAviso(true);
        nextPage(info.data.dados);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarAviso(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [mostrar_aviso]);

  return (
    <section className="create" id="create">
      <Aviso mensagem={aviso} mostrar={mostrar_aviso} cor={cor}></Aviso>

      <Menu itens={["logout"]} />
      <form onSubmit={sendData} id="create-form">
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
          <h1>Criar novo projeto</h1>

          <div className="about">
            <div className="content">
              <div className="div1">
                <label>
                  <input
                    className="check-desc"
                    type="checkbox"
                    onChange={checkBoxDesc}
                  />
                  <p>Criar uma descrição</p>
                </label>
              </div>
              <div className="div-desc">
                <textarea
                  id="desc"
                  className="desc"
                  rows="5"
                  cols="33"
                  placeholder="Me conte um pouco sobre a publicação que gostaria"
                  ref={inputDesc}
                ></textarea>
                <i className="bi bi-trash-fill" onClick={limparDesc}></i>
              </div>
            </div>
          </div>

          <div className="about-img">
            <div className="content">
              <div className="div1">
                <label>
                  <input
                    className="check-img "
                    type="checkbox"
                    onChange={checkBoxImg}
                  />
                  <p>Criar uma imagem</p>
                </label>
              </div>
              <div className="div-img">
                <textarea
                  id="desc-img"
                  className="desc-img"
                  placeholder="Me conte um pouco sobre a imagem que deseja"
                  ref={inputImg}
                ></textarea>
                <i className="bi bi-trash-fill" onClick={limparImg}></i>
              </div>
            </div>
          </div>
          <div className="btn">
            <button type="submit">Criar projeto</button>
          </div>
          <div className="loaderDiv">
            {loading && <div className="loader"></div>}
          </div>
        </motion.div>
      </form>
    </section>
  );
}

export default Create;
