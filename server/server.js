const express = require('express')
const mongoose = require('mongoose')
const { Schema } = mongoose
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

const DB = process.env.MONGO || ''

mongoose
.connect(DB, { useNewUrlParser: true }, { useUnifiedTopology: true })
.then(()=> console.log('db connected'))
.catch(err => console.log(err))

const itemSchema = new Schema({
    name: String,
    quantity: Number
})

const items = mongoose.model('items', itemSchema)

app.get('/items', async (req,res) => {
    const result = await items.find({})
    res.json(result)
})

app.get('/items/:id', async (req,res) => {
    const {id} = req.params
    const result = await items.find({_id:id})
    res.json(result)
})

app.post('/items', async (req,res) => {
    const {name, quantity } = req.body
    const newItem = new items({name, quantity})

    const data = await newItem.save() 
    res.json(data)
})

app.put('/items/:id', async (req,res) => {
    const {id} = req.params
    const {name, quantity } = req.body
    if(name || quantity){
    await items.updateOne({_id:id}, {...req.body})
        .catch((err) => {
            console.log(err) 
            res.json({error:"not updated"})
        })
    res.json({item:"updated"})
    }
    else res.json({error:"No Change"})
})

app.delete('/items/:id', async (req,res) => {
    const { id } = req.params
        if(id){
            const removed = await items.deleteOne({ _id: id }).catch(err => {
                console.log(err)
                res.json({error:"item not deleted"})
        })
        return res.json({deleted:"Item removed"})
    }
    res.json({error:"Item not found"})
})

app.listen(PORT, (err) =>{
    if(err) console.log(err)
    else console.log(`Working on port ${PORT}`)
})