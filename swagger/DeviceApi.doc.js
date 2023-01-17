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
                        device_id: {
                            type: String,
                            example: "11b3df08e3aa7f09708983f12",
                        },
                        device_installed_location: {
                            type: String,
                            example: "Main Bulevard Building, 2nd Floor Coridor ",
                        },
                        building_id: {
                            type: String,
                            example: "63bfe4ba5903593e2c714e50",
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
    },
}


const deviceApiDoc = {
    "/api/device/register": {
        // get: listUserProfiles,
        post: deviceRegister,
    },

};

module.exports = deviceApiDoc;