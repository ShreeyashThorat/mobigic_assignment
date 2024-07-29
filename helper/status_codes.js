function createResponse(status, code, message, error = null, data = null) {
    const response = {
        status,
        code,
        message,
    };
    if (error) {
        response.error = error;
    }
    if (data) {
        response.data = data;
    }
    return response;
}

export const statusJson = {
    ok: ({ message = 'Success', data = null }) => createResponse(true, statusCodes.OK, message, null, data),
    created: ({ message = 'Created', data = null }) => createResponse(true, statusCodes.CREATED, message, null, data),
    accepted: ({ message = 'Accepted', data = null }) => createResponse(true, statusCodes.ACCEPTED, message, data),
    badRequest: ({ message = 'Bad request', error = null, data = null }) => createResponse(false, statusCodes.BAD_REQUEST, message, error, data),
    unauthorized: ({ message = 'Unauthorized', error = null, data = null }) => createResponse(false, statusCodes.UNAUTHORIZED, message, error, data),
    forbidden: ({ message = 'Forbidden', error = null, data = null }) => createResponse(false, statusCodes.FORBIDDEN, message, error, data),
    notFound: ({ message = 'Not found', error = null, data = null }) => createResponse(false, statusCodes.NOT_FOUND, message, error, data),
    methodNotAllowed: ({ message = 'Method Not Allowed', error = null, data = null }) => createResponse(false, statusCodes.METHOD_NOT_ALLOWED, message, error, data),
    conflict: ({ message = 'Confilct', error = null }) => createResponse(false, statusCodes.CONFLICT, message, error, data),
    unsupportedMedia: ({ message = 'Unsupported Media Type', error = null, data = null }) => createResponse(false, statusCodes.UNSUPPORTED_MEDIA_TYPE, message, error, data),
    internalServerError: ({ message = 'Internal server error', error = null, data = null }) => createResponse(false, statusCodes.INTERNAL_SERVER_ERROR, message, error, data),
    serviceUnavailable: ({ message = 'Service Unavailable', error = null, data = null }) => createResponse(false, statusCodes.SERVICE_UNAVAILABLE, message, error, data),
    custom: (status, code, message, error = null, data = null) => createResponse(status, code, message, error, data),
};

export const statusCodes = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    PAY_REQUIRE: 402,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNSUPPORTED_MEDIA_TYPE: 415,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
};
