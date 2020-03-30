import React from 'react';

export default function RegistrationInputs(props) {
  const registrationInputs = props.registrationInput.map((input) => (
    <div key={input.id} className={props.errors[input.id] ? 'main__registration_input-error' : ''}>
      {input.name}
      <br />
      <input
        ref={input.name === 'Name' ? props.inputRef : null}
        type={input.type}
        placeholder={input.placeholder}
        pattern={input.pattern}
        minLength={input.minlength}
        maxLength={input.maxlength}
        onChange={(event) => this.handleChangeInput(event, input.id)}
        required
      />
      <br />
      <span>{props.errors[input.id] ? props.errors[input.id] : input.helperText}</span>
    </div>
  ));

  return registrationInputs;
}
