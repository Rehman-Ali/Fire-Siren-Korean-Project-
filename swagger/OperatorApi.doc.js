const operatorRegister = {
    tags: ["Operator"],
    produces: "application/json",
    description: "post method or api for operato rRegister",
    summary: "post method or api for operator Register",
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
                            example: "63bd6b98e1341a28a8045d6f",
                        },
                        first_name: {
                            type: String,
                            example: "Operator 1",
                        },
                        last_name: {
                            type: String,
                            example: "Operator 1",
                        },
                        email: {
                            type: String,
                            example: "op2@gmail.com",
                        },
                        password: {
                            type: String,
                            example: "1234",
                        },
                        address: {
                            type: String,
                            example: "Street no 26, Block B"
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
            description: "To test the get method for admin sign up api",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "string",
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
    },
}

const updateOperator = {
    tags: ["Operator"],
    produces: "application/json",
    description: "put method or api for operator update",
    summary: "put method or api for operator update",
   
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
                example: "63bd85b5e17e0f2dcc71e91b",
            },
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        organization_id: {
                            type: String,
                            example: "63bd6b98e1341a28a8045d6f",
                        },
                        first_name: {
                            type: String,
                            example: "Operator 1",
                        },
                        last_name: {
                            type: String,
                            example: "Operator 1",
                        },
                        email: {
                            type: String,
                            example: "op2@gmail.com",
                        },
                        password: {
                            type: String,
                            example: "1234",
                        },
                        address: {
                            type: String,
                            example: "Street no 26, Block B"
                        },
                        phone: {
                            type: String,
                            example: "+9311993992"
                        },
                        status: {
                            type: String,
                            example: "approved"
                        }
                    },
                },
            },
        },
        required: "true",
    },
    responses: {
        200: {
            description: "put method or api for operator update",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "string",
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
    },
}

const singleOperator ={
    tags: ["Operator"],
    produces: "application/json",
    description: "get method or api for single operator ",
    summary: "get method or api for single operator ",
   
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
                example: "63bd85b5e17e0f2dcc71e91b",
            },
        },
    ],
    responses: {
        200: {
            description: "put method or api for operator update",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "No Oprator exist",
                            },
                            success: {
                                type: String,
                                example: "1",
                            },
                            data : {
                                type: Object,
                                example :'{}'
                            }
                        },
                    },
                },
            },
        },
    },
}
const deleteSingleOperator ={
    tags: ["Operator"],
    produces: "application/json",
    description: "delete method or api to delete single operator ",
    summary: "delete method or api to delete single operator ",
   
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
                example: "63bd85b5e17e0f2dcc71e91b",
            },
        },
    ],
    responses: {
        200: {
            description: "delete method or api to delete single operator ",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "No Operator with this id exists.",
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

const listOperator = {
    tags: ["Operator"],
    produces: "application/json",
    description: "get method or api to get list of operators",
    summary: "get method or api to get list of operators",
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
            description: "get method or api to get list of operators",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "No Operator Found",
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

const operatorApiDoc = {
    "/api/operator/register": {
        post: operatorRegister,
    },
    "/api/operator/{id}": {
        put: updateOperator,
        get: singleOperator,
        delete: deleteSingleOperator,
    },
    "/api/operator/list": {
        get: listOperator,
    }
};


module.exports = operatorApiDoc;