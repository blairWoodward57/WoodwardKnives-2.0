                       require('dotenv').config();
const express        = require('express');
const session        = require('express-session');
const bodyParser     = require('body-parser');
const massive        = require('massive');
const passport       = require('passport');
const Auth0Strategy  = require('passport-auth0');
const cors           = require('cors');
const dotenv         = require('dotenv');
const stripe         = require('stripe')( process.env.STRIPE_SECRET_KEY );

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then(db => {
    console.log('massive database connected using connection string')
    app.set('db', db)
})

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, extraParams, profile, done) => {
    const db = app.get('db')
    db.find_user([profile.identities[0].user_id]).then(user => {
        // console.log(profile._json)
        if (user[0]) {
            // console.log('logged in', user[0])
            return done(null, user[0].id)
        } else {
            const user = profile._json;
            // console.log('this is the google user', user)
            const tempString = user.name.split(' ');
            const firstName = tempString[0];
            const lastName = tempString[1];
            db.create_user([firstName, lastName, user.identities[0].user_id, profile._json.picture])
                .then(user => {
                    console.log('new user', user);
                    return done(null, user[0].id)
                })
        }
    })
}))

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/',
    failureRedirect: '/auth'
}))

app.get('/auth/me', (req, res) => {
    if (!req.user) {
        return res.status(200).send('User not found.')
    }
    return res.status(200).send(req.user);
})

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(302, 'https://blairwoodward57.auth0.com/v2/logout?returnTo=http://localhost:3000/#/')
})

passport.serializeUser((id, done) => {

    done(null, id);
})

passport.deserializeUser((id, done) => {
    app.get('db').find_current_user([id])
        .then(user => {
            done(null, user[0])
        })
})

app.get('/api/knives', (req, res, next) => {
    const db = app.get("db");
    db.get_knives()
      .then(knives => {
          res.status(200).send(knives)
      })
})

app.get('/api/currentuser', (req, res, next) => {
    const db = app.get("db");
    const user = req.user;
    // console.log('this is the req.user', user.id)
    db.find_current_user([user.id])
        .then(user => {
            console.log('this is the user,', user[0].firstname, user[0].lastname)
            res.status(200).send(user[0])
        })
})

app.get('/api/knife/:id', (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;
    console.log('gotten knife id', req.params.id)
    db.get_knife([id])
      .then(knife => {
          res.status(200).send(knife)
      })
})

app.get('/api/getorders', (req, res, next) => {
    const db = req.app.get("db");
    db.get_orders()
        .then(order => {
            res.status(200).send(order);
        })
})

app.put('/api/closeorder/:orderid', (req, res, next) => {
    const db = req.app.get("db");
    const id = req.params.orderid
    console.log(id)
    db.close_order([id])
        .then(closedorder => {
            console.log('hitting the close order endpoint', closedorder)
            res.status(200).send(closedorder)
        })
})

app.put('/api/useraddress/:id', (req, res, next) => {
    const db = req.app.get("db");
    const id = req.user.auth_id;
    if (req.body.address_1){
        // console.log('about to update address 1')
        db.update_user_address_1([req.body.address_1, id])
            // .then(user => {
            //     res.status(200).send(user)
            // })
    } 
    if (req.body.address_2){
        // console.log('about to update address 2')
        db.update_user_address_2([req.body.address_2, id])
            // .then(user => {
            //     res.status(200).send(user)
            // })
    } 
    if (req.body.address_3){
        // console.log('about to update address 3')
        db.update_user_address_3([req.body.address_3, id])
            // .then(user => {
            //     res.status(200).send(user)
            // })
    } 
    if (req.body.address_4){
        // console.log('about to update address 4')
        db.update_user_address_4([req.body.address_4, id])
            .then(user => {
                res.status(200).send(user)
            })
    } 
})

app.put('/api/knife/:id', (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;
    if (req.body.knife_name){
        // console.log('about to update name')
        db.update_knife_name([req.body.knife_name, id])
            .then(knife => {
                res.status(200).send(knife)
            })
    } if (req.body.description){
        db.update_knife_description([req.body.description, id])
            .then(knife => {
                res.status(200).send(knife)
            })
    } if (req.body.blade_length){
        db.update_knife_blade_length([req.body.blade_length, id])
            .then(knife => {
                res.status(200).send(knife)
            })
    } if (req.body.overall_length){
        db.update_knife_overall_length([req.body.overall_length, id])
            .then(knife => {
                res.status(200).send(knife)
            })
    } if (req.body.blade_thickness){
        db.update_knife_blade_thickness([req.body.blade_thickness, id])
            .then(knife => {
                res.status(200).send(knife)
            })
    } if (req.body.price){
        db.update_knife_price([req.body.price, id])
            .then(knife => {
                res.status(200).send(knife)
            })
    } if (req.body.handle_material){
        db.update_knife_handle_material([req.body.handle_material, id])
            .then(knife => {
                res.status(200).send(knife)
            })
    } if (req.body.steel_type){
        db.update_knife_steel_type([req.body.steel_type, id])
            .then(knife => {
                res.status(200).send(knife)
            })
    } if (req.body.img){
        db.update_knife_img([req.body.img, id])
            .then(knife => {
                res.status(200).send(knife)
            })
    }
})

app.post('/api/addknife', (req, res, next) => {
    const db = app.get("db");
    const { knife_name, description, blade_length, overall_length, blade_thickness, price, handle_material, steel_type, img } = req.body
    db.create_knife([knife_name, description, blade_length, overall_length, blade_thickness, price, handle_material, steel_type, img])
      .then(knives => {
          res.status(200).send(knives)
      })
})

app.post('/api/order', (req, res, next) => {
    const db = app.get("db")
    console.log('the req.user is', req.user)
    const userId = req.user.id
    db.create_order([userId])
        .then(order => {
            let orderId = order[0].id
            console.log(typeof order)
            console.log('order Id', orderId)
            // res.status(200).send(order)
            let arr = []
            console.log(req.body)
            for (var i = 0; i < req.body.knives.length; i++){

            arr.push(db.create_order_item([orderId, req.body.knives[i].id]))
            }
            console.log('array to promise all', arr)
            Promise.all(arr)
            .then(orderitems => {
                db.query('delete from cart where id = ' + userId)
                db.get_orders(orderId)
                    .then(currentOrder => {
                        console.log('current order', currentOrder)
                res.status(200).send(currentOrder)
                    })
            })
        })
})

app.delete('/api/knife/:id', (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;
    console.log(req.params.id)
    db.delete_knife([id])
      .then(() => {
        res.status(200).send()
      })
      .catch(() => res.status(500).send("SERVER ERROR"));
  });

app.post('/api/payment', (req, res, next) => {
    //this is converting the amount to pennies
    const amountArray = req.body.amount.toString().split('');
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++){
        if (amountArray[i] === '.'){
            if (typeof amountArray[i + 1] === 'string'){
                pennies.push(amountArray[i + 1]);
            } else {
                pennies.push("0");
            }
            if (typeof amountArray[i + 2] === 'string'){
                pennies.push(amountArray[i + 2]);
            } else {
                pennies.push("0")
            }

        break;
        } else {
            pennies.push(amountArray[i])
        }
    }
    const convertedAmnt = parseInt(pennies.join(''));
    const charge = stripe.charges.create({
        amount: convertedAmnt,
        currency: 'usd',
        source: req.body.token.id,
        description: 'Test charge from react app'
    }, (err, charge) => {
        if (err) return res.sendStatus(500)
        return res.sendStatus(200);
        // if (err && err.type === 'StripeCardError') 
        // {"The card has been declined"}
    })
})

const port = 3002
app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})