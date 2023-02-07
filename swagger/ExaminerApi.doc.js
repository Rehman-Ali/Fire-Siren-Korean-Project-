const examinerRegister = {
    tags: ["Examiner"],
    produces: "application/json",
    description: "post method or api for examiner Register",
    summary: "post method or api for examiner Register",
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
                        operator_id: {
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
            description: "post method or api for examiner Register",
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
        400: {
            description: "post method or api for examiner Register",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "Operator code in invalid!",
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

const updateExaminerWithId = {
    tags: ["Examiner"],
    summary: "update examiner with id",
    description: "update examiner with id",
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
                        first_name: {
                            type: String,
                            example: "Operator 1",
                        },
                        last_name: {
                            type: String,
                            example: "Operator 1",
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
            description: "Ok",
            schema: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        example: "No examiner found with this ID",
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

const GetExaminerOfOrganizationOfSpecificOperator = {
    tags: ["Examiner"],
    produces: "application/json",
    description: "For Get Examiner of all organization of specific Operator",
    summary: "For Get Examiner of all organization of specific Operator",
   
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
            name: "operator_id",
            in: "path",
            required: "true",
            schema: {
                type: "string",
                example: "63ca689a2e460635d8e2bdac",
            },
        },
    ],
    responses: {
        200: {
            description: "For Get Examiner of all organization of specific Operator",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "No data exist against your ID!",
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
            description: "For Get Examiner of all organization of specific Operator",
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
            description: "For Get Examiner of all organization of specific Operator",
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

const examinerWithOrganizationID = {
    tags: ["Examiner"],
    produces: "application/json",
    description: "For Get Examiner of all organization of specific Operator",
    summary: "For Get Examiner of all organization of specific Operator",
   
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
            name: "organization_id",
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
            description: "For Get Examiner of all organization of specific Operator",
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
    },
}

const singleExaminer ={
    tags: ["Examiner"],
    produces: "application/json",
    description: "get method or api for single Examiner ",
    summary: "get method or api for single Examiner ",
   
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
                example: "63ca68ba2e460635d8e2bdb2",
            },
        },
    ],
    responses: {
        200: {
            description: "get method or api for single Examiner",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "No Examiner exist",
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


const promoteEdxaminer ={
    tags: ["Examiner"],
    produces: "application/json",
    description: "Promote Examiner account to Operator account",
    summary: "Promote Examiner account to Operator account",
   
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
                example: "63ca68ba2e460635d8e2bdb2",
            },
        },
    ],
    responses: {
        400: {
            description: "Promote Examiner account to Operator account",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "No examiner with this id exists.",
                            },
                            success: {
                                type: String,
                                example: "0",
                            }
                        },
                    },
                },
            },
        },
    },
}
const deleteExaminer = {
    tags: ["Examiner"],
    summary: "delete Examiner with Id",
    description: "delete Examiner with Id",
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
                        example: "Examiner has been deleted Successfully",
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
                        example: "No Examiner with this id exists.",
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
const examinerApiDoc = {
    "/api/examiner/register": {
        post: examinerRegister,
    },
    "/api/examiner/{id}":{
        put: updateExaminerWithId,
        get: singleExaminer,
        delete: deleteExaminer
    }, 
    "/api/examiner/list/{operator_id}":{
        get: GetExaminerOfOrganizationOfSpecificOperator,
    },
    "/api/examiner/organization/{organization_id}" :{
        get:examinerWithOrganizationID,
    },
    "/api/examiner/promte-examiner/{id}" :{
        get: promoteEdxaminer,
    }
    // "/api/operator/{id}": {
    //     put: updateOperator,
    //     get: singleOperator,
    //     delete: deleteSingleOperator,
    // },
    // "/api/operator/demote-operator/{id}" :{
    //     post: demoteOperator,
    // },
    // "/api/operator/list": {
    //     get: listOperator,
    // }
};


module.exports = examinerApiDoc;