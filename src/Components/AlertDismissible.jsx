
import Alert from 'react-bootstrap/Alert';

// eslint-disable-next-line react/prop-types
function AlertDismissible({error,text}) {


  return (
   
      <Alert  variant="danger"  className='mt-3 '>
        <Alert.Heading>{error} </Alert.Heading>
        <p>
         {text}
        </p>
       
        <div className="d-flex justify-content-end">
          
        </div>
      </Alert>

     
    
  );
}

export default AlertDismissible;