const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000


// middleware
app.use(cors())
app.use(express.json())




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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


    app.post('/volunteers', async(req, res)=>{
        const data = req.body
        const result = await volunteerCollection.insertOne(data)
        res.send(result)
    })

    app.get('/volunteers', async(req, res)=>{
        const cursor = volunteerCollection.find()
        const result = await cursor.toArray()
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
        const query = { email }
        const result = await volunteerReqCollection.find(query).toArray()
        res.send(result)
        
    })


    app.post('/beVolunteers', async(req, res)=>{
        const data = req.body
        const result = await volunteerReqCollection.insertOne(data)
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
