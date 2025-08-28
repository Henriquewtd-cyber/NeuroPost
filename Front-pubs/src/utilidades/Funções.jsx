import api from "../services/api.js";

export async function validaToken(rota) {
  const token = localStorage.getItem("token");
  const res = await api.post(
    rota,
    {},
    { headers: { authorization: "Bearer" + " " + token } }
  );
  return res.data;
}

export function closeSection() {
  localStorage.setItem("token", "");
}

export async function promptIA(txtDesc, txtImg) {
  const res = await api.post("/Create", {
    txtDesc,
    txtImg,
  });
  return res;
}
