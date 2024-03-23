const statusCodes = {
  CREATED: 201,
  OK: 200,
  DELETED: 204,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500
};

const response = (res, { status, data }) => {
  res.status(status).send(data);
};

module.exports = {
  statusCodes,
  response
};
