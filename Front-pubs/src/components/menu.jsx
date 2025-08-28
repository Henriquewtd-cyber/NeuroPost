import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ListaProjetos } from "./listaProjetos.jsx";

import "./menu.css";
import { closeSection } from "../utilidades/Funções";

function Menu({ itens }) {
  function menu_toggle() {
    let menu = document.querySelector(".menu_lat");
    let projetos = document.querySelector(".projetos");

    menu.classList.toggle("estate");
    projetos.classList.toggle("estate");
  }

  const [login, setLogin] = useState(false);
  const [create, setCreate] = useState(false);
  const [logout, setLogout] = useState(false);

  const [projects, setProjects] = useState(false);

  useEffect(() => {
    itens_view();
  }, [itens]);

  function itens_view() {
    setLogin(false);
    setCreate(false);
    setLogout(false);
    setProjects(false);

    for (let i = 0; i < itens.length; i++) {
      let item = itens[i];

      if (item == "login") {
        setLogin(true);
      } else if (item == "create") {
        setCreate(true);
      } else if (item == "logout") {
        setLogout(true);
      } else if (item == "projects") {
        setProjects(true);
      }
    }
  }

  return (
    <nav className="menu_lat" id="menu">
      <div className="btn_exp">
        <i onClick={menu_toggle} className="bx  bx-menu" id="btn-menu"></i>
      </div>

      <ul>
        <li className="itens-menu" id="voltar">
          <Link to="/Home" id="bt1">
            <span className="icon">
              <i className="bx  bx-home"></i>{" "}
            </span>
            <span className="txt">Voltar</span>
          </Link>
        </li>
        {login && (
          <li className="itens-menu" id="login">
            <Link to="/Login" id="bt2">
              <span className="icon">
                <img src="/log-in.svg" />
              </span>
              <span className="txt">Login</span>
            </Link>
          </li>
        )}
        {create && (
          <li className="itens-menu" id="create">
            <Link to="/Create" id="bt3">
              <span className="icon">
                <i className="bi bi-file-earmark-plus"></i>
              </span>
              <span className="txt">Novo</span>
            </Link>
          </li>
        )}
        {logout && (
          <li className="itens-menu" id="logout">
            <Link to="/Home" id="bt4">
              <span className="icon">
                <img onClick={closeSection} src="/log-out (1).svg" />
              </span>
              <span className="txt">Logout</span>
            </Link>
          </li>
        )}
      </ul>
      <div className="projetos">
        {projects && <ListaProjetos className="listaProjects" />}
      </div>
    </nav>
  );
}

export default Menu;
