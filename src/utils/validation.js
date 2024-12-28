export const validateLoginForm = (data) => {
  const errors = {};

  if (!data.username.trim()) {
    errors.username = 'Username cannot be blank';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

