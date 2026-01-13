import express from "express";
import cors from "cors";
//import "dotenv/config";
import * as constants from "./src/utils/Constants.js"
import * as routerTipoCambio from "./src/routes/api-tipo-cambio.js";

const PORT = constants.PORT || 3001;
const app = express();

//Validar los cors
app.use(cors({
    origin: '*'
}))

//llamar a los Endpoints y Routes
app.use(routerTipoCambio.router);

//Configurar el puerto
app.listen(PORT, () => {
  console.log("Server Listening on Port: " + PORT);
});
