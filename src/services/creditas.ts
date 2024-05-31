import axios from "axios";

const creditasAuthClient = axios.create({
  baseURL: process.env.CREDITAS_AUTH_URL,
});

const creditasClient = axios.create({ baseURL: process.env.CREDITAS_API_URL });

export { creditasAuthClient, creditasClient };
