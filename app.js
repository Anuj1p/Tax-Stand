const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config();

const app = express();
app.use(express.static("public"));
app.use('/gst_return',express.static(__dirname+'/public'));
app.use('/gst_registration',express.static(__dirname+'/public'));
app.use('/gst_registration/gstregistrationform2',express.static(__dirname+'/public'));
app.use('/gstreturnform',express.static(__dirname+'/public'));
app.use('/admin',express.static(__dirname+'/public'));
app.use('/admin/admin_portal',express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended : true}));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');



app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/audit_and_assurance", function(req,res){
    res.sendFile(__dirname + "/audit.html");
});

app.get("/Business_Process_Outsourcing_Services", function(req,res){
    res.sendFile(__dirname + "/business.html");
});

app.get("/contact", function(req,res){
    res.sendFile(__dirname + "/contact.html");
});

app.get("/coreteam", function(req,res){
    res.sendFile(__dirname + "/coreteam.html");
});

app.get("/who_we_are", function(req,res){
    res.sendFile(__dirname + "/whoweare.html");
});

app.get("/Secretarial_Compliances", function(req,res){
    res.sendFile(__dirname + "/secretarial.html");
});

app.get("/transaction_support", function(req,res){
    res.sendFile(__dirname + "/transaction.html");
});

app.get("/careers", function(req,res){
    res.sendFile(__dirname + "/careers.html");
});

app.get("/gst_return", function(req,res){
    res.sendFile(__dirname + "/gst_return.html");
});

app.get("/gst_registration", function(req,res){
    res.sendFile(__dirname + "/gst_registration.html");
});


app.get("/gst_registration/gstregistrationform2", function(req,res){
    res.sendFile(__dirname + "/gstregistrationform2.html");
});

app.get("/industries", function(req,res){
    res.sendFile(__dirname + "/industries.html");
});

app.get("/gst_return/gstreturnform", function(req,res){
    res.sendFile(__dirname + "/gstreturnform.html");
});

app.get("/gstreturnform/gstreturnform2", function(req,res){
    res.sendFile(__dirname + "/gstreturnform2.html");
});

app.get("/gstreturnform/gstreturnform2/success", function(req,res){
    res.sendFile(__dirname + "/success.html");
});

app.get("/gst_registration/gstregistrationform2/gstregistrationform3", function(req,res){
    res.sendFile(__dirname + "/gstregistrationform3.html");
});


app.get("/admin", function(req,res){
    res.sendFile(__dirname + "/admin.html");
});

app.get('/admin/admin_portal', function(req,res){
    res.sendFile(__dirname + "/admin_portal.html");
});


app.listen(8080, function(){
    console.log("Server started on port 8080");
});

// Common Part

const url = "mongodb+srv://test:test@mflix.wjvvb.mongodb.net/form?retryWrites=true&w=majority"
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

        // Contact Part      //

const notesSchema = {
    firstname: String,
    lastname: String,
    phonenumber: Number,
    emailofperson: String,
    messageof: String
}

let contactformdata = mongoose.model("contact_forms", notesSchema);


app.post("/contact", function(req, res) {
    var newNote = new contactformdata({
        firstname: req.body.fname,
        lastname: req.body.lname,
        phonenumber: req.body.phone, 
        emailofperson: req.body.email,
        messageof: req.body.message
    });
    newNote.save();
    res.redirect('/');

    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>First Name: ${req.body.fname}</li>
      <li>Last Name: ${req.body.lname}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 587, false for other ports
        requireTLS: true,
        auth: {
            user: 'anuj34060@gmail.com', // generated ethereal user
            pass: 'Anuj13052002'  // generated ethereal password
        },
    });

    // create reusable transporter object using the default SMTP transport
  

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <anuj34060@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', {msg:'Email has been sent'});
    });
});



const emailSchema = {
    email: String
}

const newsletter = mongoose.model("newsletter",emailSchema);

app.post("/audit_and_assurance", function(req,res){
    let emailNote = new newsletter({
        email: req.body.email
    });
    emailNote.save();
    res.redirect("/audit_and_assurance");
});

app.post("/Business_Process_Outsourcing_Services", function(req,res){
    let emailNote = new newsletter({
        email: req.body.email
    });
    emailNote.save();
    res.redirect("/Business_Process_Outsourcing_Services");
});

app.post("/careers", function(req,res){
    let emailNote = new newsletter({
        email: req.body.email
    });
    emailNote.save();
    res.redirect("/careers");
});

app.post("/coreteam", function(req,res){
    let emailNote = new newsletter({
        email: req.body.email
    });
    emailNote.save();
    res.redirect("/coreteam");
});

app.post("/", function(req,res){
    let emailNote = new newsletter({
        email: req.body.email
    });
    emailNote.save();
    res.redirect("/");
});

app.post("/Secretarial_Compliances", function(req,res){
    let emailNote = new newsletter({
        email: req.body.email
    });
    emailNote.save();
    res.redirect("/Secretarial_Compliances");
});

app.post("/transaction_support", function(req,res){
    let emailNote = new newsletter({
        email: req.body.email
    });
    emailNote.save();
    res.redirect("/transaction_support");
});

