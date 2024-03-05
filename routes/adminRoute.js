var express = require("express");
var router = express.Router();
var IngredientModel = require("../models/ingredientModel");

// add

router.post("/ingredient/add", async (req, res) => {
  try {
    const {
      names,
      commonnames_eng,
      commonnames_mal,
      description_content_eng,
      description_content_mal,
      commonuse_content_eng,
      commonuse_content_mal,
      harmfuleffects_content_eng,
      harmfuleffects_content_mal,
      allergy_content_eng,
      allergy_content_mal,
      sourceofingredients_content_eng,
      sourceofingredients_content_mal,
    } = req.body;

    // Check for undefined or null values in any of the fields
    const requiredFields = [
      names,
      commonnames_eng,
      commonnames_mal,
      description_content_eng,
      description_content_mal,
      commonuse_content_eng,
      commonuse_content_mal,
      harmfuleffects_content_eng,
      harmfuleffects_content_mal,
      allergy_content_eng,
      allergy_content_mal,
      sourceofingredients_content_eng,
      sourceofingredients_content_mal,
    ];

    for (const field of requiredFields) {
      if (field == null || field == undefined) {
        return res.status(200).json({
          status: false,
          msg: `${field} not defined`,
        });
      }
    }

    const alreadyExists = await IngredientModel.findOne({
      status: "Active",
      names: names,
    });

    if (alreadyExists) {
      return res.status(200).json({
        status: false,
        msg: "Ingredient already exists",
      });
    }

    const data = new IngredientModel({
      names,
      commonnames_eng,
      commonnames_mal,
      description_content_eng,
      description_content_mal,
      commonuse_content_eng,
      commonuse_content_mal,
      harmfuleffects_content_eng,
      harmfuleffects_content_mal,
      allergy_content_eng,
      allergy_content_mal,
      sourceofingredients_content_eng,
      sourceofingredients_content_mal,
    });

    await data.save();

    res.status(200).json({
      status: true,
      msg: "Ingredient addition successful",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      msg: "Internal server error",
    });
  }
});

// list

router.get("/ingredient/list", async (req, res) => {
  try {
    const ingredients = await IngredientModel.find({ status: "Active" });

    if (ingredients.length === 0) {
      return res.status(200).json({
        status: true,
        msg: "No Ingredients found",
        data: [], // Sending an empty array if no ingredients are found
      });
    }

    // Extracting names from each ingredient and flattening the array
    const namesArray = ingredients.reduce((acc, curr) => {
      acc.push(...curr.names);
      return acc;
    }, []);

    res.status(200).json({
      status: true,
      msg: "Ingredients' names retrieved successfully",
      data: namesArray,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error retrieving ingredients' names",
      data: [],
    });
  }
});

// delete

router.post("/ingredient/delete", async (req, res) => {
  try {
    const { names } = req.body;

    if (!names || names.length === 0) {
      return res.status(400).json({
        status: false,
        msg: "Names not provided",
      });
    }

    const ingredientsToDelete = await IngredientModel.find({
      status: "Active",
      names: { $in: names }, // Using $in operator to find ingredients with provided names
    });

    if (ingredientsToDelete.length === 0) {
      return res.status(404).json({
        status: false,
        msg: "Ingredients not found",
      });
    }

    // Mark all found ingredients as 'Deleted'
    await IngredientModel.updateMany(
      { _id: { $in: ingredientsToDelete.map((ing) => ing._id) } },
      { $set: { status: "Deleted" } }
    );

    res.status(200).json({
      status: true,
      msg: "Ingredients deletion successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Internal server error",
    });
  }
});

router.post("/ingredient/edit", async (req, res) => {
  try {
    const {
      names,
      commonnames_eng,
      commonnames_mal,
      description_content_eng,
      description_content_mal,
      commonuse_content_eng,
      commonuse_content_mal,
      harmfuleffects_content_eng,
      harmfuleffects_content_mal,
      allergy_content_eng,
      allergy_content_mal,
      sourceofingredients_content_eng,
      sourceofingredients_content_mal,
    } = req.body;

    // Check if required fields are provided
    if (!names) {
      return res.status(400).json({
        status: false,
        msg: "Required fields are missing",
      });
    }

    const existingIngredient = await IngredientModel.findOne({
      names: names, // Find the ingredient by ID
      status: "Active",
    });

    if (!existingIngredient) {
      return res.status(404).json({
        status: false,
        msg: "Ingredient not found",
      });
    }

    // Update the ingredient fields
    existingIngredient.names = names;
    existingIngredient.commonnames_eng = commonnames_eng;
    existingIngredient.commonnames_mal = commonnames_mal;
    existingIngredient.description_content_eng = description_content_eng;
    existingIngredient.description_content_mal = description_content_mal;
    existingIngredient.commonuse_content_eng = commonuse_content_eng;
    existingIngredient.commonuse_content_mal = commonuse_content_mal;
    existingIngredient.harmfuleffects_content_eng = harmfuleffects_content_eng;
    existingIngredient.harmfuleffects_content_mal = harmfuleffects_content_mal;
    existingIngredient.allergy_content_eng = allergy_content_eng;
    existingIngredient.allergy_content_mal = allergy_content_mal;
    existingIngredient.sourceofingredients_content_eng =
      sourceofingredients_content_eng;
    existingIngredient.sourceofingredients_content_mal =
      sourceofingredients_content_mal;

    // Save the updated ingredient
    await existingIngredient.save();

    res.status(200).json({
      status: true,
      msg: "Ingredient updated successfully",
      data: existingIngredient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error updating ingredient",
    });
  }
});

router.get("/ingredient/allnames", async (req, res) => {
  try {
    const allNames = await IngredientModel.find(
      { status: "Active" },
      { _id: 1, names: 1 }
    );

    if (!allNames || allNames.length === 0) {
      return res.status(404).json({
        status: false,
        msg: "No active ingredient names found in the database",
      });
    }

    const namesWithIds = allNames.map(({ _id, names }) => ({
      id: _id,
      names: names,
    }));

    res.status(200).json({
      status: true,
      msg: "All names retrieved successfully",
      data: namesWithIds,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error retrieving all names",
    });
  }
});

router.get("/ingredient/allnamesonly", async (req, res) => {
  try {
    const allNames = await IngredientModel.find(
      { status: "Active" },
      { names: 1, _id: 0 }
    );

    if (!allNames || allNames.length === 0) {
      return res.status(404).json({
        status: false,
        msg: "No active ingredient names found in the database",
      });
    }

    const namesArray = allNames.flatMap((entry) => entry.names);

    res.status(200).json({
      status: true,
      msg: "All names retrieved successfully",
      data: namesArray,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error retrieving all names",
    });
  }
});

module.exports = router;
