import api from "./api";

async function getMusics() {
  return await api.get("/musics/all");
}

async function deleteMusic(id) {
  return await api.delete(`/musics/${id}`);
}

async function uploadMusic(data) {
  return await api.post("/musics/store", data);
}

async function getAudio(uuid) {
  return await api.get(`music/download/${uuid}`);
}

async function getByName(name) {
  return await api.get(`musics/getByName?name=${name}`);
}

export { getMusics, deleteMusic, uploadMusic, getAudio, getByName };
