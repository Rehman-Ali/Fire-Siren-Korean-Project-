const singleAppConfig = {
    tags: ["AppConfig"],
    produces: "application/json",
    description: "get method or api for single AppConfig ",
    summary: "get method or api for single AppConfig ",

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
                example: "63dd1912213e3f26d0b86290",
            },
        },
    ],
    responses: {
        200: {
            description: "get method or api for single AppConfig",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "No Data exist",
                            },
                            success: {
                                type: String,
                                example: "1",
                            },
                            data: {
                                type: Object,
                                example: '{}'
                            }
                        },
                    },
                },
            },
        },
    },
}

const singleAppConfigWithId = {
    tags: ["AppConfig"],
    produces: "application/json",
    description: "get method or api for single AppConfig with organization id",
    summary: "get method or api for single AppConfig with organization id",

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
            description: "get method or api for single AppConfig with organization id",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: String,
                                example: "Data get succesfully",
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

const deleteAppConfig = {
    tags: ["AppConfig"],
    summary: "delete AppConfig with Id",
    description: "delete AppConfig with Id",
    parameters: [
        {
            name: "id",
            in: "path",
            required: "true",
            schema: {
                type: "string",
                example: "63dd1912213e3f26d0b86290",
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
                        example: "No AppConfig with this id exists.",
                    },
                    success: {
                        type: String,
                        example: "0",
                    },
                },
            },
        },
        // 200: {
        //     description: "Ok",
        //     schema: {
        //         type: "object",
        //         properties: {
        //             message: {
        //                 type: String,
        //                 example: "AppConfig has been deleted Successfully",
        //             },
        //             success: {
        //                 type: String,
        //                 example: "1",
        //             },
        //         },
        //     },
        // },
    },
}

const updateAppConfig = {
    tags: ["AppConfig"],
    summary: "update AppConfig with Id",
    description: "update AppConfig with Id",
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
                        organization_id: {
                            type: String,
                            example: "63ca5e34be918b23685750eb",
                        },
                        app_config: {
                            type: Array,
                            example : [
                                {
                                    btnText: "text 1",
                                    btnFunction: "action name 1"
                                },
                                {
                                    btnText: "text 2",
                                    btnFunction: "action name 2",
                                },
                                {
                                    btnText: "text 3",    
                                    btnFunction: "action name 3"
                                },
                                {
    
                                    btnText: "text 4",
                                    btnFunction: "action name 4"
                                },
                                {
    
                                    btnText: "text 5",
                                    btnFunction: "action name 5"
                                },
                                {
                                    btnText: "text 6",
                                    btnFunction: "action name 6"
                                },
                                {
                                    btnText: "text 7",
                                    btnFunction: "action name 7"    
                                },
                                {
                                    btnText: "text 8",
                                    btnFunction: "action name 8"
                                },
                                {    
                                    btnText: "text 9",
                                    btnFunction: "action name 9"
                                }
    
                            ],
                        },
                        role: {
                            type: String,
                            example: "Examiner",
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
                        example: "No appConfig data found with this ID",
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
                        example: "something wrong happened",
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
                        example: "internal server error",
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

const registerAppConfig = {
    tags: ["AppConfig"],
    summary: "update AppConfig with Id",
    description: "update AppConfig with Id",
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
                        app_config: {
                            type: Array,
                            example : [
                                {
                                    btnText: "text 1",
                                    btnFunction: "action name 1"
                                },
                                {
                                    btnText: "text 2",
                                    btnFunction: "action name 2",
                                },
                                {
                                    btnText: "text 3",    
                                    btnFunction: "action name 3"
                                },
                                {
    
                                    btnText: "text 4",
                                    btnFunction: "action name 4"
                                },
                                {
    
                                    btnText: "text 5",
                                    btnFunction: "action name 5"
                                },
                                {
                                    btnText: "text 6",
                                    btnFunction: "action name 6"
                                },
                                {
                                    btnText: "text 7",
                                    btnFunction: "action name 7"    
                                },
                                {
                                    btnText: "text 8",
                                    btnFunction: "action name 8"
                                },
                                {    
                                    btnText: "text 9",
                                    btnFunction: "action name 9"
                                }
    
                            ],
                        },
                        role: {
                            type: String,
                            example: "Examiner",
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
                        example: "AppConfig save successfully",
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
                        example: "something went wrong",
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
                        example: "internal server error",
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


const appConfigApiDoc = {
   
    "/api/app-config/{id}": {
        get: singleAppConfig,
        put: updateAppConfig,
        delete: deleteAppConfig
    },
    "/api/app-config/save" :{
        post: registerAppConfig
    },
    "/api/app-config/list/{organization_id}": {
        get: singleAppConfigWithId,
    }
};

module.exports = appConfigApiDoc;