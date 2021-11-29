const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//connect with mongodb
const dbURI ='mongodb+srv://dbTarun:UGq7Mv3RdiYF8Ybq@nodetuts.m0mnp.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log('connected to db');
        //we dont want to listen for request untill we haven't connected to database,that's why we listen here
        app.listen(3000);
    })
        .catch((err) => console.log('error ::--',err))
//register view engine
app.set('view engine','ejs');

//listen for request
//app.listen(3000);
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res) => {
    res.redirect('/blogs');
});

app.get('/about',(req,res) => {
    res.render('about', { title : "About"});
});

//blog routes
app.use('/blogs',blogRoutes);

//404
app.use((req,res) => {
    res.status(404).render('404', { title : "404" });
});