import React from 'react';
import './UserItem.css';

const ListItem = ({ username, phone, email, name, address }) => {
  return (
    <li className="card_item_container">
      <div>
        <p className="card_item_username">{username}</p>
        <p>{name}</p>
        <p className="card_item_email">{email}</p>
        <strong>Address: </strong>
        <div className='address_container'>
          <p>
            <strong>Street: </strong>
            {address.street}
          </p>
          <p>
            <strong>City: </strong>
            {address.city}
          </p>
        </div>
      </div>
      <p>{phone}</p>
    </li>
  );
};

export default ListItem;
