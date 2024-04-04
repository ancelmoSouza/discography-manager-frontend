import api from "./api";

async function getAlbums() {
  return await api.get("/albums/all");
}

async function getMusicsByAlbum(id) {
  return await api.get(`/albums/getFullAlbum/${id}`);
}

async function addMusic(data) {
  return await api.post(`/musicAlbum/add`, data);
}

async function getByTitle(search) {
  return await api.get(`/albums/getByTitle?search=${search}`);
}

async function postAlbum(data) {
  return await api.post(`/albums/store`, data);
}

async function deleteAlbum(id) {
  return await api.delete(`/albums/${id}`);
}
export {
  getAlbums,
  getMusicsByAlbum,
  addMusic,
  getByTitle,
  postAlbum,
  deleteAlbum,
};
