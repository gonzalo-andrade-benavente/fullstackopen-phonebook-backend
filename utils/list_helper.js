const dummy = (arr) => {
    return 1
}

const totalLikes = (arr) => {
    if ( arr.length === 0 ) {
        return 0
    } 
    return arr.reduce( ( sum, { likes } ) => sum + likes, 0);
}

const favoriteBlog = (arr) => {
    if ( arr.length === 0 ) {
        return {}
    }

    return arr.reduce( (fav, item) => {
        return item.likes >= fav.likes ? item : fav ; 
    });

}

module.exports = {
    dummy
    , totalLikes
    , favoriteBlog
}