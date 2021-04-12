import http from "../http-common";

const getAll = () => {
  return http.get("/players");
};

const get = id => {
  return http.get(`/players/${id}`);
};

const create = data => {
  return http.post("/players", data);
};

const update = (id, data) => {
  return http.put(`/players/${id}`, data);
};

const remove = id => {
  return http.delete(`/players/${id}`);
};

const removeAll = () => {
  return http.delete(`/players`);
};

const findByTitle = title => {
  return http.get(`/players?title=${title}`);
};

const PlayerService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default PlayerService;