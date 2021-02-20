const express = require('express');
const dotenv = require('dotenv')
const nluinstancecreator = require('./Middleware/IBMNewInstanceCreator')
dotenv.config()

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const querytext = req.query.url
    const newinstance = nluinstancecreator
    const analyzeparams = {
        'url': querytext,
        'features': {
            'entities' : {
                'emotion' : true,
                'sentiment': false
            }, 'keywords': {
                'emotion': true,
                'sentiment': false

            }
        } 
    }

    newinstance.analyze(analyzeparams).then(analysisresults =>
        {
           const emotionalanalysis = analysisresults.result.entities[0].emotion
            return res.send({emotions: emotionalanalysis});
        }).catch( err =>
            {
                console.log(err)
            })
});

app.get("/url/sentiment", (req,res) => {
    const querytext = req.query.url
    const newinstance = nluinstancecreator
    let sentimentresponse
    const analyzeparams = {
        'url': querytext,
        'features': {
            'entities' : {
                'sentiment' : true,
                'emotion'  : false
            }, 'keywords': {
                'sentiment': true,
                'emotion': false

            }
        } 
    }

    newinstance.analyze(analyzeparams).then(analysisresults =>
        {
            console.log(JSON.stringify(analysisresults, null, 2))
            sentimentresponse = analysisresults.result.entities[0].sentiment.label
            return res.send({senti: sentimentresponse});
        }).catch( err =>
            {
                console.log(err)
            })
});

app.get("/text/emotion", (req,res) => {
    const querytext = req.query.text
    const newinstance = nluinstancecreator
    const analyzeparams = {
        'text': querytext,
        'features': {
            'entities' : {
                'emotion' : true,
                'sentiment': false
            }, 'keywords': {
                'emotion': true,
                'sentiment': false

            }
        } 
    }

    newinstance.analyze(analyzeparams).then(analysisresults =>
        {
            const emotionalanalysis = analysisresults.result.entities[0].emotion
            return res.send({emotions: emotionalanalysis});
        }).catch( err =>
            {
                console.log(err)
            })
});

app.get("/text/sentiment", (req,res) => {
    const querytext = req.query.text
    const newinstance = nluinstancecreator
    const analyzeparams = {
        'text': querytext,
        'features': {
            'entities' : {
                'sentiment' : true,
                'emotion'  : false
            }, 'keywords': {
                'sentiment': true,
                'emotion': false

            }
        } 
    }

    newinstance.analyze(analyzeparams).then(analysisresults =>
        {
            console.log(JSON.stringify(analysisresults, null, 2))
            const sentimentresponse = analysisresults.result.entities[0].sentiment.label
            return res.send({senti: sentimentresponse});
        }).catch( err =>
            {
                console.log(err)
            })
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

