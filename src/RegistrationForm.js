import React from 'react';
import PropTypes from 'prop-types';
import ButtonAndDialog from './ButtonAndDialog';
import RegistrationInputs from './RegistrationInputs';
import './scss/RegistrationForm.scss';

export default function RegistrationForm({
  inputRef,
  errors,
  positions,
  handleChangePosition,
  handleChangePhoto,
  fileInput,
  user,
  handleRegistration,
  getUsersRequest,
  handleChangeInput,
}) {
  return (
    <div className="main__registration">
      <div className="main__registration_text1">
        Register to get a work
      </div>
      <div className="main__registration_text2">
        Attention! After successful registration and alert, update the
        list of users in the block from the top
      </div>
      <div>
        <form>
          <RegistrationInputs
            inputRef={inputRef}
            errors={errors}
            handleChangeInput={handleChangeInput}
          />
          <div className={errors.position ? 'main__registration_position_error' : 'main__registration_position'}>
            <p>Select your position</p>
            {positions.map((position) => (
              <label className="main__registration_position_radio" key={position.id} htmlFor={position.id}>
                <input type="radio" name="position" value={position.id} onChange={handleChangePosition} id={position.id} />
                <span>{position.name}</span>
                <br />
              </label>
            ))}
          </div>
          <div className="main__registration_photo">
            Photo
            <br />
            <div className={errors.photo ? 'main__registration_form-error' : 'main__registration_form'}>
              <div className="main__registration_button">Browse</div>
              <input
                id="upload"
                type="file"
                name="upload"
                placeholder="No file chisen"
                onChange={handleChangePhoto}
                accept="image/jpeg"
                ref={fileInput}
              />
              <span className="main__registration_form_text">{user.photo ? user.photo : 'Upload your photo'}</span>
            </div>
            <section>{errors.photo ? errors.photo : ''}</section>
          </div>
          <div className="main__registration_form_button">
            <ButtonAndDialog
              handleRegistration={handleRegistration}
              getUsersRequest={getUsersRequest}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

RegistrationForm.propTypes = {
  errors: PropTypes.object,
  positions: PropTypes.array,
  fileInput: PropTypes.object,
  user: PropTypes.object,
  inputRef: PropTypes.object,
  handleChangeInput: PropTypes.func.isRequired,
  handleChangePosition: PropTypes.func.isRequired,
  handleChangePhoto: PropTypes.func.isRequired,
  handleRegistration: PropTypes.func.isRequired,
  getUsersRequest: PropTypes.func.isRequired,
};
