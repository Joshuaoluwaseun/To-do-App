const express = require('express');
const app = express();
const todos = require('./routes.js/to-dos');


require('./startUp/to-dodb')()

app.use(express.json());
app.use('/api/todos', todos)

const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));