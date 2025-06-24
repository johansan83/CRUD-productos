import express from "express";
const productRouter = express.Router();
import ProductsController from "../../controllers/products/productsControllers";
const productController = new ProductsController();
//import { Productos } from '../types/products';
//import { esProductoValidoYUnico } from '../utils/validations';


productRouter.get('/', productController.consultar);

productRouter.post('/', productController.insertar);

productRouter.route('/:id')
    .get(productController.consultarDetalle)
    .put(productController.actualizar)
    .delete(productController.eliminar);


export default productRouter;