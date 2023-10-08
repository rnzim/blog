function adminUser(req,res,next){
    next()
   /*if(req.session.user != undefined){
        
        next()
    }else{
        res.redirect('/login')
    }
    */
}

module.exports = adminUser
