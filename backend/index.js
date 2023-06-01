const connectToMongo=require('./db')
const express = require('express')
const cors=require('cors')
connectToMongo();

const app = express()
const port = 3003;

//Avilable Routes\

app.use(cors())
app.use(express.json());
app.use("/api/auth", require('./routes/auth'))
app.use("/api/notes", require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello Naman')
})

app.listen(port, () => {
  console.log(`CloudCanvas Backend listening on port ${port}`)
})