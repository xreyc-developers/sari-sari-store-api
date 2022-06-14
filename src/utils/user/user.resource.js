class UserResource {
    constructor(res, request_uid = null) {
        this.user_id = res.locals.user.user_id;
        this.email = res.locals.user.email;
        this.role = res.locals.user.role;
        this.request_uid = request_uid;
    }

    isResourceOwner() {
        return this.user_id === this.request_uid;
    }

    getUserId() {
        return this.user_id;
    }
}

module.exports = UserResource;