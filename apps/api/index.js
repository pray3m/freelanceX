import dotenv from "dotenv";
import { env } from "./env.js";
import app from "./app.js";

dotenv.config();

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening at url: http://localhost:${PORT}`);
});
