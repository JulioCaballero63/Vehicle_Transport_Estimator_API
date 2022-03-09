exports.get404 = (req, res, next) => {
    res.status(404).send({
        status: 'Error!',
        message: 'Http 404 NOT FOUND'
      });
  };

  exports.get500 = (req, res, next) => {
    res.status(500).send({
      status: 'Error!',
      message: 'Http 500 Internal Server Error'
    });
  };
  