    const express = require("express");
    const exphbs  = require('express-handlebars');
    const bodyParser = require("body-parser");

    // const productModel = require("./models/products");


    const app = express();
        

    //The middleware 
    app.use(express.static("public/"));


    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));


    app.engine('handlebars', exphbs());
    app.set('view engine', 'handlebars');


    app.get("/",(req,res)=>{

        res.render("home",{
            title:"Home Page"
        });

    });



    app.get("/about",(req,res)=>{

        res.render("about",{
            title:"About Page"
        });

    });

    app.get("/services",(req,res)=>{

        res.render("services",{
            title:"services Page"
        });

    });

    app.get("/myskills",(req,res)=>{

        res.render("myskills",{
            title:"skills Page"
        });

    });

    app.get("/contact",(req,res)=>{

        res.render("contact",{
            title:"Contact Page"
        });

    });
    app.get("/sendMessage",(req,res)=>{
        res.render("contact",{
            title:"SMS Page"
        });
        
    });
    
    
    app.post("/sendMessage",(req,res)=>{
    
        const errors= [];
    
      if(req.body.phoneNo=="")
      {
        errors.push("Sorry, you must enter a phone number");
    
      }
    
      if(req.body.message=="")
      {
        errors.push("Sorry, youmust enter a  message")
      }
    
    
      if(errors.length > 0)
      {
        res.render("form",{
          messages : errors
        })
      }
      else
      {
        const accountSid = 'ACfcb45a21ab62bd28c84a71a0faf8bbc3';
        const authToken = 'f3c0b3d4dc763a636b5e5018fc4481ad';
        const client = require('twilio')(accountSid, authToken);
        
        client.messages
          .create({
             body: `${req.body.firstName} ${req.body.lastName} Message :${req.body.message}`,
             from: 'PUT YOUR TRIAL NUMBER HERE',
             to: `${req.body.phoneNo}`
           })
          .then(message => {
            console.log(message.sid);
            res.render("home");
          })
          .catch((err)=>{
              console.log(`Error ${err}`);
          })
    
      }
    
    
    
    });


    

    // app.get("/work",(req,res)=>{

    //     res.render("work",{
    //         title:"work Page"
    //     });

    // });
    // app.get("/products",(req,res)=>{

    //     res.render("product",{
    //         title:"Product Page",
    //         products : productModel.getallProducts()
    //     });

    // });

    // app.post("/products",(req,res)=>{

    //     //When the form is submitted
    // });



    const PORT = process.env.PORT || 3000;
    app.listen(PORT , ()=>{

        console.log(`Web Server is up and running`);
    });