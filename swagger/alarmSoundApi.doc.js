const addSound = {
    tags: ["AlarmSound"],
    summary: "add AlarmSound",
    description: "add AlarmSound",
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
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        building_id: {
                            type: String,
                            example: "63cbd715a3c4d1230c263fbc",
                        },
                        "audio": {
                            "type": "string",
                            "format": "base64"
                        },
                        // audio: {
                        //     type: String,
                        //     example:'example.jpg',
                        //     format: 'base64',
                        // }
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
                        example: "does not exist!",
                    },
                    success: {
                        type: "string",
                        example: "0",
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
                        example: "No permission to perform this action",
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
                        example: "internal server ewrror",
                    },
                    success: {
                        type: "string",
                        example: "0",
                    },
                    data:[]
                },
            },
        },
    },
}

const updateSound = {
    tags: ["AlarmSound"],
    summary: "update AlarmSound with Id",
    description: "update AlarmSound with Id",
    parameters: [
        {
            name: "id",
            in: "path",
            required: "true",
            schema: {
                type: "string",
                example: "63d91abe7c0ffe45f0977c1a",
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
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        "audio": {

                            "type": "string",
                            "format": "base64"
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
                        example: "No building found with this ID",
                    },
                    success: {
                        type: "string",
                        example: "0",
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
                        example: "No permission to perform this action",
                    },
                    success: {
                        type: "string",
                        example: "0",
                    },
                },
            },
        },
    },
}

const soundWithBuilding = {
    tags: ["AlarmSound"],
    produces: "application/json",
    description: "For Get AlarmSound with building id",
    summary: "For Get AlarmSound with building id",
   
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
    parameters: [
        {
            name: "id",
            in: "path",
            required: "true",
            schema: {
                type: "string",
                example: "63cbd715a3c4d1230c263fbc",
            },
        },
    ],
    responses: {
        200: {
            description: "For Get AlarmSound with building id",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "Alarm Sound get succesfully",
                            },
                            success: {
                                type: String,
                                example: "1",
                            },
                        },
                    },
                },
            },
        },
        400: {
            description: "For Get alarm sound",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "No permission to perform this action",
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
            description: "For Get alarm sound",
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
                            data:[]
                        },
                    },
                },
            },
        },
    },
}


const singleSound = {
    tags: ["AlarmSound"],
    produces: "application/json",
    description: "For Get AlarmSound",
    summary: "For Get AlarmSound",
   
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
    parameters: [
        {
            name: "id",
            in: "path",
            required: "true",
            schema: {
                type: "string",
                example: "63d91abe7c0ffe45f0977c1a",
            },
        },
    ],
    responses: {
        200: {
            description: "For Get AlarmSound",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "Alarm Sound data get successfully",
                            },
                            success: {
                                type: String,
                                example: "1",
                            },
                        },
                    },
                },
            },
        },
        // 400: {
        //     description: "For Get buildingWithOrganizationId",
        //     content: {
        //         "application/json": {
        //             schema: {
        //                 type: "object",
        //                 properties: {
        //                     message: {
        //                         type: String,
        //                         example: "something wrong happened!",
        //                     },
        //                     success: {
        //                         type: String,
        //                         example: "0",
        //                     },
        //                 },
        //             },
        //         },
        //     },
        // },
    },
}

const deleteSound = {
    tags: ["AlarmSound"],
    summary: "delete AlarmSound with Id",
    description: "delete AlarmSound with Id",
    parameters: [
        {
            name: "id",
            in: "path",
            required: "true",
            schema: {
                type: "string",
                example: "63d9187d6a36c32ff41d8c93",
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
                        example: "AlarmSound has been deleted Successfully",
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
                        example: "No AlarmSound with this id exists.",
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


const alarmSoundApiDoc = {
    "/api/alarm-sound/add": {
        post: addSound,
    },
    "/api/alarm-sound/{id}":{
        put: updateSound,
        get: singleSound,
        delete: deleteSound,
    },
    "/api/alarm-sound/list/{id}": {
        get:soundWithBuilding
    }
};

module.exports = alarmSoundApiDoc;