app.post("/industries", function(req,res){
    let emailNote = new newsletter({
        email: req.body.email
    });
    emailNote.save();
    res.redirect("/industries");
});

app.post("/who_we_are", function(req,res){
    let emailNote = new newsletter({
        email: req.body.email
    });
    emailNote.save();
    res.redirect("/who_we_are");
});




const gstSchema = {
    name: String,
    email: String,
    phone: Number
}

const GST_return_form = mongoose.model("GST_return_form",gstSchema);

app.post("/gst_return", function(req,res){
    let gstNote = new GST_return_form({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });
    gstNote.save();
    res.redirect("/gst_return/gstreturnform");
});


// GST registration

const GST_registration_form = mongoose.model("GST_registration_form",gstSchema);

app.post("/gst_registration", function(req,res){
    let gstNote = new GST_registration_form({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });
    gstNote.save();
    res.redirect("/gst_registration/gstregistrationform2");
});





const gstregistrationappform1Schema = {
    address: String,
    area: String,
    city: String,
    zipcode: Number,
    state: String,
    typeofbusiness: String,
    dateof: Date,
    turnover: Number,
    possessiontype: String
}

const gstregistrationform1 = mongoose.model("gstregistrationform1",gstregistrationappform1Schema);

app.post("/gst_registration/gstregistrationform2", function(req,res){
    let gstregistration1Note = new gstregistrationform1({
        address: req.body.address,
        area: req.body.area,
        city: req.body.city,
        zipcode: req.body.zipcode,
        state: req.body.state,
        typeofbusiness: req.body.typeofbusiness,
        dateof: req.body.dateof,
        turnover: req.body.turnover,
        possessiontype: req.body.possessiontype
    });
    gstregistration1Note.save();
    res.redirect('/gst_registration/gstregistrationform2/gstregistrationform3');
});



const gstretform1Schema = {
    businessname: String,
    address: String,
    area: String,
    city: String,
    zipcode: Number,
    state: String,
    fillingtype: String,
    numberofinvoices: String

}

const GSTReturnForm1 = mongoose.model("GSTReturnForm1",gstretform1Schema);


app.post("/gst_return/gstreturnform", function(req,res){
    
    let gstform1Note = new GSTReturnForm1({
        businessname: req.body.businessname,
        address: req.body.address,
        city: req.body.city,
        zipcode: req.body.zipcode,
        state: req.body.state,
        fillingtype: req.body.fillingtype,
        numberofinvoices: req.body.numberofinvoices
    });
    gstform1Note.save();
    res.redirect("/gstreturnform/gstreturnform2");
});




const gstform2Schema = {
    name: String,
    phone: Number,
    email: String
}

const GSTReturnForm2 = mongoose.model("GSTReturnForm2",gstform2Schema);


app.post("/gstreturnform/gstreturnform2", function(req,res){
    
    let gstform2Note = new GSTReturnForm2({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    });
    gstform2Note.save();
    res.redirect("/gstreturnform/gstreturnform2/success");
});

const adminsignupSchema = {
    username: String,
    password: String
}

const adminsignup = mongoose.model("admin_signup",adminsignupSchema);

app.post("/admin", function(req,res){
    let adminNote = new adminsignup({
        username: req.body.username,
        password: req.body.password
    });
    adminNote.save();
    res.redirect('/admin/admin_portal');
});

app.get('/admin/admin_portal', (req,res)=>{
    app.render('admin_portal.html');
});

// app.get('/admin/admin_portal', (req,res) => {
//     MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("form");
//         dbo.collection("admin_signup").find({}, { projection: { _id: 0, __v:0 } }).toArray(function(err, result) {
//           if (err) throw err;
//           else{
//             res.render('admin_portal.ejs', { result: result.password });
//             db.close();
//           }
//         });
//     });
// });


app.get('/admin/admin_portal/contact_page', (req,res) => {
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("form");
        dbo.collection("contact_forms").find({}, { projection: { _id: 0, __v:0 } }).toArray(function(err, result) {
          if (err) throw err;
          else{
            res.render('contact_admin_portal.ejs', { result: result });
            db.close();
          }
        });
    });
});

app.get('/admin/admin_portal/gstreturnform', (req,res) => {
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("form");
        dbo.collection("gstreturnform1").find({}, { projection: { _id: 0, __v:0 } }).toArray(function(err, result) {
          if (err) throw err;
          else{
            res.render('gstreturn_admin_portal.ejs', { result: result });
            db.close();
          }
        });
    });
});

app.get('/admin/admin_portal/newsletter', (req,res) => {
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("form");
        dbo.collection("newsletters").find({}, { projection: { _id: 0, __v:0 } }).toArray(function(err, result) {
          if (err) throw err;
          else{
            res.render('newsletter_admin_portal.ejs', { result: result });
            db.close();
          }
        });
    });
});


app.get('/admin/admin_portal/gstregistrationform', (req,res) => {
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("form");
        dbo.collection("gst_registration_forms").find({}, { projection: { _id: 0, __v:0 } }).toArray(function(err, result) {
          if (err) throw err;
          else{
            res.render('gstregistration_admin_portal.ejs', { result: result });
            db.close();
          }
        });
    });
});

