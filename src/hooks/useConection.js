async function useConnectionPost({data}, method, endpoint) {
  // Objeto con los datos que deseas enviar en la petición
  const datos = data;

  // Opciones de la petición, incluyendo el método 'POST', el encabezado 'Content-Type' y el cuerpo JSON
  const opciones = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos), // Convierte el objeto JavaScript en formato JSON
  };

  // URL a la que se realizará la petición POST
  const url = `https://backend-qr-control.onrender.com/api${endpoint}`;

  try {
    // Realiza la petición utilizando fetch y espera la respuesta
    const respuesta = await fetch(url, opciones);

    // Verifica si la respuesta es exitosa (código de estado 2xx)
    if (respuesta.ok) {
      // Procesa la respuesta JSON y espera a que se complete
      const data = await respuesta.json();
      // Maneja los datos recibidos en la respuesta
      console.log("Respuesta del servidor:", data);
    } else {
      // Si la respuesta no es exitosa, lanza una excepción con el mensaje de error
      throw new Error("Error al enviar la petición POST");
    }
  } catch (error) {
    // Captura cualquier error que ocurra durante la petición
    console.error("Error:", error);
  }
}

export {useConnectionPost};
