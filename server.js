//Declare dependencies/variables

const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

//Connect to the database

const db = mysql.createConnection
({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

//Check if DB connection works
db.connect((err) => {
  //if no connection
  if(err) return console.log("Error connecting to the database...!", err);
  //if there's a connection
  console.log("Connected to mysql successfully as id:", db.threadId);


      // ---------------Retrieve all patients---------------

      // app.get('', (req, res) => { 
      //   const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
      //   db.query(getPatients, (err, data) =>{
      //     if(err)
      //       {
      //         return res.status(400).send("Failed to get Patients", err);
      //       }
      //         res.status(200).send(data);
      //   });
      // });

      // ---------------Retrieve all providers---------------

      // app.get('', (req, res) => { 
      //      const getPatients = "SELECT first_name, last_name, provider_specialty FROM providers"
      //     db.query(getPatients, (err, data) =>{
      //        if(err)
      //          {
      //            return res.status(400).send("Failed to get Patients", err);
      //         }
      //            res.status(200).send(data);
      //      });
      //    });

      // ---------------Filter patients by First Name---------------
      // app.get('', (req, res) => { 
      //   const getPatients = "SELECT first_name FROM patients"
      //  db.query(getPatients, (err, data) =>{
      //     if(err)
      //       {
      //         return res.status(400).send("Failed to get Patients", err);
      //      }
      //         res.status(200).send(data);
      //   });
      // });
      // ---------------Retrieve all providers by their specialty---------------
      app.get('', (req, res) => { 
        const getPatients = "SELECT provider_id, first_name, last_name, provider_specialty FROM providers"
       db.query(getPatients, (err, data) =>{
          if(err)
            {
              return res.status(400).send("Failed to get Patients", err);
           }
              res.status(200).send(data);
        });
      });

         // ---------------Starting Server---------------
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);

    //send a message to browser
    console.log('Sending message to browser...');
    app.get('/', (req,res) => {
      res.send('Server started successfully!')
    });
  });
});