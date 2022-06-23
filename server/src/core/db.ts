import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/chat').then(r => console.log('success'))