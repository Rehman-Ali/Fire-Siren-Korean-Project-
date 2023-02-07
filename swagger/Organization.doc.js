const listOrganizations = {
    tags: ["Organization"],
    produces: "application/json",
    description: "Get method or api for list of oragnization",
    summary: "Get method or api for list of oragnization",
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
            description: "To test the get method for organization list api",
            content: [
                {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                _id: {
                                    type: "string",
                                    example: "6300e4eb9075fa83b5e1649a",
                                },
                                administrator_id: {
                                    type: String,
                                    example: "null",
                                },
                                organization_name: {
                                    type: String,
                                    example: "Tafe C"
                                },
                                address: {
                                    type: String,
                                    example: "Street no 26, Block B",
                                },
                                phone: {
                                    type: String,
                                    example: "+9311993992"
                                },
                                createdAt: {
                                    type: String,
                                    example: "2023-01-10T13:43:52.663Z"
                                },
                                updatedAt: {
                                    type: String,
                                    example: "2023-01-10T13:43:52.663Z"
                                },
                                message: {
                                    type: String,
                                    example: "Organization get successfully."
                                },
                                success: {
                                    type: String,
                                    example: "1"
                                }
                            },
                        },
                    },
                },
            ],
        },
        500: {
            description: "To test the get method for organization list api",
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
        400: {
            description: "To test the get method for organization list api",
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
    },
}

const registerOrganization = {
    tags: ["Organization"],
    produces: "application/json",
    summary: " post method or api for organization registration ",
    description: "post method or api for organization registration",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        administrator_id: {
                            type: String,
                            example: "11b3df08e3aa7f09708983f12",
                        },
                        organization_name: {
                            type: String,
                            example: "Tafe B",
                        },
                        address: {
                            type: String,
                            example: "Street no 26, Block B",
                        },
                        phone: {
                            type: String,
                            example: "+9311993992"
                        }
                    },
                },
            },
        },
        required: "true",
    },
    responses: {
        200: {
            description: "post method or api for organization registration",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "Organization register successfully",
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
            description: "To test the post method for register organizationapi",
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
    },
}

const organizationWithId = {
    tags: ["Organization"],
    summary: "get organization with Id",
    description: "get organization with Id",
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
                        type: "string",
                        example: "No organization Found",
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
                        example: "No permission to perform this action",
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

const deleteOrganization = {
    tags: ["Organization"],
    summary: "delete organization with Id",
    description: "delete organization with Id",
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
                        example: "organization has been deleted Successfully",
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
}

const updateOrganizationWithId = {
    tags: ["Organization"],
    summary: "update organization with Id",
    description: "update organization with Id",
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
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        administrator_id: {
                            type: String,
                            example: "11b3df08e3aa7f09708983f12",
                        },
                        organization_name: {
                            type: String,
                            example: "Tafe B",
                        },
                        address: {
                            type: String,
                            example: "Street no 26, Block B",
                        },
                        phone: {
                            type: String,
                            example: "+9311993992"
                        }
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
                        example: "Organization has been updated successfully",
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
                        example: "Server Internal Error.",
                    },
                    success: {
                        type: "string",
                        example: "0",
                    },
                    data: [],
                },
            },
        },
    },
}

const organizationApiDoc = {
    "/api/organization/list-with-administor": {
        get: listOrganizations,
    },
    "/api/organization/register": {
        post: registerOrganization,
    },
    "/api/organization/administrator-organization/{id}": {
        get: organizationWithId,
        put: updateOrganizationWithId,
        delete: deleteOrganization,
    },
}


module.exports = organizationApiDoc;