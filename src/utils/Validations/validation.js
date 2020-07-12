// add fields you need to validate here
const validation = {
  email: {
    presence: {
      message: "^Please enter an email address",
    },
    email: {
      message: "^Please enter a valid email address",
    },
  },

  password: {
    presence: {
      message: "^Please enter a password",
    },
    length: {
      minimum: 8,
      message: "^Your password must be at least 8 characters",
    },
  },
};

export { validation };
