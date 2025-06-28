// ─── src/routes/products/productsRoutes.ts

import { Router } from "express";
import ProductsController from "../../controllers/products/productsControllers";

const productRouter = Router();
const productController = new ProductsController();

// Ruta para listar todos los productos
productRouter.get("/", productController.consultar);

// Ruta para insertar un nuevo producto
productRouter.post("/", productController.insertar);

// Rutas para consultar por ID, actualizar y eliminar un producto
productRouter
  .route("/:id")
  .get(productController.consultarDetalle)
  .put(productController.actualizar)
  .delete(productController.eliminar);

export default productRouter;