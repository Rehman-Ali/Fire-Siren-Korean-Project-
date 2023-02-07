const buildingRegister = {
    tags: ["Building"],
    produces: "application/json",
    description: "post method or api for building Register",
    summary: "post method or api for building Register",
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
                        organization_id: {
                            type: String,
                            example: "63ca5e34be918b23685750eb",
                        },
                        building_name: {
                            type: String,
                            example: "Testing building test",
                        },
                        building_address: {
                            type: String,
                            example: "Test address",
                        },
                        building_phone: {
                            type: String,
                            example: "+03117880346",
                        },
                    },
                },
            },
        },
        required: "true",
    },
    responses: {
        200: {
            description: "post method or api for building Register",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "Building already Register!",
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
        // 400: {
        //     description: "post method or api for building Register",
        //     content: {
        //         "application/json": {
        //             schema: {
        //                 type: "object",
        //                 properties: {
        //                     message: {
        //                         type: String,
        //                         example: "Operator code in invalid!",
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

const buildingWithOrganizationId = {
    tags: ["Building"],
    produces: "application/json",
    description: "For Get buildingWithOrganizationId",
    summary: "For Get buildingWithOrganizationId",
   
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
                example: "63ca5e34be918b23685750eb",
            },
        },
    ],
    responses: {
        200: {
            description: "For Get buildingWithOrganizationId",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "Examiner get succesfully",
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
            description: "For Get buildingWithOrganizationId",
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
    },
}

const singleBuilding = {
    tags: ["Building"],
    produces: "application/json",
    description: "For Get single building",
    summary: "For Get single building",
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
                example: "63ca5e34be918b23685750eb",
            },
        },
    ],
    responses: {
        200: {
            description: "For Get single building",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "No building found!",
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

const updateBuilding = {
    tags: ["Building"],
    summary: "update building with Id",
    description: "update building with Id",
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
    requestBody: {
        content: {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        organization_id: {
                            type: String,
                            example: "63c53f10e7811e359c8c75e4",
                        },
                        building_name: {
                            type: String,
                            example: "Building twoo0",
                        },
                        building_address: {
                            type: String,
                            example: "Main Road, State Avenue",
                        },
                        building_phone: {
                            type: String,
                            example: "+931388021022"
                        },
                        "image": {
                            "type": "string",
                            "format": "base64",
                            "example":'example.jpg'
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




const deleteBuilding = {
    tags: ["Building"],
    summary: "delete building with Id",
    description: "delete building with Id",
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
                        example: "No building exists with this ID.",
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
                        example: "Building has been deleted Successfully",
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


const buildingApiDoc = {
    "/api/building/register": {
        post: buildingRegister,
    },
    "/api/building/{id}" :{
        get: singleBuilding,
        put: updateBuilding,
        delete: deleteBuilding
    },
    "/api/building/get-with-organization/{id}" :{
        get: buildingWithOrganizationId,
    }

};

module.exports = buildingApiDoc;