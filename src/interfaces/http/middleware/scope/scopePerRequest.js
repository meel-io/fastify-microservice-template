module.exports = ({ container }) => (req, _, next) => {
  req.container = container.createScope();
  return next();
};
