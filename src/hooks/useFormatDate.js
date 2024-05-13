function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);

    const opciones = {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false // Formato de 24 horas
    };

    return fecha.toLocaleString('es-ES', opciones);
}



export {formatearFecha}