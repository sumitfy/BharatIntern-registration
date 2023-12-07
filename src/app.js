const express  = require('express');
const mongoose = require('mongoose');
const hbs = require('hbs');
const bodyParser = require('body-parser')
const infoM = require('./model/info')

mongoose.connect('mongodb://localhost:27017/bharat-registration')
const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get('/' , (req,res)=>{
    res.render('login.hbs');
})
app.post('/login-form' , async(req,res)=>{
    const data = await infoM.find({email:req.body.email , password:req.body.password});
    try {
        if(data.length > 0){
            const id = data[0]._id;
            return res.redirect('/register-form/'+id);
        }
        else{
            console.log('dsn,cvn.,xncv.,mnzxc,;mvncx,.vmnxc,mvn/cx,mvn/,mcxnv/,mnv/zcxvx,m/.cz')
            res.redirect('/register')
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).send('internal server')
    }
    
})
app.get('/register' , (req,res)=>{
    res.render('register.hbs')
})
app.get('/register-form/:id' , async(req,res)=>{
    const id = req.params.id;
    const data = await infoM.findOne({_id:id});
    res.render('main.hbs',{data:data});
})
app.post('/register-form' , async(req,res)=>{
    const userdata = new infoM(req.body);
    await userdata.save();
    res.redirect('/register-form/'+userdata.id);
})


app.listen(4000 , ()=>{
    console.log('server is listen on port 4000')
});