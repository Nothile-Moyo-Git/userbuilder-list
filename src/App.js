import React, { useState, useEffect } from "react";
import './App.css';
import UserBuilder from './Components/UserModal/UserBuilder';
import UserList from './Components/UserModal/UserList';
import ErrorModal from './Components/ErrorModal/ErrorModal';

function App() {

  // Here we set our error mode and the text using two way binding ( passing states between parent and child elements )
  const [errorMode, errorModeHandler] = useState( false );
  const [errorText, errorTextHandler] = useState( 'no error' );

  // Create a state of users here, we're doing this so we can manage this in our Userlist
  const [storedUsers, storedUsersHandler] = useState(  
    [{ id: 'user1', name: 'Nothile Moyo', age:'25 years old' },{ id: 'user2', name: 'Ross Kemp', age:'28 years old' }]
  );

  const [userCount, userCountHandler] = useState( storedUsers.length + 1 );

  // Add a new user to our list 
  const addUser = (newName, newAge) =>{
    userCountHandler( userCount + 1 );
    storedUsersHandler( (currentUsers) => {

      // Get a reference of our previous users
      const updatedUsers = [...currentUsers];

      // Add our new user with their name and age to our array
      updatedUsers.unshift({  id: `user${userCount}`, name: newName, age: `${newAge} years old` });

      // Pass this back with the new list of users
      return updatedUsers;
    } );
  }

  // Delete a user from our list 
  const deleteUser = (user, usersArray) => {
 
    // We return a new array which excludes the previous user
    let filteredArray = usersArray.filter((item) => {
      return(item.id !== user.id);
    });

    // Update our list of users
    storedUsersHandler(filteredArray);

  }

  // Hide the error modal when we click outside of it 
  const clickHandler = (event) => {

    // Get our elements in the DOM
    const errorModalComponent = document.getElementById('errorModal');

    // Create an array we can map through in React
    errorModalComponent.childNodes.map = Array.prototype.map;

    // Check if we clicked on or inside the errorModal
    if( isInsideErrorModal(event, errorModalComponent) === false){ errorModeHandler(false); }

  }

  // This checks the click area for the padding of the parentNode or any of the childNodes and returns a check on validation
  const isInsideErrorModal = (event, parentNode) => {

    for( let childNode of parentNode.childNodes ){
      if( event.target.contains(childNode) ){
        return(true);
      }
    }

    // If we clicked outside the errorModal component
    return(false);

  }
  
  // Give us output on every DOM render in order to debug our code
  useEffect(() =>{
      document.addEventListener('mousedown', clickHandler);
      return () => {
          // Unbind the event listener on clean up
          document.removeEventListener('mousedown', clickHandler);
        };

  });

  return (
    <div className={`userbuilder-components ${errorMode === true ? 'errorMode' : ''}`}>

    { /* If there's an error, place an overlay over our form and list, inside of this we have the form and list so the overlay affects them */ }
    <div className={ errorMode === true ? 'opaque-overlay' : ''}>
      <UserBuilder setErrorMode={ errorModeHandler } setErrorText={ errorTextHandler } errorMode={ errorMode } addNewUser={ addUser }></UserBuilder>
      <div className={ errorMode === true ? 'hideComponent' : ''}>
        <UserList deleteChosenUser={ deleteUser } users={ storedUsers }></UserList>
      </div>
    </div>

      {/* This is our error message modal, display it if there's an error and we place it outside the overlay and position it in the middle of the screen*/}
      <div className={ errorMode === false ? 'hideComponent' : '' }>
        <ErrorModal errorMessage={ errorText } setErrorMode={ errorModeHandler } errorMode={ errorMode }></ErrorModal>
      </div>
    </div>
  );

}

export default App;
