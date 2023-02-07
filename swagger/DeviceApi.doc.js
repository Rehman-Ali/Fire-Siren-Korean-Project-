const deviceRegister = {
    tags: ["Device"],
    produces: "application/json",
    description: "post method or api for device registration",
    summary: "post method or api for device registration",
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'x-auth-token'
          }
        }
      },
      security: [{
        bearerAuth: []
      }],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        device_code: {
                            type: String,
                            example: "11b3df08e3aa7f09708983f12",
                        },
                        device_installed_location: {
                            type: String,
                            example: "Main Bulevard Building, 2nd Floor Coridor ",
                        },
                        building_id: {
                            type: String,
                            example: "63db693e35592a2c1c8846f7",
                        },
                    },
                },
            },
        },
        required: "true",
    },
    responses: {
        200: {
            description: "To test the get method for admin sign up api",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "message",
                            },
                            success: {
                                type: String,
                                example: "0",
                            },
                        },
                    },
                },
            },
        },
        400: {
            description: "To test the get method for admin sign up api",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "Errors",
                            },
                            success: {
                                type: String,
                                example: "0",
                            },
                        },
                    },
                },
            },
        },
    },
}

const listDevice = {
    tags: ["Device"],
    produces: "application/json",
    description: "get method or api to get list of devices",
    summary: "get method or api to get list of devices",
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'x-auth-token'
            }
        }
    },
    security: [{
        bearerAuth: []
    }],
    responses: {
        200: {
            description: "get method or api to get list of devices",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "No devices Found",
                            },
                            success: {
                                type: String,
                                example: "0",
                            },
                        },
                    },
                },
            },
        },
        400: {
            description: "get method or api to get list of devices",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "something wrong happened!",
                            },
                            success: {
                                type: String,
                                example: "0",
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: "get method or api to get list of devices",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "Server Internal Error.",
                            },
                            success: {
                                type: String,
                                example: "0",
                            },
                            data: [],
                        },
                    },
                },
            },
        },
    },
}

const deviceWithId = {
    tags: ["Device"],
    summary: "get device with Id",
    description: "get device with Id",
    parameters: [
        {
            name: "id",
            in: "path",
            required: "true",
            schema: {
                type: "string",
                example: "63c0185e9d47eb116c8eba0d",
            },
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'x-auth-token'
            }
        }
    },
    security: [{
        bearerAuth: []
    }],

    responses: {
        200: {
            description: "Ok",
            schema: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        example: "No device Found",
                    },
                    success: {
                        type: "string",
                        example: "1",
                    },
                },
            },
        },
        400: {
            description: "Ok",
            schema: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        example: "something wrong happened!",
                    },
                    success: {
                        type: "string",
                        example: "1",
                    },
                },
            },
        },
        500: {
            description: "Ok",
            schema: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        example: "Server Internal Error.",
                    },
                    success: {
                        type: "string",
                        example: "1",
                    },
                    data: []
                },
            },
        },
    },
}

const updateDeviceWithId = {
    tags: ["Device"],
    summary: "update device with Id",
    description: "update device with Id",
    parameters: [
        {
            name: "id",
            in: "path",
            required: "true",
            schema: {
                type: "string",
                example: "63c0185e9d47eb116c8eba0d",
            },
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'x-auth-token'
            }
        }
    },
    security: [{
        bearerAuth: []
    }],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        device_installed_location: {
                            type: String,
                            example: "Main Bulevard Building, 2nd Floor Coridor",
                        },
                    },
                },
            },
        },
        required: "true",
    },
    responses: {
        200: {
            description: "Ok",
            schema: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        example: "No device found with this ID",
                    },
                    success: {
                        type: "string",
                        example: "0",
                    },
                },
            },
        },
        500: {
            description: "Ok",
            schema: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        example: "Server Internal Error.",
                    },
                    success: {
                        type: "string",
                        example: "0",
                    },
                    data: []
                },
            },
        },
    },
}

const deleteDevice = {
    tags: ["Device"],
    summary: "delete device with Id",
    description: "delete device with Id",
    parameters: [
        {
            name: "id",
            in: "path",
            required: "true",
            schema: {
                type: "string",
                example: "6300e4eb9075fa83b5e1649a",
            },
        },
    ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'x-auth-token'
          }
        }
      },
      security: [{
        bearerAuth: []
      }],

    responses: {
        200: {
            description: "Ok",
            schema: {
                type: "object",
                properties: {
                    message: {
                        type: String,
                        example: "device has been deleted Successfully",
                    },
                    success: {
                        type: String,
                        example: "1",
                    },
                },
            },
        },
        400: {
            description: "Ok",
            schema: {
                type: "object",
                properties: {
                    message: {
                        type: String,
                        example: "No Device with this id exists.",
                    },
                    success: {
                        type: String,
                        example: "0",
                    },
                },
            },
        },

    },
}

const deviceApiDoc = {
    "/api/device/register": {
        // get: listUserProfiles,
        post: deviceRegister,
    },
    "/api/device/list" :{
        get: listDevice
    },
    "/api/device/{id}" :{
        get: deviceWithId,
        put: updateDeviceWithId,
        delete: deleteDevice,
    }

};

module.exports = deviceApiDoc;