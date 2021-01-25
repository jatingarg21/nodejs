const express = require('express');
const mysql = require('mysql');


//Create connection with mysql

const db = mysql.createConnection({
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'my_db'
});

//Connect with db

db.connect((err) => {
      if(err){
            throw err;
            console.log('Database Error', err);
      }
      else{
            console.log('Mysql connected...');
      }
})

const app = express();

app.listen('3200', () => {
      console.log('Server started on port 3200');
})

//Create DB
app.get('/createDB', (req, res) => {
      console.log('Create Database');
      let sql = 'CREATE DATABASE my_db';

      db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  res.send('Database Created');
            }
      })
})

app.get('/createpostsTable', (req, res) => {
      let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';

      db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  res.send('Table Created');
            }
      })
})

app.get('/addStudent', (req, res) => {
      let post = [
            [2, 'Sulbh'],
            [3, 'Jaswinder'],
            [4, 'Harmanjot'],
            [5, 'Reena'],
            [6, 'Jatin'],
          ];
      //let post = {sid : 2, sname : "Sulbh"};
      let sql = 'INSERT INTO student (sid,sname) VALUES ?';
      let query = db.query(sql, [post], (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  res.send('Data Inserted');
            }
      })
})

app.get('/addSubject', (req, res) => {
      let post = [
            [1,'Java'],
            [2,'C++'],
            [3,'Python'],
            [4,'Html'],
            [5,'Reactjs'],
            [6,'Nodejs'],
            
          ];
      let sql = 'INSERT INTO subject (subid,subname) VALUES ?';
      let query = db.query(sql, [post], (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  res.send('Data Inserted');
            }
      })
})


app.get('/addMarks', (req, res) => {
      let post = [
            [1,1,65],[1,2,90],[1,3,75],
            [2,1,45],[2,2,67],[2,3,69],
            [3,1,55],[3,3,78],[3,5,58],
            [4,1,75],[4,2,56],[4,3,47],
            [5,1,35],[5,3,49],[5,5,43],
            [6,1,65],[6,2,85],[6,4,58],

            
          ];
      let sql = 'INSERT INTO marks (sid,subid,submarks) VALUES ?';
      let query = db.query(sql, [post], (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  res.send('Data Inserted');
            }
      })
})

app.get('/getStudent', (req, res) => {
      let sql = 'SELECT * FROM student';
      let query = db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  console.log('SQL Result', result);
                  res.send('Posts Fetched...');
            }
      })
})

app.get('/getSubject', (req, res) => {
      let sql = 'SELECT * FROM subject';
      let query = db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  console.log('SQL Result', result);
                  res.send('Posts Fetched...');
            }
      })
})

app.get('/getMarks', (req, res) => {
      let sql = 'SELECT * FROM marks';
      let query = db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  console.log('SQL Result', result);
                  res.send('Posts Fetched...');
            }
      })
})

app.get('/getStudentMarks/:id', (req, res) => {
      let sql = `Select m.*, s.sname as student_name, su.subname as subject from marks as m LEFT JOIN student as s ON s.sid = m.sid LEFT JOIN subject as su ON su.subid = m.subid where m.sid='${req.params.id}' `;
      let query = db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  console.log('SQL Result', result);
                  res.send('Posts Fetched...');
            }
      })
})

app.get('/getPost/:id', (req, res) => {
      let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  console.log('SQL Result', result);
                  res.send('Posts Fetched...');
            }
      })
})

app.get('/addUser', (req, res) => {
      let userArr = [
            { name : "Jatin", email : "jatingarg@gmail.com", phone : 123456789 },
            { name : "Sabby", email : "sabby123@gmail.com", phone : 3847384384 },
            { name : "Sulabh", email : "sulabh123@gmail.com", phone : 2387138712 },
          ];

 

          userArr.map((obj) => {
                let sql = 'INSERT INTO userdetails (name, email, phone) VALUES ?';
                  let query = db.query(sql, [obj], (err, result) => {
                        if(err){
                              throw err;
                        }
                        else{
                              console.log('User id', result);
                        }
                  })
          })
      
})

app.get('/updatePost/:id', (req, res) => {
      // let post = {title : "Post One", body : "This is post number one"};
      let newTitle = "Post Two";
      let sql = `UPDATE posts SET title = "${newTitle}" WHERE id = ${req.params.id}`;
      console.log('SQL Query', sql);
      let query = db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  console.log('SQL Result', result);
                  res.send('Post Updated...');
            }
      })
})

app.get('/deletePost/:id', (req, res) => {
      // let post = {title : "Post One", body : "This is post number one"};
      let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  console.log('SQL Result', result);
                  res.send('Posts Deleted...');
            }
      })
})

app.get('/getUsers/:name', (req, res) => {
      // let post = {title : "Post One", body : "This is post number one"};
      let sql = `SELECT d.*, u.* FROM departments AS d LEFT JOIN users AS u ON u.id = d.user_id WHERE d.department = "${req.params.name}"`;
      let query = db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  console.log('SQL Result', result);
                  res.send('Users Fetched...');
            }
      })
})