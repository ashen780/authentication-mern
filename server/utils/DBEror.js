const DBError = (error) => {
    const errorCode = error.message.split(' ')[0];
    console.log(errorCode);
    switch (errorCode) {
        case 'E11000':
            error.message = 'this user is alredy exists';
            return error;
        case 'E50':
            error.message = 'Request time out';
            return error
        default:
            error.message = 'database error pleace try again later';
            return error
    }
}

module.exports = DBError;