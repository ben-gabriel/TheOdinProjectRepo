const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended:false}));

router.get('/new', (req, res)=>{
    res.render('newPost');
});

const {database,testFun} = require('../database.js');

router.post('/new', (req,res)=>{
    
    let postId = 0;
    let newPost = database.createOneDocument(req.body);

    newPost.then(data=>{
        postId = data;
        console.log('postId = ', postId)

        res.redirect('./'+postId);
    }).catch(()=>{
        res.render('404');
    });
    

});

router.post('/delete', (req,res)=>{
    
    if(req.body._id){
        let query = Number(req.body._id);
        database.deleteOneDocument({_id : query}).then(()=>{
            res.redirect('/');
            console.log('log inside /posts/delete 1');
        }).catch(console.error);
    }
    else{
        res.redirect('/');
        console.log('log inside /posts/delete 2');

    }

});

router.get('/:id', (req, res)=>{
    // res.send('post with id: ' + req.params.id + ' here');
    let query = Number(req.params.id);

    console.log('log inside get /:id = ', query);

    database.findOneDocument({_id: query}).then((post)=>{
        if(post){
            res.render('singlePost', {post});
        }
        else{
            res.render('404')
        }
    });

});

module.exports = router;