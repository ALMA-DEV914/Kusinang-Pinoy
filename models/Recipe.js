const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const RecipeSchema = new Schema({
    recipeName: {
        type: String,
        required: true,
         trim: true
    },
    createdBy: {
        type: String,
        required: true,
         trim: true

    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      required: true,
      enum: ['Single person', 'Family of 2', 'Family of 4', 'family of 6', 'family of 8-10'],
      default: 'Large'
    },

    ingredients: [],
    comments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment'
        }
      ]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }
);

    // get total count of comments and replies on retrieval
    RecipeSchema.virtual('commentCount').get(function() {
        return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
      })


const Recipe = model('Recipe', RecipeSchema);

module.exports = Recipe;