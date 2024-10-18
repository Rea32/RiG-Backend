const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  nombre: {
    type: String,
    required: true
  },
  tipo: {
    type: String
    
  }
});

export const TagModel = mongoose.model('Tag', tagSchema);