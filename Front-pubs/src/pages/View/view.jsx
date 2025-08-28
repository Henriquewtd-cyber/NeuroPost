import { motion } from "motion/react";
import { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

import { DadosContext } from "../../context/DadosContext";
import Menu from "../../components/menu";
import "./view.css";
import Aviso from "../../components/aviso";

function View() {
  const navigate = useNavigate();

  const [imagemUrl, setImagemUrl] = useState("../../public/warning.png");
  const [texto, setTexto] = useState("Erro ao carregar");
  const [titulo, setTitle] = useState("");
  const [render, setRender] = useState(false);

  const [mostrar_aviso, setMostrarAviso] = useState(false);
  const [corAviso, setCor] = useState("red");
  const [mensagem, setMensagem] = useState("");

  const [modalState, setModalState] = useState(false);
  const [loading, setLoading] = useState(false);

  let dados = { descrição: { titulo: "", mensagem: "" }, urlImg: "" };
  if (useContext(DadosContext)) {
    dados = useContext(DadosContext).dados;
  }

  const title = useRef();
  const textoOut = useRef();

  function clearTitle() {
    title.current.value = "";
  }

  useEffect(() => {
    if (dados) {
      if (dados.descrição.mensagem) {
        setTexto(dados.descrição.mensagem);
        setTitle(dados.descrição.titulo);
      } else setTexto("Esse projeto não possuí descrição");

      if (dados.urlImg) setImagemUrl(dados.urlImg);
      else setImagemUrl("../../public/warning.png");
      setRender(true);
    }
  }, []);

  useEffect(() => {
    if (texto !== "" && render) {
      textoOut.current.value = texto;
      title.current.value = titulo;
    }
  }, [texto]);

  async function baixarImg() {
    if (dados.urlImg && dados.id) {
      const link = document.createElement("a");
      link.href = dados.urlImg;
      link.download = dados.urlImg + ".png";
      link.click();
    }
  }

  function toogleModal() {
    setModalState(!modalState);
  }

  function clipboard() {
    setMensagem("Texto copiado");
    setCor("green");
    setMostrarAviso(true);
    navigator.clipboard.writeText(textoOut.current.value);
  }

  function voltar() {
    const timer = setTimeout(() => {
      navigate("/Home");
    }, 4000);
    return () => clearTimeout(timer);
  }

  async function saveProject(event) {
    event.preventDefault();

    setLoading(true);

    const token = localStorage.getItem("token");
    const res = await api.post(
      "/View",
      {
        title: title.current.value,
        desc: textoOut.current.value,
        img: imagemUrl,
      },
      { headers: { authorization: "Bearer" + " " + token } }
    );
    if (res.status == 201) {
      setMensagem("Projeto salvo com sucesso!");
      setCor("green");
      setMostrarAviso(true);

      setLoading(false);

      voltar();
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarAviso(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [mostrar_aviso]);

  return (
    <section className="view" id="view">
      <Menu itens={["logout", "create"]} />
      <Aviso mensagem={mensagem} mostrar={mostrar_aviso} cor={corAviso}></Aviso>

      <form id="view-form" onSubmit={saveProject}>
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
          <h1>Pronto! - aqui está seu projeto:</h1>

          <div className="nome">
            <input type="text" ref={title} />
            <i onClick={clearTitle} className="bi bi-pencil-square"></i>
          </div>

          <div className="content">
            <div className="img">
              <img src={imagemUrl} onClick={toogleModal} />
              <div className="btn">
                <i onClick={toogleModal} className="bi bi-fullscreen"></i>
                <i className="bi bi-download" onClick={baixarImg}></i>
                <Link to={"/Create"}>
                  <i className="bi bi-arrow-clockwise"></i>
                </Link>
              </div>
            </div>

            <div className="desc">
              <textarea className="teste" ref={textoOut}></textarea>
              <div className="btn">
                <i onClick={clipboard} className="bi bi-copy"></i>
                <Link to={"/Create"}>
                  <i className="bi bi-arrow-clockwise"></i>
                </Link>
              </div>
            </div>
          </div>

          <button type="submit">Salvar projeto</button>

          <div className="delete">
            <p>Não curtiu ?</p>
            <Link to={"/Create"}>
              <p className="link">Refazer</p>
            </Link>
          </div>
          <div className="loaderDiv">
            {loading && <div className="loader"></div>}
          </div>
        </motion.div>
      </form>

      <Modal
        appElement={document.getElementById("root")}
        isOpen={modalState}
        onRequestClose={toogleModal}
        contentLabel="Imagem em tela cheia"
        className="img_modal"
        overlayClassName="overlay"
      >
        <img src={imagemUrl} onClick={toogleModal} className="imagemAmpliada" />
      </Modal>
    </section>
  );
}

export default View;
