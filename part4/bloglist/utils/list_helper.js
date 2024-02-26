const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce(
        (accumulator, currentValue) => accumulator + currentValue.likes, 0
    )
}

const favouriteBlog = (blogs) => {
    const favourite_blog = blogs.sort((a, b) => a.likes - b.likes)[blogs.length - 1]
    return JSON.stringify({
        title: favourite_blog.title,
        author: favourite_blog.author,
        likes: favourite_blog.likes,
    })
}


module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}