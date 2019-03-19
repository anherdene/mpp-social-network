const R = require('ramda');
const fs = require('fs');


let rawData = fs.readFileSync('./dist/data.json');
let dummyData = JSON.parse(rawData);
let posts = dummyData['posts'];

// adding post to posts function
const addToPost = (post,posts) =>R.append(post,posts);

// equlas to user_id
const eqByUserId = (id)=>  R.propEq('user_id', id);

// filtering by user id function
const filterUserId =(id,data) => R.filter(eqByUserId(id),data);

/**
 * List of Posts
 */
exports._listPost = function(userId) {
    return filterUserId(userId,posts);
};
/**
 * List of Posts
 */
exports.list = function(req, res) {
    res.send(exports._listPost(parseInt(req.params.userId)));
};

exports._createPost = function (postContent,userId) {
    let curDate = new Date();
    const newPost ={
        id: posts.length + 1,
        content:postContent,
        created_date: curDate.toJSON(),
        user_id: parseInt(userId)
    };
    posts = addToPost(newPost,posts);
    return posts;
};

/**
 * Insert new post
 */
exports.create = function (req, res) {

    if (!req.body) {
        return res.status(400).send({
            message: 'Post cannot be empty!'
        });
    }
    exports._createPost (req.body,3)
    res.status(200).send();
};
