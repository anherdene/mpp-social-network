const R = require('ramda');
const fs = require('fs');

let rawData = fs.readFileSync('./dist/data.json');
let dummyData = JSON.parse(rawData);
let comments = dummyData['post_comments'];

// func user_id
const eqByUserId = (id)=>  R.propEq('user_id', id);

// func user_id
const eqByPostId = (id)=>  R.propEq('post_id', id);

// func user_id
const filterByUserId =(id,data) => R.filter(eqByUserId(id),data);

const filterByPostId =(id,data) => R.filter(eqByPostId(id),data);

/**
 * List of Post comments by post Id
 */
exports.comments = function(req, res) {
    res.send(filterByPostId(parseInt(req.post_id),comments ));
};

exports.filterByPostId = filterByPostId;