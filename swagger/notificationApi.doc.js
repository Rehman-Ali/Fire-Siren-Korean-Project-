const sendNotification = {
    tags: ["FireNotification"],
    summary: "send FireNotification",
    description: "send FireNotification",
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
                            example: "11b3df08e3aa7f09708983f18921ii",
                        },
                        message: {
                            type: String,
                            example: "Fire Alarm",
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
                        example: "Fire Alarm save successfully",
                    },
                    success: {
                        type: "string",
                        example: "1",
                    },
                },
            },
        },
    },
}

const sendNotificationToUser = {
    tags: ["FireNotification"],
    summary: "send FireNotification to user",
    description: "send FireNotification to user",
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
                            example: "63db693e35592a2c1c8846f7",
                        },
                        message: {
                            type: String,
                            example: "Fire Alarm",
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
                        example: "Fire Alarm save successfully",
                    },
                    success: {
                        type: "string",
                        example: "1",
                    },
                },
            },
        },
    },
}


const updateNotification = {
    tags: ["FireNotification"],
    summary: "update FireNotification",
    description: "update FireNotification",
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
                example: "63da458c6b5e801f846f4f2a",
            },
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        message: {
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
                        example: "No Fire Alarm  is found with this ID",
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

const notificationWithDevice = {
    tags: ["FireNotification"],
    summary: "get FireNotification with device",
    description: "get FireNotification with device",
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
                example: "11b3df08e3aa7f09708983f18921ii",
            },
        },
    ],
    // requestBody: {
    //     content: {
    //         "application/json": {
    //             schema: {
    //                 type: "object",
    //                 properties: {
    //                     message: {
    //                         type: String,
    //                         example: "Main Bulevard Building, 2nd Floor Coridor",
    //                     },

    //                 },
    //             },
    //         },
    //     },
    //     required: "true",
    // },
    responses: {
        200: {
            description: "Ok",
            schema: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        example: "Fire Alarms message get succesfully",
                    },
                    success: {
                        type: "string",
                        example: "1",
                    },
                },
            },
        },
    },
}


const notificationWithBuilding = {
    tags: ["FireNotification"],
    summary: "get FireNotification with building",
    description: "get FireNotification with building",
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
                example: "63db693e35592a2c1c8846f7",
            },
        },
    ],
    // requestBody: {
    //     content: {
    //         "application/json": {
    //             schema: {
    //                 type: "object",
    //                 properties: {
    //                     message: {
    //                         type: String,
    //                         example: "Main Bulevard Building, 2nd Floor Coridor",
    //                     },

    //                 },
    //             },
    //         },
    //     },
    //     required: "true",
    // },
    responses: {
        200: {
            description: "Ok",
            schema: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        example: "Fire Alarms message get succesfully",
                    },
                    success: {
                        type: "string",
                        example: "1",
                    },
                },
            },
        },
    },
}

const singleNotification = {
    tags: ["FireNotification"],
    summary: "get single FireNotification",
    description: "get single FireNotification",
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
                example: "63db693e35592a2c1c8846f7",
            },
        },
    ],
    // requestBody: {
    //     content: {
    //         "application/json": {
    //             schema: {
    //                 type: "object",
    //                 properties: {
    //                     message: {
    //                         type: String,
    //                         example: "Main Bulevard Building, 2nd Floor Coridor",
    //                     },

    //                 },
    //             },
    //         },
    //     },
    //     required: "true",
    // },
    responses: {
        200: {
            description: "Ok",
            schema: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        example: "No Fire Alarm  exist",
                    },
                    success: {
                        type: "string",
                        example: "1",
                    },

                },
            },
        },
    },
}

const deleteNotification = {
    tags: ["FireNotification"],
    summary: "delete FireNotification with Id",
    description: "delete FireNotification with Id",
    parameters: [
        {
            name: "id",
            in: "path",
            required: "true",
            schema: {
                type: "string",
                example: "63bfdd0947e2d23d384c8b7e",
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
        400: {
            description: "Ok",
            schema: {
                type: "object",
                properties: {
                    message: {
                        type: String,
                        example: "No fire alarm data with this id exists.",
                    },
                    success: {
                        type: String,
                        example: "0",
                    },
                },
            },
        },
        200: {
            description: "Ok",
            schema: {
                type: "object",
                properties: {
                    message: {
                        type: String,
                        example: "FireNotification has been deleted Successfully",
                    },
                    success: {
                        type: String,
                        example: "1",
                    },
                },
            },
        },
    },
}

const notificationApiDoc = {
    "/api/fire-alarm/send": {
        post: sendNotification,
    },
    "/api/fire-alarm/send-notification": {
        post: sendNotificationToUser,
    },
    "/api/fire-alarm/{id}": {
        put: updateNotification,
        get: singleNotification,
        delete: deleteNotification,
    },
    "/api/fire-alarm/list/{id}": {
        get: notificationWithDevice
    },
    "/api/fire-alarm/list-building/{id}" : {
        get: notificationWithBuilding
    }
    // "/api/alarm-sound/{id}":{
    //     put: updateSound,
    //     get: singleSound,
    //     delete: deleteSound,
    // },
    // "/api/alarm-sound/list/{id}": {
    //     get:soundWithBuilding
    // }
};

module.exports = notificationApiDoc;