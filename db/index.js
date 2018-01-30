const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();

const SQL_CREATE = `
    DROP TABLE IF EXISTS tweets;
    CREATE TABLE tweets(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        message VARCHAR(255)
    );    
`;


const sync = (cb)=> {
    client.query(SQL_CREATE, cb);
};

const getTweets = (cb)=> {
    client.query('SELECT * from tweets', (err, result)=> {
        if(err) return cb(err);
        cb(null, result.rows);
    })
};

const SQL_SEED = `
    INSERT INTO tweets(name, message) values('Pinkie', 'PINKIE HAS A PINK FACE!');
    INSERT INTO tweets(name, message) values('Bunny', 'BUNNY RABBIT IS ADORABLE!!!');
    INSERT INTO tweets(name, message) values('Teletubby', 'TELETUBBY GOES LA, LA, LA!');
`;


const seed = (cb)=> {
    client.query(SQL_SEED, cb);
};

const getTweet = (id, cb)=> {
    client.query('SELECT * from tweets WHERE id = $1', [ id ], (err, result)=> {
       if(err) return cb(err);
       cb(null, result.rows.length ? result.rows[0] : null);
    });
};


module.exports = {
    sync,
    getTweets,
    seed,
    getTweet 
}


