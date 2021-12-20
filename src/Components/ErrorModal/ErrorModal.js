import React from "react";
import './ErrorModal.css';

const ErrorModal = (props) => {
    
    // Remove the overlay and allow us to place data inside our input fields again
    const removeErrorMode = () => {
        props.setErrorMode( false );
    }

    return(
        <div className="errorModal"  id={'errorModal'}>
            <h1> Invalid Input </h1>
            <p> { props.errorMessage } </p>
            <button onClick={ removeErrorMode }> Okay </button>
        </div>
    );
}

export default ErrorModal;