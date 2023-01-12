const adminSignUp = {
    tags: ["adminSignUp"],
    produces: "application/json",
    description: "post method or api for admin signup",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        first_name: {
                            type: String,
                            example: "Henry",
                        },
                        last_name: {
                            type: String,
                            example: "Devis",
                        },
                        email: {
                            type: String,
                            example: "abc@gmail.com",
                        },
                        password: {
                            type: String,
                            example: "1234",
                        },
                        address: {
                            type: String,
                            example: "Street no 29, Main avenue",
                        },
                        phone: {
                            type: String,
                            example: "+923117889347",
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
                            message :  {
                                type:String,
                                example: "User already registered."
                            },
                            success : {
                                type: String,
                                example:"0"
                            }
                        },
                    },
                },
            },
        },
    },
};

const adminLogin ={
    tags: ["adminSignUp"],
    produces: "application/json",
    description: "post method or api for admin signup",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        email: {
                            type: String,
                            example: "abc@gmail.com",
                        },
                        password: {
                            type: String,
                            example: "1234",
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
                                example: "login successfull",
                            },
                            user_id: {
                                type: String,
                                example: "63bffc232ced8a42f89de427",
                            },
                            token: {
                                type: String,
                                example: "token"
                            },
                            success: {
                                type: String,
                                example: "1"
                            }

                        },
                    },
                },
            },
        },
    },
}


const adminApiDoc = {
    "/api/admin/signup": {
        // get: listUserProfiles,
        post: adminSignUp,
    },
    "/api/admin/login": {
        // get: listUserProfiles,
        post: adminLogin,
    },
};


module.exports = adminApiDoc