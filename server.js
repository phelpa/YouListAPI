const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');


const db = knex({
  client:'pg',
  connection:{
    host:'127.0.0.1',
    port:'5432',
    user:'postgres',
    password:'',
    database:'YouList'
  }
})


const app = express();

app.use(cors())
app.use(bodyParser.json());


db.select('*').from('users').then(data => {
  console.log(data,'oia a data ai');
});


app.get('/', (req,res) => {
  res.send('this is working')
})

app.listen(3000, () => {
  console.log('app is running on port 3000')
})



//REGISTERING COURSES
app.post('/courses', (req,res) => {

  const { title, description, user_id, urlimage  } = req.body;

  db('courses')
    .returning('*')
    .insert({
      title: title,
      description : description,
      user_id : user_id,
      urlimage : urlimage,
      created : new Date()
    })
    .then(response => {
      res.json(response);
    })

})

//REGISTERING COURSE STUDENTS
app.post('/course/students', (req,res) => {

  const { course_id, user_id  } = req.body;

  db('course_students')
    .returning('*')
    .insert({
      course_id: course_id,
      user_id: user_id,
      created: new Date()
    })
    .then(response => {
      res.json(response);
    })

})


//REGISTERING USERS
app.post('/users', (req,res) => {

  const { name, email, login } = req.body;

  db('users')
    .returning('*')
    .insert({
      name: name,
      email: email,
      login: login,
      joined: new Date()
    })
    .then(response => {
      res.json(response);
    })

    
})

//REGISTERING VIDEOS
app.post('/videos', (req,res) => {

  const { title, description, course_id, youtubeurl  } = req.body;

  db('videos')
    .returning('*')
    .insert({
      title: title,
      description : description,
      course_id : course_id,
      youtubeurl : youtubeurl,
      created : new Date()
    })
    .then(response => {
      res.json(response);
    })

})

//REGISTERING ANNOTATIONS
app.post('/annotations', (req,res) => {

  const { user_id, video_id, annotation, title } = req.body;

  db('annotations')
    .returning('*')
    .insert({
      user_id: user_id,
      video_id: video_id,
      title: title,    
      annotation: annotation,
      created : new Date()
    })
    .then(response => {
      res.json(response);
    })
})


//Getting the courses from the course_students table using the user_id
app.get('/courses/user/:user_id', (req,res) => {

  const { user_id } = req.params;

  db('courses')
  .select('*')
  .join('course_students', 'courses.id', '=', 'course_students.course_id')
  .where({'course_students.user_id':user_id})
  .then(response => {
    res.json(response);
  })
})

//Getting all correspondent videos with the course_id
app.get('/course/:course_id/videos', (req, res) => {

  const { course_id } = req.params;

  db.select('*').from('videos').where({course_id:course_id})
    .then(response => {
      res.json(response);
    })

})

//Getting a single video with the video_Id
app.get('/video/:video_id', (req, res) => {

  const { video_id } = req.params;

  db.select('*').from('videos').where({id:video_id})
    .then(response => {
      res.json(response);
    })

})

//Getting all annotations from a video
app.get('/annotations/user/:user_id/video/:video_id', (req, res) => {

  const { user_id, video_id } = req.params;

  db.select('*').from('annotations').where({user_id:user_id, video_id:video_id})
    .then(response => {
      res.json(response);
    })

})


/*
/courses/:userId --> GET   pega todos os cursos do usarioo
/posts/:userId --> GET     pega todos os videos do usuario
/annotations/:userId --> GET  pega todas as anotações do usuario

*/