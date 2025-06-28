// ─── src/models/products/productosModels.ts

/**
 * Modelo de acceso a datos para la entidad Producto.
 * Proporciona métodos CRUD para la base de datos MySQL usando promesas.
 */
import { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import conn from "../../../config/db";
import { Producto } from "../../types/product";

class ProductModel {
  private conn: Pool;

  /**
   * Inicializa el modelo con una conexión a la base de datos.
   * @param conn Conexión de tipo Pool a MySQL
   */
  constructor(conn: Pool) {
    this.conn = conn;
  }

  /**
   * Obtiene todos los productos desde la base de datos.
   * @returns Lista de productos
   */
  public async listarProductos(): Promise<Producto[]> {
    const [rows] = await this.conn.query<RowDataPacket[]>(
      "SELECT * FROM productos"
    );
    return rows as Producto[];
  }

  /**
   * Consulta un producto por su ID.
   * @param id ID del producto a buscar
   * @returns El producto si existe, o null si no se encuentra
   */
  public async listarProductId(id: number): Promise<Producto | null> {
    const [rows] = await this.conn.execute<RowDataPacket[]>(
      "SELECT * FROM productos WHERE id = ?",
      [id]
    );
    return rows.length > 0 ? (rows[0] as Producto) : null;
  }

  /**
   * Inserta un nuevo producto en la base de datos.
   * @param producto Datos del producto (sin incluir ID)
   * @returns ID del producto insertado
   */
  public async agregarProducto(
    producto: Omit<Producto, "id">
  ): Promise<number> {
    const { nombre, descripcion, precio } = producto;
    const [result] = await this.conn.execute<ResultSetHeader>(
      "INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)",
      [nombre, descripcion, precio]
    );
    return result.insertId;
  }

  /**
   * Actualiza un producto existente por su ID.
   * Solo actualiza los campos provistos.
   * @param id ID del producto a actualizar
   * @param producto Campos a actualizar (nombre, descripcion, precio)
   * @returns True si se actualizó, false si no se modificó ningún registro
   */
  public async actualizarProducto(
    id: number,
    producto: Partial<Omit<Producto, "id">>
  ): Promise<boolean> {
    const campos = [];
    const valores = [];

    for (const [key, value] of Object.entries(producto)) {
      campos.push(`${key} = ?`);
      valores.push(value);
    }

    if (campos.length === 0) return false;

    const query = `UPDATE productos SET ${campos.join(", ")} WHERE id = ?`;
    valores.push(id);

    const [result] = await this.conn.execute<ResultSetHeader>(query, valores);
    return result.affectedRows > 0;
  }

  /**
   * Elimina un producto por su ID.
   * @param id ID del producto a eliminar
   * @returns True si se eliminó, false si no existía
   */
  public async eliminarProducto(id: number): Promise<boolean> {
    const [result] = await this.conn.execute<ResultSetHeader>(
      "DELETE FROM productos WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}

/**
 * Exporta una instancia del modelo usando la conexión global.
 */
export const productModel = new ProductModel(conn);
