var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var data = [
    {item:'get Link'},
    {item:'walk dog'},
    {item:'kid play'}
]
mongoose.connect('mongodb://localhost:27017/todos',{useNewUrlParser: true},function(err,db){
    console.log('connect success!');
});

var Schema = mongoose.Schema;
var todoSchema = new Schema({
    item:String
});
var Todo = mongoose.model('Todo2',todoSchema);

console.log(Todo.create);
module.exports = function(app){
    var urlEncodeParser = bodyParser.urlencoded({ extended: false });
    //app.use('/todo/del',)
    //app.use('/todo/del', bodyParser.json())
    //查询记录
    app.get('/todo', async function(req,res){
        const list = await Todo.find();
        res.render('todo',{todos:list});
    });
    //添加记录
    app.post('/todo',urlEncodeParser,async function(req,res){
        var itemOne = await Todo(req.body).save(function(err){
            if(err){
                throw err;
            }
            console.log('item saved');
        });
        res.send(req.body);
    });
    //删除记录
    app.post('/todo/del',urlEncodeParser, async function(req,res){
        console.log(req.params);
        var sel = await Todo.deleteOne({
            'item':req.body.item
        })
        console.log(sel)
        res.send({"code":1,item:req.body.item});
    })
}