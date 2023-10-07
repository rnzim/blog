const express = require('express')
const router = express.Router()
const User = require('./User')
const bcrypt = require('bcryptjs')
const session = require('express-session')

router.get('/login',(req,res)=>{
    res.render('admin/user/login')
})
router.get('/users',(req,res)=>{
    User.findAll().then((user)=>{
        res.render('admin/user/users.ejs',{user:user})
    })
   
})

router.get('/admin/create',(req,res)=>{
    res.render('admin/user/newUser.ejs')
})
router.post('/admin/create/save',(req,res)=>{
   var name = req.body.email
   var pass = req.body.pass

   User.findOne({where:{name:name}}).then((user)=>{
     if(user == undefined){
        
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(pass,salt)
        User.create({
            name:name,
            pass:hash
        }).then(()=>{
            console.log('\u001b[36mnew user created')
            res.redirect('/login')
        })
       
     }else{
        res.redirect('/admin/create')
        console.log('existi esse usuario')
     }
   })
   

   
})
router.post('/authenticate',(req,res)=>{
    //req.session.login = false
    var email = req.body.email
    var pass = req.body.pass
    User.findOne({where:{name:email}}).then((user)=>{
        if(user != undefined){
         var correct = bcrypt.compareSync(pass,user.pass)
         if(correct){
            req.session.user= {email: user.name,id:user.id}
            console.log(req.session.user)
            //res.redirect('/articles')
            res.json(req.session.user)
         }
         
        else{
            res.redirect('/login')

         }
        }else{
            res.redirect('/login')
        }


    })
})
router.post('/admin/user/delete',(req,res)=>{
    var id = req.body.id
    if(!isNaN(id)){
       if(id == undefined){
        res.send('<h1>Por Favor Não Faça isso </h1><p>Caso Encontre Alguma Vulnerabilidade Entre Em Contato Em <strong>rnzim@dotnode.com</strong> undefined</p>')
       }else{ 
        User.destroy({where:{id:id}
        }).then(()=>{
            res.redirect('/users')
        })
      }
    }else{
        res.send('<h1>Por Favor Não Faça isso </h1><p>Caso Encontre Alguma Vulnerabilidade Entre Em Contato Em <strong>rnzim@dotnode.com</strong> NaN</p>')
    }
})

module.exports = router