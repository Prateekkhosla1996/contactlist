const express = require('express');
const path = require('path');
const port=8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact')
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());//middleware use for encoding data from browser
app.use(express.static('assets'));

var contactList=[
    {name:"prateek",
    phone:"7838963980"
    }
]

app.get('/',function(req,res){
    
    Contact.find({},function(err,contacts){
     if(err){
        console.log('error in fetching contacts'); 
     }
     return res.render('home',{title:"My Contact List",
     contact_List:contacts
    })
   
    });
})


app.get('/practice',function(req,res){

    return res.render('practice',{title:"i am here for practice"});
})

app.post('/contactlist',function(req,res){
    //contactList.push(req.body)
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error',err);
        }
        console.log('***********',newContact);
        return res.redirect('back');
    })
    
})
app.get('/delete-contact/',function(req,res){
    let id=req.query.id;

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error",err);
            return;
        }
        return res.redirect('back');
    })
    // let contactIndex=contactList.findIndex(contact => contact.phone==phone);
    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }
    // return res.redirect('back');

})

app.listen(port,function(err){
    if(err){
        console.log('error',err);
    }
    console.log('yup server is running on the port:',port);
});