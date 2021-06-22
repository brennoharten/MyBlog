const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Account = require('../../model/Account')
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    async function(username, password, done) {
        
        let account = await Account.findOne({
            where:{
                username:username
            }
        })
        
        if (account == null) {
            return done(null, false, {message: "Invalid username or password"})
            res.send("deu errado")
        }
        
        bcrypt.compare(password, account.password, function(err, result){
            if(result){
                //todo criar sessão
                return done(null, account)
            } else {
                return done(null, false, {message: "Invalid username or password"})
            }
        })
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        let account = await Account.findOne({
            where:{
                id:id
            }
        })
        done(null, account);

    } catch(err) {
        done(err, account);
    }
});

module.exports = passport;