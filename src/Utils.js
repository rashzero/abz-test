export function validateRegData(state) {
  const { errors, user } = state;
  let error = false;

  if (user.name.length < 2 || user.name.length > 60) {
    errors.name = 'User name should contain 2-60 characters';
    error = true;
  } else {
    errors.name = '';
  }

  if (!(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(user.email))) {
    errors.email = 'Invalid email.';
    error = true;
  } else {
    errors.email = '';
  }

  if (!(/^[+]{0,1}380([0-9]{9})$/.test(user.phone))) {
    errors.phone = 'The phone format is invalid.';
    error = true;
  } else {
    errors.phone = '';
  }

  if (!user.position) {
    errors.position = 'Position not checked.';
    error = true;
  } else {
    errors.position = '';
  }

  if (!user.photo) {
    errors.photo = 'No file chosen';
    error = true;
  } else {
    errors.photo = '';
  }

  return { error, errors };
}
