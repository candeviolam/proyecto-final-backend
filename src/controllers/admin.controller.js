const login = async (req, res) => {
  const { email, password } = req.body;
  res.json({
    email,
    password,
  });
};

const register = async (req, res) => {
  res.json({
    message: "Método register",
  });
};

export { login, register };
