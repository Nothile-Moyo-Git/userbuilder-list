import React, { useEffect } from "react";
import './UserList.css';

const UserList = (props) => {

    // Create an array based on our initial entries and anything we add after that using two way binding
    const listHandler = (user) => {
        //console.log( `Current index: ${index} with a value of: ${value}` );
        return(
            <li key={ user.id } className="user-list-item" onClick={ () => { props.deleteChosenUser(user, props.users); } } title={'Delete user'}> { user.name } ({ user.age }) </li>
        );
    }

    useEffect(() => {
 
    },[props]);

    return(
        <div className="user-list-section">
            <ul className="user-list-menu">
                { props.users.map(listHandler) }
            </ul>
        </div>
    );
}


export default UserList;