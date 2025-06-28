// ─── src/validators/validarProducto.ts

import { Producto } from '../types/product';

export function esProductoValidoYUnico(
    producto: unknown,
    productosExistentes: Producto[]
): producto is Producto {
    // Verificación inicial de estructura mínima del objeto
    if (
        typeof producto !== 'object' || 
        producto === null || 
        !('id' in producto) || 
        !('nombre' in producto)
    ) {
        return false;
    }

    const { id, nombre } = producto as Producto;

    // Validaciones de tipo y longitud para campos esenciales
    if (typeof id !== 'number') return false;
    if (typeof nombre !== 'string' || nombre.length < 3) return false;

    // Comprobación de duplicados en la colección existente
    const idDuplicado = productosExistentes.some(p => p.id === id);
    const nombreDuplicado = productosExistentes.some(p => p.nombre === nombre);

    return !idDuplicado && !nombreDuplicado;
}
