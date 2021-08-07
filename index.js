const express = require('express');
const app = express();

const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id : 'rzp_test_mKfiTCYyqYsuky',
    key_secret : '0hAh0NszvfS36BsOBZfMCtfG',
})

app.set('views', 'views');
app.set('view engine','ejs')
app.use(express.urlencoded({extended : false}))

app.get('/', (req, res)=>{
    res.render('razorpay');
})

app.post('/orders',(req,res)=>{
    let options = {
        amount: 50000,  // amount in the smallest currency unit
        currency: "INR"
      };

      razorpay.orders.create(options, function(err, order){
        //   console.log(order);
          res.json(order)
        })
})

app.post('/is-order-complete', (req,res)=>{

    razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument)=>{
        // console.log(paymentDocument);
        if(paymentDocument.status == 'captured'){
            res.render('success')
        }
        else{
            res.render('failure')
        }
    })
})
app.listen('3080', ()=>{
    console.log("Server running at port 3080");
})