const express = require('express');
const app = express();
const path = require('path');
const nunjucks = require('nunjucks');
const db = require('./db');

nunjucks.configure({ noCache: true });

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.get('/', (req, res, next)=> {
    res.render('index', { title: 'Home' });
});

app.use('/tweets', require('./routes/tweets'));

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));

db.sync((err)=> {
    if (err) return console.log(err);
    db.getTweets((err, tweets)=> {
        if (err) return console.log(err);
        console.log(tweets);
        db.seed((err)=> {
            if(err) return console.log(err);
            db.getTweets((err, tweets)=> {
                if(err) return console.log(err);
                console.log(tweets);
                db.getTweet(2, (err, tweet)=> {
                    if(err) return console.log(err);
                    console.log(`tweet with an id of 2 is ${tweet.name}`)
                })
            })
        })
    });
});

