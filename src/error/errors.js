export const BadRequestNotFoundHandler = "BadRequestNotFoundHandler"
export const BadRequestRecordDoesNotExist = "BadRequestRecordDoesNotExist"
export const BadRequestRecordAlreadyExist = "BadRequestRecordAlreadyExist"

export const errorList = {
    BadRequestNotFoundHandler: {
        name: BadRequestNotFoundHandler,
        code: "BAD_REQUEST_PATH_NOT_FOUND"
    },
    BadRequestRecordAlreadyExist: {
        name: BadRequestRecordAlreadyExist,
        code: "BAD_REQUEST_RECORD_ALREADY_EXIST",
    },
    BadRequestRecordDoesNotExist: {
        name: BadRequestRecordDoesNotExist,
        code: "BAD_REQUEST_RECORD_DOES_NOT_EXIST"
    }
}
