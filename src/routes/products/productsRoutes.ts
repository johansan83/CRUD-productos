// src/routes/products/productsRoutes.ts
import { Router } from "express";
import ProductsController from "../../controllers/products/productsControllers";

const productRouter = Router();
const productController = new ProductsController();

productRouter.get("/", productController.consultar);
productRouter.post("/", productController.insertar);

productRouter
  .route("/:id")
  .get(productController.consultarDetalle)
  .put(productController.actualizar)
  .delete(productController.eliminar);

export default productRouter;
