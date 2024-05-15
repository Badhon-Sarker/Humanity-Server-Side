const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000


// middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        
      ],
      credentials: true,
      optionsSuccessStatus: 200
}))
app.use(express.json())
app.use(cookieParser())





const uri = `mongodb+srv://${process.env.VITE_USER}:${process.env.VITE_PASS}@cluster0.qx0skjo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const volunteerCollection = client.db("humanity").collection('volunteers')
    const volunteerReqCollection = client.db("humanity").collection('request')



    // jwt implementation

    app.post('/jwt', async(req, res)=>{
        const user = req.body
        const token = jwt.sign(user, process.env.ACCESS_TOKEN,{
            expiresIn: '365d',
        })

        res
        .cookie('token', token, {
            httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({success: true})
    })


    app.get('/logOut', (req, res) => {
        res
          .clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 0,
          })
          .send({ success: true })
      })






    app.post('/volunteers', async(req, res)=>{
        const data = req.body
        const result = await volunteerCollection.insertOne(data)
        res.send(result)
    })


    app.get('/volunteers', async(req, res)=>{      
        const cursor = volunteerCollection.find().sort({date: 1})
        const result = await cursor.toArray()
        res.send(result)
    })

    

    app.get('/volunteersSearch', async(req, res)=>{
        const search = req.query.search

        let query = {
            title: { $regex: search, $options: 'i'}
        }
        const result = await volunteerCollection.find(query).toArray()
        res.send(result)
    })

    
    app.get('/volunteer/:id', async(req, res)=>{
        const id = new ObjectId(req.params.id)
        const result = await volunteerCollection.findOne(id)       
        res.send(result)
    })


    app.get('/beVolunteer/:id', async(req, res)=>{
        const id = new ObjectId(req.params.id)
        const result = await volunteerCollection.findOne(id)       
        res.send(result)
    })


    app.get('/myPost/:email', async(req, res)=>{
        const email = req.params.email
        const query = { email }
        const result = await volunteerCollection.find(query).toArray()
        res.send(result)
        
    })


    app.get('/myVolReq/:email', async(req, res)=>{
        const email = req.params.email
        const query = { userEmail: email }
        const result = await volunteerReqCollection.find(query).toArray()
        res.send(result)
        
    })


    app.post('/beVolunteers', async(req, res)=>{
        const data = req.body
        const result = await volunteerReqCollection.insertOne(data)
        res.send(result)
    })


    app.put('/updatePost/:id', async(req, res)=>{

        const query = {_id: new ObjectId(req.params.id)}

        const data = {
            $set: {
               
                thumbnail: req.body.thumbnail,
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                location: req.body.location,
                number: req.body.number,
                date: req.body.date,
                email: req.body.email,
                name: req.body.name

            },
          };

        const result = await volunteerCollection.updateOne(query, data);
        
        res.send(result)
    })



    app.delete('/postDelete/:id', async(req, res)=>{
        const result = await volunteerCollection.deleteOne({_id: new ObjectId(req.params.id)})
        res.send(result)
    })


    app.delete('/reqDelete/:id', async(req, res)=>{
        const result = await volunteerReqCollection.deleteOne({_id: new ObjectId(req.params.id)})
        res.send(result)
    })


    app.delete('/needVolDelete/:id', async(req, res)=>{
        const result = await volunteerCollection.deleteOne({_id: new ObjectId(req.params.id)})
        res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('Volunteer Server is Running')
})

app.listen(port, (req, res)=>{
    console.log('Server is running on port', port)
})
