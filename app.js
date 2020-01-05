var express = require("express");
var app = express();
var todoController = require("./controllers/todoController");


app.set("view engine",'ejs');
app.use(express.static('./public'));

todoController(app);



app.listen(3000);
console.log('server start @ port 3000');