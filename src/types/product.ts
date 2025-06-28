// ─── src/types/product.ts

/**
 * Representa un producto en la aplicación CRUD de NodeJS.
 */
export interface Producto {
  /** Identificador único del producto */
  id: number;

  /** Nombre descriptivo del producto */
  nombre: string;

  /** Descripción detallada del producto */
  descripcion: string;

  /** Precio del producto (valor numérico en la moneda definida) */
  precio: number;
}
