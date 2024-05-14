import  { useState } from 'react';

// eslint-disable-next-line react/prop-types
function Progress({hour}) {
 
  const [progress, setProgress] = useState(hour);

  const hourMes = 192
 
  const percentaje = hour / hourMes * 100 

 

  return (
    <div className='d-flex gap-2 align-items-center '>
      
     
      <progress value={progress} max={hourMes}></progress>

      {`${percentaje.toFixed(2)} %`}
    
    </div>
  );
}

export default Progress;
