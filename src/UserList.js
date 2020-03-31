import React from 'react';
//import ProgressCentered from './ProgressCentered';
import ImageAvatars from './ImageAvatars';

export default function RegistrationInputs(props) {
  if (!props.users) {
    return null;
  }
  return (props.users.map((user) => (
    <div className="main__body_users_card" key={user.id}>
      <ImageAvatars userImg={user.photo} />
      <div className="main__body_users_card_name" title={user.name}><span>{user.name}</span></div>
      <div>{user.position}</div>
      <div title={user.email}>{user.email}</div>
      <div>{user.phone}</div>
    </div>
  )));
}
