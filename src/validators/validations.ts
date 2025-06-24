// utils/validarProducto.ts
import { Productos } from '../types/products';

export function esProductoValidoYUnico(
    producto: unknown,
    productosExistentes: Productos[]
): producto is Productos {
    if (
        typeof producto !== 'object' || 
        producto === null || 
        !('id' in producto) || 
        !('nombre' in producto)
    ) {
        return false;
    }

    const { id, nombre } = producto as Productos;

    if (typeof id !== 'number') return false;
    if (typeof nombre !== 'string' || nombre.length < 3) return false;

    const idDuplicado = productosExistentes.some(p => p.id === id);
    const nombreDuplicado = productosExistentes.some(p => p.nombre === nombre);

    return !idDuplicado && !nombreDuplicado;
}
