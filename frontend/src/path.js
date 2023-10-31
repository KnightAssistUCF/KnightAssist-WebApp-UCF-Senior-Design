function buildPath(route) {
    // updated to include heroku path
    if (process.env.NODE_ENV === 'production') {
        return 'https://knightassist-43ab3aeaada9.herokuapp.com/' + route;
    }
    else {        
        return 'http://localhost:8000/' + route;
    }
}

export {buildPath};