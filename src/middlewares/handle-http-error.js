const HandleHttpError = (req, res, next) => {
  res.HandleHttpError = ({ message }) => {
    res.status(500).send({ error: true, message });
  };

  next();
};

module.exports = HandleHttpError;
