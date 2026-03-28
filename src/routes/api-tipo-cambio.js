import { Router } from "express";
import * as tipoCambio from "../components/tipo-de-cambio/tipo-de-cambio-API.js"

const router = Router();

//Crear los Endpoints

router.get("/ObtenerTipoCambio", async (req, res) => {
  res.json(await tipoCambio.getTipoCambio());
});

//Filtra por la descripción de Moneda
router.get("/ObtenerTipoCambios/:moneda", async (req, res) => {
    const dataResult = await tipoCambio.getTipoCambio();
    const idTipo = String(req.params.moneda);
    const dataFilter = dataResult.find((data) => data.moneda === idTipo );
    res.json(dataFilter);
});

export { router };