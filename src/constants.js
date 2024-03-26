const statusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

const errorMessages = {
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not found',
  INTERNAL_SERVER_ERROR: 'Something went wrong... Please try again later',
  NO_PERMISSION: 'You have no permission'
};

const response = (res, { status = statusCode.BAD_REQUEST, data }) => {
  res.status(status).json(data);
};

module.exports = {
  statusCode,
  errorMessages,
  response
};
