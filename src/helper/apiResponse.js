const httpStatus = require('http-status');

class ApiResponse {
    constructor(data, status, message) {
        this.data = data;
        this.status = status;
        this.message = message;
    }
}

class ApiPagingResponse {
    constructor(data, pageIndex, pageSize, totalCount, totalPage) {
        this.data = data;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        this.totalPage = totalPage;
    }
}

module.exports = {
    ApiResponse,
    ApiPagingResponse
}