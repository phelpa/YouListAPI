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

app.get('/', (req,res) => {
  res.send('this is working')
})

app.listen(3000, () => {
  console.log('app is running on port 3000')
})


const courses = [
  {
     "code":"c1",
     "caption":"Course1",
     "likes":30,
     "id":"1",
     "display_src":"https://i.redd.it/7yxlp5aegqu11.jpg"
  },
  {
     "code":"c2",
     "caption":"Course2",
     "likes":40,
     "id":"2",
     "display_src":"https://i.imgur.com/R0T1oil.jpg"
  },
  {
     "code":"c3",
     "caption":"Course3",
     "likes":62,
     "id":"3",
     "display_src":"https://i.imgur.com/yVlxu8s.jpg"
  },
  {
     "code":"c4",
     "caption":"Course4",
     "likes":52,
     "id":"4",
     "display_src":"https://i.imgur.com/dWU7ZB8.jpg"
  },
  {
     "code":"c5",
     "caption":"Course5",
     "likes":35,
     "id":"5",
     "display_src":"https://i.imgur.com/0G2YzYb.jpg"
  }
 
];

const videos =  {
  "19":[
    {
      "code":"BAcyDyQwcXX",
      "caption":"Lunch #hamont",
      "likes":56,
      "id":"1161022966406956503",
      "display_src":"https://www.youtube.com/embed/G2F9lBurmAs"
    }
  ],
  "20":[
    {
     "code":"BAcJeJrQca9",
     "caption":"Snow! ⛄️🌨❄️ #lifewithsnickers",
     "likes":59,
     "id":"1160844458347054781",
     "display_src":"https://www.youtube.com/embed/htdCJdy90WA"
  },
  {
     "code":"BAF_KY4wcRY",
     "caption":"Cleaned my office and mounted my recording gear overhead. Stoked for 2016!",
     "likes":79,
     "id":"1154606670337393752",
     "display_src":"https://www.youtube.com/embed/GdzrrWA8e7A"
  },
  {
     "code":"BAPIPRjQce9",
     "caption":"Making baby pancakes for one early rising baby. ☕️🍴",
     "likes":47,
     "id":"1157179863266871229",
     "display_src":"https://www.youtube.com/embed/WI4-HUn8dFc"
  }
],
"21": [
  {
     "code":"-hZh6IQcfN",
     "caption":"New Stickers just came in. I'll do another mailing in a few weeks if you want some. #javascript",
     "likes":66,
     "id":"1126293663140399053",
     "display_src":"https://www.youtube.com/embed/6u5a7_-a3vM"
  },
  {
     "code":"-B3eiIwcYV",
     "caption":"Tacos for breakfast. I love you Austin. 🇺🇸",
     "likes":33,
     "id":"1117418173361145365",
     "display_src":"https://www.youtube.com/embed/AvhplYM46Fc"
  },
  {
     "code":"BAhvZrRwcfu",
     "caption":"Tried poke for the first time at @pokehbar. Delicious! It's like a bowl of sushi",
     "likes":30,
     "id":"1162418651480049646",
     "display_src":"https://i.imgur.com/1fNRX4e.jpg"
  },
  {
     "code":"BAAJqbOQcW5",
     "caption":"Brunchin'",
     "likes":40,
     "id":"1152964002473690553",
     "display_src":"https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/1516572_445736812276082_2116173059_n.jpg"
  },
  {
     "code":"_4jHytwcUA",
     "caption":"2015 can be summed up with one baby and a many lines of code. And sometimes a coding baby. 👶🏼⌨",
     "likes":62,
     "id":"1150824171912152320",
     "display_src":"https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/e35/10723795_1149927178351091_1859033096_n.jpg"
  }
],
  "c4":[
    {
     "code":"_zbaOlQcbn",
     "caption":"Lekker Chocoladeletter",
     "likes":52,
     "id":"1149382879529256679",
     "display_src":"https://scontent.cdninstagram.com/hphotos-xfp1/t51.2885-15/e35/12346073_1035047523184672_768982339_n.jpg"
  },
  {
     "code":"_rmvQfQce8",
     "caption":"Just discovered the #hamont farmers market has a new ramen place! 🍜",
     "likes":35,
     "id":"1147180903383025596",
     "display_src":"https://scontent.cdninstagram.com/hphotos-xft1/t51.2885-15/e35/12331739_1671776806423597_995664526_n.jpg"
  }
 
]
};

