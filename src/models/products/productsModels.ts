import { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import conn from "../../../config/db";
import { Producto } from "../../types/product";

class ProductModel {
    private conn: Pool;

    constructor(conn: Pool){
        this.conn = conn;
    }

    public async listarProductos(): Promise<Producto[]> {
        const [rows] = await this.conn.query<RowDataPacket[]>('SELECT * FROM productos');
        return rows as Producto[];
    }


    public async listarProductId(id: number): Promise<Producto | null> {
        const [rows] = await this.conn.execute<RowDataPacket[]>('SELECT * FROM productos WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] as Producto : null;

    }

    public async agregarProducto(producto: Omit<Producto, 'id'>): Promise<number> {
        const { nombre, descripcion, precio } = producto;
        const [result] = await this.conn.execute<ResultSetHeader>(
            'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)',
            [nombre, descripcion, precio]
        );
        return result.insertId;
    }

    public async actualizarProducto(id: number, producto: Partial<Omit<Producto, 'id'>>): Promise<boolean> {
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

    public async eliminarProducto(id: number): Promise<boolean> {
        const [result] = await this.conn.execute<ResultSetHeader>(
            'DELETE FROM productos WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

}

export const productModel = new ProductModel(conn);