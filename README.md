# mongodb

Node.js npm package for works with mongodb driver >= 4.2 version

## install

``` js
npm i mdb - driver
```

## use

### listDatabases

``` js
const Mdb = require('mdb-driver');
const db = new Mdb('mongodb://localhost:27017');

(async () => {
    let dbs = db.listDatabases();
    console.log(await dbs);
})();
```

### listCollections

``` js
let listCollections = db.listCollections('db_name');

(async () => {
    console.log(await listCollections);
})();
```

### findOne

``` js
let findOneResult = db.findOne({
    dbName: 'test',
    collection: 'users',
    query: {
        title: "Username"
    },
    options: {
        sort: {
            age: -1
        },
        projection: {
            _id: 0,
            age: 1,
            phone: 1
        },
    }
});

(async () => {
    console.log(await findOneResult);
})();
```

### find

``` js
let resultArray = db.find({
    dbName: 'test',
    collection: 'users',
    query: {
        age: {
            $lt: 15
        }
    },
    options: {
        sort: {
            name: 1
        },
        projection: {
            _id: 0,
            name: 1,
            phone: 1
        },
    }
});

(async () => {
    console.log(await resultArray);
})();
```

### insertOne

``` js
let insertOneResult = db.insertOne({
    dbName: 'test',
    collection: 'users',
    document: {
        {
            name: 'Bob',
            age: 31,
            phone: 6500000000
        }
    }
})
```

### insertMany

``` js
let insertMany = db.insertMany({
    dbName: 'test',
    collection: 'users',
    documents: [{
            name: 'Nikoly',
            age: 27,
            phone: 6500000009
        },
        {
            name: 'Mark',
            age: 55,
            phone: 6500000007
        },
        {
            name: 'Givi',
            age: 62,
            phone: 6500000005
        }
    ],
    options: {
        ordered: true
    }
})
```

### updateOne

``` js
let updateOneResult = db.updateOne({
    dbName: 'test',
    collection: 'users',
    filter: {
        name: 'Givi'
    },
    update: {
        $set: {
            age: 63
        }
    },
    options: {
        // this option instructs the method to create a document if no documents match the filter
        upsert: false
    }
})
```

### updateMany

``` js
let updateManyResult = db.updateMany({
    dbName: 'test',
    collection: 'users',
    filter: {
        birthday: toDay
    },
    update: {
        $inc: { //https://docs.mongodb.com/manual/reference/operator/update-field/
            age: 1
        }
    }
})
```

### replaceOne

``` js
let replaceOneResult = db.replaceOne({
    dbName: 'test',
    collection: 'users',
    query: {
        name: 'Bob'
    },
    replacement: {
        phone: 7500000000
    },
    options: {
        // create a document if no documents match the query
        upsert: true,
    }
})
```

### deleteOne

``` js
let deleteOneResult = db.deleteOne({
    dbName: 'test',
    collection: 'users',
    query: {
        phone: {
            $type: "string"
        }
    }
})
```

### deleteMany

``` js
let deleteManyResult = db.deleteMany({
    dbName: 'test',
    collection: 'users',
    query: {
        age: {
            $gte: 80 //https://docs.mongodb.com/manual/reference/operator/query-comparison/
        }
    }
})
```

### other

``` js
let res;
res = estimatedDocumentCount({
    dbName: 'test',
    collection: 'users'
});

res = countDocuments({
    dbName: 'test',
    collection: 'users',
    query: {
        age: {
            $in: [18, 65]
        }
    }
});

db.distinct({
    dbName,
    collection,
    field,
    query
})
//https://docs.mongodb.com/drivers/node/usage-examples/distinct
```
