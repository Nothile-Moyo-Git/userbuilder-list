import React, { useState, useEffect } from "react";
import './UserBuilder.css';


const UserBuilder = (props) => {

    // Name and error are values we're using in our useeffect to apply the effects of our submissions on the DOM render
    const [nameError, setNameError] = useState(false);
    const [ageError, setAgeError] = useState(false);
    
    // Create states in order to store and update our new name and age for our users
    const [newName, setNewName] = useState('');
    const [newAge, setNewAge] = useState('');

    // Validate our form inputs once instead of multiple times with this state variable
    const [validatedForm, setValidatedForm] = useState(false);

    // Process the submission on our form when we submit the data
    const submitHandler = (event) =>{
        // Don't reload the form
        event.preventDefault();

        // Validate our submissions for the names and ages
        nameHandler( event.target[0] );
        ageHandler( event.target[1] );

        // Empty our inputs before blocking off the inputs
        clearInputs(event.target[0], event.target[1]);
    }

    // Empty our inputs if we enter something invalid as we're locking this section off
    const clearInputs = (name, age) => {
        // If we have a value in our output then set it to null
        if( name.value !== null ){
            name.value = '';
        }
        if( age.value !== null ){
            age.value = '';
        }
    }

    // Validate our name input, we're creating our error text later
    const nameHandler = (name) =>{
        if( name.value.length === 0 ){
            setNameError(true);
        }else{
            setNameError(false);
            setNewName( name.value );
        }
        setValidatedForm(true);
    }

    // Validate our age input, we're creating our error number later
    const ageHandler = (age) =>{
        ((age.value < 1) || (age.value.length === 0)) ? setAgeError( true ) : setAgeError( false );
        if((age.value < 1) || (age.value.length === 0)){
            setAgeError(true);
        }else{
            setAgeError(false);
            setNewAge( age.value );
        }
        setValidatedForm(true);
    }

    // Update our page when we input new information instead of rendering twice
    useEffect(() => {

    if( validatedForm === true ){

        // Depending on the error, we set our message here, then we change validatedForm so we only run this once
        if( (nameError === true) && (ageError === true) ){
            props.setErrorMode( true );
            props.setErrorText( 'Please enter a valid name and age > 0' );
        }else if( nameError === true ){
            props.setErrorMode( true );
            props.setErrorText( 'Please enter a valid name' );

        }else if( ageError === true ){
            props.setErrorMode( true );
            props.setErrorText( 'Please enter an age > 0' );
        }else{
            props.setErrorMode( false );
            props.addNewUser( newName, newAge );
        }

        //currentTarget.value = '';
        setValidatedForm(false);

    }

    // Added depencies to reduce errors
    },[validatedForm, nameError, ageError, props, newName, newAge]);

    return(
        <div className="userbuilder-form">
            <form onSubmit={ submitHandler }>
                <label className="username-label"> Username </label>
                <input type="text" id="username-text" disabled={ props.errorMode === true && 'disabled' }/>
                <label className="age-label"> Age (Years) </label>
                <input type="number" max="100" id="age-number" disabled={ props.errorMode === true && 'disabled' }/>
                <button type="submit" disabled={ props.errorMode === true && 'disabled' }> Add User </button>  
            </form>
        </div>
    );
}

export default UserBuilder;