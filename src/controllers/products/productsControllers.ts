// ─── src/controllers/products/productsControllers.ts

import { Request, Response } from "express";
import { productModel } from "../../models/products/productsModels";

/**
 * Controlador para manejar operaciones CRUD de productos.
 */
class ProductsController {
  constructor() {
    // Hacer bind para mantener el contexto `this` cuando los métodos se usen como handler en rutas
    this.consultar = this.consultar.bind(this);
    this.consultarDetalle = this.consultarDetalle.bind(this);
    this.insertar = this.insertar.bind(this);
    this.actualizar = this.actualizar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  /**
   * GET /products
   * Devuelve la lista completa de productos.
   */
  public async consultar(req: Request, res: Response): Promise<void> {
    try {
      const data = await productModel.listarProductos();
      res.json(data);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al consultar productos." });
    }
  }

  /**
   * GET /products/:id
   * Devuelve un producto específico según su ID.
   */
  public async consultarDetalle(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }
    try {
      const prod = await productModel.listarProductId(id);
      if (!prod) {
        res.status(404).json({ error: "Producto no encontrado" });
        return;
      }
      res.json(prod);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al consultar el producto." });
    }
  }

  /**
   * POST /products
   * Crea un nuevo producto, validando duplicados por nombre.
   */
  public async insertar(req: Request, res: Response): Promise<void> {
    const { nombre, descripcion, precio } = req.body;
    if (!nombre || !descripcion || typeof precio !== "number") {
      res.status(400).json({ error: "Datos incompletos o inválidos." });
      return;
    }

    try {
      const existing = await productModel.listarProductos();
      if (existing.some(p => p.nombre.toLowerCase() === nombre.trim().toLowerCase())) {
        res.status(409).json({ message: `El producto con nombre "${nombre}" ya existe.` });
        return;
      }

      const id = await productModel.agregarProducto({ nombre, descripcion, precio });
      res.status(201).json({
        message: "Producto insertado correctamente",
        data: { id, nombre, descripcion, precio },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al agregar producto." });
    }
  }

  /**
   * PUT /products/:id
   * Actualiza un producto existente, con validación de nombre duplicado.
   */
  public async actualizar(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const { nombre, descripcion, precio } = req.body;
    const datos: Partial<{ nombre: string; descripcion: string; precio: number }> = {};
    if (nombre !== undefined) datos.nombre = nombre;
    if (descripcion !== undefined) datos.descripcion = descripcion;
    if (precio !== undefined) datos.precio = precio;

    if (Object.keys(datos).length === 0) {
      res.status(400).json({ error: "No se enviaron campos para actualizar." });
      return;
    }

    try {
      if (datos.nombre) {
        const all = await productModel.listarProductos();
        const conflict = all.find(p =>
          p.nombre.toLowerCase() === datos.nombre!.trim().toLowerCase() && p.id !== id
        );
        if (conflict) {
          res.status(409).json({
            message: `El nombre "${datos.nombre}" ya está en uso por otro producto.`,
          });
          return;
        }
      }

      const ok = await productModel.actualizarProducto(id, datos);
      if (!ok) {
        res.status(404).json({ error: "Producto no encontrado o sin cambios." });
        return;
      }

      res.json({
        message: "Producto actualizado correctamente",
        data: { id, ...datos },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al actualizar producto." });
    }
  }

  /**
   * DELETE /products/:id
   * Elimina un producto por ID.
   */
  public async eliminar(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }
    try {
      const ok = await productModel.eliminarProducto(id);
      if (!ok) {
        res.status(404).json({ error: "Producto no encontrado." });
        return;
      }
      res.json({ message: "Producto eliminado correctamente", id });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al eliminar producto." });
    }
  }
}

export default ProductsController;
