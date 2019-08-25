module.exports = function invalidRequest(message) {
    let response = {};
    this.status(422);
    response.data = null;
    response.message = message;
    response.isValid = false;
    return this.send(response);
};