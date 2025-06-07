import http from "../helpers/http.helper";

const fetcher = (url, token) =>
  http(token)
    .get(url)
    .then((res) => res.data);

export default fetcher;
