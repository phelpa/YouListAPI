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

const port = 3003;
app.listen(port, () => {
  console.log(`app is running on port ${port}`)
})

//REGISTERING LISTS
app.post('/lists', (req,res) => {

  const { title, description, user_id, list_image  } = req.body;

  db('lists')
    .returning('*')
    .insert({
      lst_title: title,
      lst_description : description,
      lst_usr_id : user_id,
      lst_urlimage : list_image,
      lst_created : new Date()
    })
    .then(response => {
      const mappedList = response.map(list => ({
          id: list.lst_id,
          title: list.lst_title,
          description: list.lst_description,
          user_id: list.lst_usr_id,
          urlimage: list.lst_urlimage,
          created: list.lst_created
      }))
      res.json({
        data: mappedList[0]
      });
    })
})

//REGISTERING USERS
app.post('/users', (req,res) => {

  const { name, email, login } = req.body;

  db('users')
    .returning('*')
    .insert({
      usr_name: name,
      usr_email: email,
      usr_login: login,
      usr_joined: new Date()
    })
    .then(response => {
      res.json(response);
    })
})

//REGISTERING VIDEOS
app.post('/videos', (req,res) => {

  const { title, description, list_id, youtube_id, user_id } = req.body;

  db('videos')
    .returning('*')
    .insert({
      vid_title: title,
      vid_description: description,
      vid_lst_id: list_id,
      vid_ytid: youtube_id,
      vid_usr_id: user_id,
      vid_created : new Date()
    })
    .then(response => {
      const mappedVideos = response.map(video => ({
        created: video.vid_created,
        description: video.vid_description,
        id: video.vid_id,
        list_id: video.vid_lst_id,
        title: video.vid_title,
        youtube_id: video.vid_ytid
      }))
      res.json({data:mappedVideos[0]});
    })

})

//Getting all correspondent videos with the list_id
app.get('/list/:list_id/videos', (req, res) => {

  const { list_id } = req.params;

  db.select('*').from('videos').where({'vid_lst_id':list_id})
    .then(response => {
      const mappedResponse = response.map(i => ({
        id: i.vid_id,
        title: i.vid_title,
        description: i.vid_description,
        created: i.vid_created,
        youtube_id: i.vid_ytid,
        list_id: i.vid_lst_id
      }))

      res.json({data : mappedResponse});
    })

})


//REGISTERING ANNOTATIONS
app.post('/annotations', (req,res) => {

  const { user_id, video_id, annotation, videotime} = req.body;

  db('annotations')
    .returning('*')
    .insert({
      ant_usr_id: user_id,
      ant_vid_id: video_id,
      ant_videotime: videotime,
      ant_text: annotation,
      ant_created : new Date()
    })
    .then(response => {
      const mappedAnnotations = response.map(annotation => ({
        annotation: annotation.ant_text,
        videotime: annotation.ant_videotime
      }))
      res.json({data:mappedAnnotations[0]});
    })
})

annotation: "in a lifetime of war"
videotime: 936
//Getting the lists using the user_id
app.get('/lists/user/:user_id', (req,res) => {

  const { user_id } = req.params;

  db('lists')
  .select('*')
  .where({'lists.lst_usr_id':user_id})
  .then(response => {

    const mappedResponse = response.map(i => ({
      id: i.lst_id,
      title: i.lst_title,
      description : i.lst_description,
      user_id: i.lst_usr_id,
      urlimage: i.lst_urlimage,
      created: i.lst_created
    }))

    res.json(mappedResponse);

  })
})


//Getting a single video with the video_Id
app.get('/video/:video_id', (req, res) => {

  const { video_id } = req.params;

  db.select('*').from('videos').where({'vid_id':video_id})
    .then(response => {
     const mappedResponse = response.map(i => ({
      id: i.vid_id,
      title: i.vid_title,
      description: i.vid_description,
      created: i.vid_created,
      youtube_id: i.vid_ytid,
      list_id: i.vid_lst_id
    }))
      res.json(mappedResponse);
    })

})

//Getting all annotations from a video
app.get('/annotations/video/:video_id', (req, res) => {

  const { user_id, video_id } = req.params;

  db.select('*').from('annotations').where({'ant_vid_id':video_id}).orderBy('ant_videotime', 'asc')
    .then(response => {
      const mappedResponse = response.map(i => ({
        videotime: i.ant_videotime,
        annotation: i.ant_text
      }))
      res.json(mappedResponse);
    })
})

/*
/lists/:userId --> GET   pega todos os cursos do usarioo
/posts/:userId --> GET     pega todos os videos do usuario
/annotations/:userId --> GET  pega todas as anotações do usuario

*/