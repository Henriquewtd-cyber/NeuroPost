import api from "../services/api.js";
import { useState, useEffect, useContext } from "react";
import { DadosContext } from "../context/DadosContext";
import { useNavigate } from "react-router-dom";

import "./projetos.css";

export function ListaProjetos() {
  const navigate = useNavigate();

  const { setDados } = useContext(DadosContext);

  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const token = localStorage.getItem("token");

    const projetos = await api.get("/Projects", {
      headers: { authorization: "Bearer" + " " + token },
    });
    setProjetos(projetos.data.projetos);
  }

  async function openProject(projeto) {
    setDados({
      descrição: { mensagem: projeto.description, titulo: projeto.title },
      urlImg: projeto.imageUrl,
      id: projeto.id,
    });
    navigate("/View");
  }
  return (
    projetos.length > 0 && (
      <div className="contentProjects">
        <h1>Projetos:</h1>
        <ul>
          {projetos.map((projeto) => (
            <li key={projeto.id} onClick={() => openProject(projeto)}>
              {projeto.title}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
