const { FAILURE } = require("./successCodes")

const sendResponse = (_res, _statusCode = 200, _success = FAILURE, _message = '', _data = null, _error = null) => {
    return _res.status(_statusCode).json({
        statusCode: _statusCode,
        success: _success,
        message: _message,
        data: _data,
        error: _error
    })
}


const sendError = (_res, _statusCode = 500, _success = FAILURE, _message = '', _data = null, _error = null) => {
    return _res.status(_statusCode).json({
        statusCode: _statusCode,
        success: _success,
        message: _message,
        data: _data,
        error: _error
    })
}

const renderPage = (_res, _filePath, _renderData = {}) => {
    return _res.render(_filePath, { title: "No title found", ..._renderData })
}

module.exports = { sendResponse, sendError, renderPage }