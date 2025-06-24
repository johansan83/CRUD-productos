import { Request, Response } from "express";

class ProductsController {
    constructor() {

    }

    consultar(req: Request, res: Response) {
        res.json({msg: 'Consulta productos'});
    }

    consultarDetalle(req: Request, res: Response) {
        const {id} = req.params;
        res.json({msg: `Consulta producto con id ${id}`});
    }

    insertar(req: Request, res: Response) {
        res.json({msg: 'Consulta productos'});
    }

    actualizar(req: Request, res: Response) {
        res.json({msg: 'Consulta productos'});
    }

    eliminar(req: Request, res: Response) {
        res.json({msg: 'Consulta productos'});
    }

}

export default ProductsController;