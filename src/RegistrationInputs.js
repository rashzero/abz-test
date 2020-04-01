import React from 'react';

const emailPattern = "^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|'(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*')@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])$)";
const registrationInput = [
  {
    name: 'Name',
    id: 'name',
    type: 'text',
    placeholder: 'Your name',
    helperText: '',
    minlength: '2',
    maxlength: '60',
  },
  {
    name: 'Email',
    type: 'email',
    id: 'email',
    placeholder: 'Your email',
    pattern: emailPattern,
    helperText: '',
    minlength: '2',
    maxlength: '100',
  },
  {
    name: 'Phone number',
    type: 'tel',
    id: 'phone',
    placeholder: '+380 XX XXX XX XX',
    pattern: '^[+]{0,1}380([0-9]{9})$',
    helperText: 'Enter phone number in open format',
    minlength: '13',
    maxlength: '13',
  },
];

export default function RegistrationInputs(props) {
  return registrationInput.map((input) => (
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
        onChange={(event) => props.handleChangeInput(event, input.id)}
        required
      />
      <br />
      <span>{props.errors[input.id] ? props.errors[input.id] : input.helperText}</span>
    </div>
  ));
}