const annotations = {
  "BAhvZrRwcfu":[
    {
      "text":"Totally need to try this.",
      "user": "heavymetaladam"
    }
  ],
  "BAcJeJrQca9":[
    {
    "text":"teste no donkey kong",
    "user": "heavymetaladam"
    }
  ],
  "BAcyDyQwcXX":[
    {
      "text":"Wes. WE should have lunch.",
      "user": "jdaveknox"
    },
    {
      "text":"#adults",
      "user": "jdaveknox"
    },
    {
      "text":"@jdaveknox yes!",
      "user": "wesbos"
    },
    {
      "text":"😍 love Hamilton!",
      "user": "willowtreemegs"
    }
  ],
  "BAPIPRjQce9":[
    {
      "text":"Those are cute! They're like silver dollar pancakes.",
      "user": "rrsimonsen"
    },
    {
      "text":"I like baby pancakes but gluten free please!! I'll bring the coffee!! See you in 6 days!!!!!! 😝😛😝♥️",
      "user": "terzisn"
    },
    {
      "text":"... and apparently growing baby. 👀. Yum.",
      "user": "henrihelvetica"
    },
    {
      "text":"@wesbos 👍 my daughter is a pancake eating machine!",
      "user": "brentoage"
    },
    {
      "text":"Nice stove!",
      "user": "haaps"
    },
    {
      "text":"Genius bottle use! Do you make a single batch of batter or make a lot and freeze it?",
      "user": "gobananna"
    },
    {
      "text":"@gobananna I just made a batch and put in in a FIFO bottle. Keeps in the fridge for a few days.",
      "user": "wesbos"
    },
    {
      "text":"@haaps thanks! It's a Jenn air - so nice to cool with!",
      "user": "wesbos"
    },
    {
      "text":"Where would you go and for how long, if you had location freedom? - Greg 🌎",
      "user": "world_greg"
    }
  ],
  "BAF_KY4wcRY":[
    {
      "text":"Looking great Wes! I'd like to see the other side of the room too.",
      "user": "axcdnt"
    },
    {
      "text":"I've never caught your podcast. Have one right? Btw - they don't have a Canary pillow? 😝",
      "user": "henrihelvetica"
    },
    {
      "text":"Great way to start the year.",
      "user": "pmgllc"
    },
    {
      "text":"Are there 4k monitors?",
      "user": "alexbaumgertner"
    },
    {
      "text":"@axcdnt that is where I put all the junk. I'll have to clean that side too @henrihelvetica no podcast yet! @pmgllc ohh yeah! @alexbaumgertner yep - the main one is 4K - I'm loving it",
      "user": "wesbos"
    },
    {
      "text":"That chrome pillow. 😉",
      "user": "imagesofthisandthat"
    },
    {
      "text":"@wesbos is that the Dell 4k? The MacBook Pro powers it well? I also have a Retina™ / x1 setup as well. Very handy.",
      "user": "henrihelvetica"
    },
    {
      "text":"#minimalsetups",
      "user": "wesbos"
    }
  ],
  "_4jHytwcUA":[
    {
      "text":"that is the sound of success!",
      "user": "mdxprograms"
    }
  ],
  "_zbaOlQcbn":[
    {
      "text":"Did she get to eat her letter?",
      "user": "pathiebert"
    },
    {
      "text":"Nope @pathiebert! She has too much teeth now (8) so that would definitely be her first cavity 😉",
      "user": "kaitbos"
    }
  ],
  "_rmvQfQce8":[
    {
      "text":"A+",
      "user": "mrjoedee"
    },
    {
      "text":"I recently went to a ramen place in Philly. So amazing!",
      "user": "jrtashjian"
    }
  ],
  "_ep9kiQcVy":[
    {
      "text":"All bundled up!  Where ya goin?",
      "user": "sophie_and_sadie"
    }
  ],
  "_XpJcrwcSn":[
    {
      "text":"Super congrats! That's wicked cool and looks great.",
      "user": "pmgllc"
    },
    {
      "text":"real live paper magazine? woah haha. flex box is awesome though, could rage quit without it",
      "user": "tjholowaychuk2"
    },
    {
      "text":"@tjholowaychuk2 haha yes! Old school stylez!",
      "user": "wesbos"
    }
  ],
  "_KnU7MwceA":[

  ],
  "_HMejJQcY5":[
    {
      "text":"👌",
      "user": "t_volpe"
    },
    {
      "text":"Nice shot, mister!",
      "user": "imagesofthisandthat"
    }
  ],
  "_Fq2zmwcaz":[
    {
      "text":"😍",
      "user": "melsariffodeen"
    },
    {
      "text":"Very cool!",
      "user": "ka11away"
    }
  ],
  "_A2r0aQcfD":[
    {
      "text":"Uhu!",
      "user": "lucascaixeta"
    }
  ],
  "1rhFawccs":[
    {
      "text":"What's your lighting source?",
      "user": "seth_mcleod"
    },
    {
      "text":"And what are you using for XLR mix adapter? I found a big price jump between $55 range and $170 range.",
      "user": "pmgllc"
    },
    {
      "text":"I still need a desk boom for mine mic. Nice upgrades",
      "user": "stolinski"
    }
  ],
  "pjx-gQcVi":[

  ],
  "oTZ0zQcWt":[
    {
      "text":"Love the coat! Where's it from? Lol",
      "user": "_lindersss"
    }
  ],
  "mxKQoQcQh":[

  ],
  "hZh6IQcfN":[
    {
      "text":"What do we gotta do to get some :)? @wesbos",
      "user": "jonasbad"
    },
    {
      "text":"Might drop by today - real quick. Trade you an illegal pin for these? Lol. @wesbos",
      "user": "henrihelvetica"
    },
    {
      "text":"I'm with @jonasbad on this. What we gotta do? :D",
      "user": "datamoshr"
    },
    {
      "text":"@jonasbad @datamoshr I'll post them up on my blog soon!",
      "user": "wesbos"
    },
    {
      "text":"Want",
      "user": "kamuelafranco"
    },
    {
      "text":"want!",
      "user": "josemanuelxyz"
    },
    {
      "text":"#Top",
      "user": "gabrielvieira.me"
    }
  ],
  "fasqlQceO":[
    {
      "text":"Where's lux at? 💤?",
      "user": "henrihelvetica"
    },
    {
      "text":"Love this house during the holidays! And all other times of the year...",
      "user": "danielleplas"
    }
  ],
  "VBgtGQcSf":[
    {
      "text":"@dogsandbrew",
      "user": "likea_bos"
    },
    {
      "text":"Next on my list!",
      "user": "tomwalsham"
    },
    {
      "text":"Is that from collective arts ?",
      "user": "trevorb_91"
    }
  ],
  "FpTyHQcau":[
    {
      "text":"@kaitbos  that vest!!! 😍",
      "user": "courtneyeveline"
    },
    {
      "text":"I just love her! @kaitbos",
      "user": "kalibrix"
    },
    {
      "text":"@courtneyeveline I know! My friend gave it to her and I wanted a matching one but only Lux can pull it off. She's so fancy 😉",
      "user": "kaitbos"
    },
    {
      "text":"Char has that vest!!! Super cute!",
      "user": "jennlensink"
    },
    {
      "text":"You'll have to meet her soon @kalibrix!!",
      "user": "kaitbos"
    },
    {
      "text":"Haha @kaitbos so true, babies these days are sooo stylish. 😎",
      "user": "courtneyeveline"
    },
    {
      "text":"JavaScript 😄😆🙋",
      "user": "lucascaixeta"
    },
    {
      "text":"That hoodie is amazing! Where did you get it?",
      "user": "br11x"
    },
    {
      "text":"@br11x I did a teespring a few months ago - maybe I'll do another one soon",
      "user": "wesbos"
    }
  ],
  "B3eiIwcYV":[
    {
      "text":"If you get in the mood for authentic Italian pizza, check out @backspaceaustin - it's👌🏻",
      "user": "dessie.ann"
    },
    {
      "text":"😱 jealous",
      "user": "jenngbrewer"
    }
  ]
};

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

//getting from the server
app.get('/courses', (req, res) => {
  res.send(courses)
})

//-----------------------------------

//Getting the videos with the course_id
app.get('/course/:course_id/videos', (req, res) => {

  const { course_id } = req.params;

  db.select('*').from('videos').where({course_id:course_id})
    .then(response => {
      res.json(response);
    })

})


app.get('/videos', (req, res) => {
  res.send(videos)
})

//---------------------------------

app.get('/annotations', (req,res) => {
  res.send(annotations)
})


/*
/courses/:userId --> GET   pega todos os cursos do usarioo
/posts/:userId --> GET     pega todos os videos do usuario
/annotations/:userId --> GET  pega todas as anotações do usuario

*/