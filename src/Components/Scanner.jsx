import  { useState } from 'react';
import { Button } from 'react-bootstrap';
import QrReader from 'react-weblineindia-qrcode-scanner';

const Test = () => {

  const [result, setResult] = useState(null);
  
  const [isScanning, setIsScanning] = useState(true); // Variable de estado para controlar si se está escaneando o no

  const handleScan = data => {

    console.log(data);
    if (data && isScanning) { // Verifica si hay datos y si el escaneo está activo
      setResult(data);
      setIsScanning(false); // Detiene el escaneo
    }
  };

  const handleError = err => {
    console.error(err);
  };

  const previewStyle = {
    height: 250,
    width: 250,
  };

  const delay = 500;

  return (
    <div>
      {isScanning && ( // Renderiza el componente QrReader solo si se está escaneando
        <QrReader
          delay={delay}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
      )}

      {!isScanning && ( // Renderiza el resultado del escaneo una vez que se ha detenido el escaneo
        <div>
          <p>Resultado del escaneo: {result}</p>
          <Button onClick={() => setIsScanning(true)}>Volver a escanear</Button> {/* Botón para volver a escanear */}
        </div>
      )}
    </div>
  );
};

export default Test;
