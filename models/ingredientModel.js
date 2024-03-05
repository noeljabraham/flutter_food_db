var mongoose = require("mongoose");
var ingredientSchema = mongoose.Schema(
  {
    names: [
      {
        type: String,
      },
    ],
    commonnames_eng: [
      {
        type: String,
      },
    ],
    commonnames_mal: [
      {
        type: String,
      },
    ],
    description_content_eng: [
      {
        type: String,
      },
    ],
    description_content_mal: [
      {
        type: String,
      },
    ],
    commonuse_content_eng: [
      {
        type: String,
      },
    ],
    commonuse_content_mal: [
      {
        type: String,
      },
    ],
    harmfuleffects_content_eng: [
      {
        type: String,
      },
    ],
    harmfuleffects_content_mal: [
      {
        type: String,
      },
    ],
    allergy_content_eng: [
      {
        type: String,
      },
    ],
    allergy_content_mal: [
      {
        type: String,
      },
    ],
    sourceofingredients_content_eng: [
      {
        type: String,
      },
    ],
    sourceofingredients_content_mal: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

var IngredientModel = (module.exports = mongoose.model(
  "IngredientModel",
  ingredientSchema
));

module.exports.get = function (callback, limit) {
  IngredientModel.find(callback).limit(limit);
};

// Sample

/*{
  "names": ["Name1", "Name2"],
  "commonnames_eng": ["Common Name 1", "Common Name 2"],
  "commonnames_mal": ["Malay Common Name 1", "Malay Common Name 2"],
  "description_content_eng": ["Description Content 1", "Description Content 2"],
  "description_content_mal": ["Malay Description Content 1", "Malay Description Content 2"],
  "commonuse_content_eng": ["Common Use Content 1", "Common Use Content 2"],
  "commonuse_content_mal": ["Malay Common Use Content 1", "Malay Common Use Content 2"],
  "harmfuleffects_content_eng": ["Harmful Effects Content 1", "Harmful Effects Content 2"],
  "harmfuleffects_content_mal": ["Malay Harmful Effects Content 1", "Malay Harmful Effects Content 2"],
  "allergy_content_eng": ["Allergy Content 1", "Allergy Content 2"],
  "allergy_content_mal": ["Malay Allergy Content 1", "Malay Allergy Content 2"],
  "sourceofingredients_content_eng": ["Source of Ingredients Content 1", "Source of Ingredients Content 2"],
  "sourceofingredients_content_mal": ["Malay Source of Ingredients Content 1", "Malay Source of Ingredients Content 2"]
 
}*/

/*
[
  {
    "names": ["Ingredient1", "Ingredient2"],
    "commonnames_eng": ["Common Name 1", "Common Name 2"],
    "commonnames_mal": ["Malay Common Name 1", "Malay Common Name 2"],
    "description_content_eng": ["Description Content 1", "Description Content 2"],
    "description_content_mal": ["Malay Description Content 1", "Malay Description Content 2"],
    "commonuse_content_eng": ["Common Use Content 1", "Common Use Content 2"],
    "commonuse_content_mal": ["Malay Common Use Content 1", "Malay Common Use Content 2"],
    "harmfuleffects_content_eng": ["Harmful Effects Content 1", "Harmful Effects Content 2"],
    "harmfuleffects_content_mal": ["Malay Harmful Effects Content 1", "Malay Harmful Effects Content 2"],
    "allergy_content_eng": ["Allergy Content 1", "Allergy Content 2"],
    "allergy_content_mal": ["Malay Allergy Content 1", "Malay Allergy Content 2"],
    "sourceofingredients_content_eng": ["Source of Ingredients Content 1", "Source of Ingredients Content 2"],
    "sourceofingredients_content_mal": ["Malay Source of Ingredients Content 1", "Malay Source of Ingredients Content 2"]
  },
  {
    "names": ["Ingredient3", "Ingredient4"],
    "commonnames_eng": ["Common Name 3", "Common Name 4"],
    "commonnames_mal": ["Malay Common Name 3", "Malay Common Name 4"],
    "description_content_eng": ["Description Content 3", "Description Content 4"],
    "description_content_mal": ["Malay Description Content 3", "Malay Description Content 4"],
    "commonuse_content_eng": ["Common Use Content 3", "Common Use Content 4"],
    "commonuse_content_mal": ["Malay Common Use Content 3", "Malay Common Use Content 4"],
    "harmfuleffects_content_eng": ["Harmful Effects Content 3", "Harmful Effects Content 4"],
    "harmfuleffects_content_mal": ["Malay Harmful Effects Content 3", "Malay Harmful Effects Content 4"],
    "allergy_content_eng": ["Allergy Content 3", "Allergy Content 4"],
    "allergy_content_mal": ["Malay Allergy Content 3", "Malay Allergy Content 4"],
    "sourceofingredients_content_eng": ["Source of Ingredients Content 3", "Source of Ingredients Content 4"],
    "sourceofingredients_content_mal": ["Malay Source of Ingredients Content 3", "Malay Source of Ingredients Content 4"]
  },

]*/




