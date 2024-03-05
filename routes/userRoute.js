var express = require("express");
var router = express.Router();
var IngredientModel = require("../models/ingredientModel");
router.post("/ingredient/commonnames/eng", async (req, res) => {
  try {
    const { names } = req.body;

    if (!names || names.length === 0) {
      return res.status(400).json({
        status: false,
        msg: "Names array is missing or invalid",
      });
    }

    const commonNamesEng = await IngredientModel.find(
      { names: { $in: names }, status: "Active" },
      { commonnames_eng: 1, _id: 0 }
    );

    if (!commonNamesEng || commonNamesEng.length === 0) {
      return res.status(404).json({
        status: false,
        msg: `No active common names in English found for the provided ingredient names`,
      });
    }

    const commonNames = commonNamesEng
      .map((ingredient) => ingredient.commonnames_eng)
      .flat();

    res.status(200).json({
      status: true,
      msg: `Common names in English retrieved successfully for the provided ingredient names`,
      data: commonNames,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error retrieving common names in English",
    });
  }
});

router.post("/ingredient/commonnames/mal", async (req, res) => {
  try {
    const { names } = req.body;

    if (!names || names.length === 0) {
      return res.status(400).json({
        status: false,
        msg: "Names array is missing or invalid",
      });
    }

    const commonNamesMal = await IngredientModel.find(
      { names: { $in: names }, status: "Active" },
      { commonnames_mal: 1, _id: 0 }
    );

    if (!commonNamesMal || commonNamesMal.length === 0) {
      return res.status(404).json({
        status: false,
        msg: `No active common names in Malayan found for the provided ingredient names`,
      });
    }

    const commonMalayanNames = commonNamesMal
      .map((ingredient) => ingredient.commonnames_mal)
      .flat();

    res.status(200).json({
      status: true,
      msg: `Common names in Malayan retrieved successfully for the provided ingredient names`,
      data: commonMalayanNames,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error retrieving common names in Malayan",
    });
  }
});

router.post("/ingredient/description/eng", async (req, res) => {
  try {
    const { names } = req.body;

    if (!names || names.length === 0) {
      return res.status(400).json({
        status: false,
        msg: "Names array is missing or invalid",
      });
    }

    const descriptionsEng = await IngredientModel.find(
      { names: { $in: names }, status: "Active" },
      { description_content_eng: 1, _id: 0 }
    );

    if (!descriptionsEng || descriptionsEng.length === 0) {
      return res.status(404).json({
        status: false,
        msg: `No active descriptions in English found for the provided ingredient names`,
      });
    }

    const descriptionInEnglish = descriptionsEng
      .map((ingredient) => ingredient.description_content_eng)
      .flat();

    res.status(200).json({
      status: true,
      msg: `Descriptions in English retrieved successfully for the provided ingredient names`,
      data: descriptionInEnglish,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error retrieving descriptions in English",
    });
  }
});

router.post("/ingredient/description/mal", async (req, res) => {
  try {
    const { names } = req.body;

    if (!names) {
      return res.status(400).json({
        status: false,
        msg: "Name is missing or invalid",
      });
    }

    const descriptionMal = await IngredientModel.findOne(
      { names: names, status: "Active" },
      { description_content_mal: 1, _id: 0 }
    );

    if (!descriptionMal || !descriptionMal.description_content_mal) {
      return res.status(404).json({
        status: false,
        msg: `No active description in Malayalam found for '${names}'`,
      });
    }

    res.status(200).json({
      status: true,
      msg: `Description in Malayalam retrieved successfully for '${names}'`,
      data: descriptionMal.description_content_mal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error retrieving description in Malayalam",
    });
  }
});

router.post("/ingredient/commonuse/eng", async (req, res) => {
  try {
    const { names } = req.body;

    if (!names) {
      return res.status(400).json({
        status: false,
        msg: "Names are missing or invalid",
      });
    }

    const commonuseEng = await IngredientModel.find(
      { names: { $in: names }, status: "Active" },
      { commonuse_content_eng: 1, _id: 0 }
    );

    if (!commonuseEng || commonuseEng.length === 0) {
      return res.status(404).json({
        status: false,
        msg: `No active Common Use in English found for the provided names`,
      });
    }

    const commonUse = commonuseEng
      .map((item) => item.commonuse_content_eng)
      .flat();

    res.status(200).json({
      status: true,
      msg: `Common Use in English retrieved successfully`,
      data: commonUse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error retrieving Common Use in English",
    });
  }
});

router.post("/ingredient/commonuse/mal", async (req, res) => {
  try {
    const { names } = req.body;

    if (!names) {
      return res.status(400).json({
        status: false,
        msg: "Names are missing or invalid",
      });
    }

    const commonuseMal = await IngredientModel.find(
      { names: { $in: names }, status: "Active" },
      { commonuse_content_mal: 1, _id: 0 }
    );

    if (!commonuseMal || commonuseMal.length === 0) {
      return res.status(404).json({
        status: false,
        msg: `No active Common Use in Malayalam found for the provided names`,
      });
    }

    const result = commonuseMal
      .map((item) => item.commonuse_content_mal)
      .flat();

    res.status(200).json({
      status: true,
      msg: `Common Use in Malayalam retrieved successfully`,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error retrieving Common Use in Malayalam",
    });
  }
});
router.post("/ingredient/harmfuleffects/eng", async (req, res) => {
  try {
    const { names } = req.body;

    if (!names) {
      return res.status(400).json({
        status: false,
        msg: "Names are missing or invalid",
      });
    }

    const harmfulEffectsEng = await IngredientModel.find(
      { names: { $in: names }, status: "Active" },
      { harmfuleffects_content_eng: 1, _id: 0 }
    );

    if (!harmfulEffectsEng || harmfulEffectsEng.length === 0) {
      return res.status(404).json({
        status: false,
        msg: `No active Harmful Effects in English found for the provided names`,
      });
    }

    const harmfulEffects = harmfulEffectsEng
      .map((item) => item.harmfuleffects_content_eng)
      .flat();

    res.status(200).json({
      status: true,
      msg: `Harmful Effects in English retrieved successfully`,
      data: harmfulEffects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error retrieving Harmful Effects in English",
    });
  }
});
router.post("/ingredient/harmfuleffects/mal", async (req, res) => {
  try {
    const { names } = req.body;

    if (!names) {
      return res.status(400).json({
        status: false,
        msg: "Names are missing or invalid",
      });
    }

    const harmfuleffectsMal = await IngredientModel.find(
      { names: { $in: names }, status: "Active" },
      { harmfuleffects_content_mal: 1, _id: 0 }
    );

    if (!harmfuleffectsMal || harmfuleffectsMal.length === 0) {
      return res.status(404).json({
        status: false,
        msg: `No active Harmful Effects in Malayalam found for the provided names`,
      });
    }

    // Extract the 'harmfuleffects_content_mal' values and flatten the array if necessary
    const harmfulEffects = harmfuleffectsMal
      .map((item) => item.harmfuleffects_content_mal)
      .flat();

    res.status(200).json({
      status: true,
      msg: `Harmful Effects in Malayalam retrieved successfully`,
      data: harmfulEffects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error retrieving Harmful Effects in Malayalam",
    });
  }
});

router.post("/ingredient/allergy/eng", async (req, res) => {
  try {
    const { names } = req.body;

    if (!names) {
      return res.status(400).json({
        status: false,
        msg: "Names are missing or invalid",
      });
    }

    const allergyEng = await IngredientModel.find(
      { names: { $in: names }, status: "Active" },
      { allergy_content_eng: 1, _id: 0 }
    );

    if (!allergyEng || allergyEng.length === 0) {
      return res.status(404).json({
        status: false,
        msg: `No active Allergy in English found for the provided names`,
      });
    }

    // Extract the 'allergy_content_eng' values and flatten the array if necessary
    const allergies = allergyEng.map((item) => item.allergy_content_eng).flat();

    res.status(200).json({
      status: true,
      msg: `Allergy in English retrieved successfully`,
      data: allergies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error retrieving Allergy in English",
    });
  }
});
router.post("/ingredient/allergy/mal", async (req, res) => {
  try {
    const { names } = req.body;

    if (!names) {
      return res.status(400).json({
        status: false,
        msg: "Names are missing or invalid",
      });
    }

    const allergyMal = await IngredientModel.find(
      { names: { $in: names }, status: "Active" },
      { allergy_content_mal: 1, _id: 0 }
    );

    if (!allergyMal || allergyMal.length === 0) {
      return res.status(404).json({
        status: false,
        msg: `No active Allergy in Malayalam found for the provided names`,
      });
    }

    // Extract the 'allergy_content_mal' values and flatten the array if necessary
    const allergies = allergyMal.map((item) => item.allergy_content_mal).flat();

    res.status(200).json({
      status: true,
      msg: `Allergy in Malayalam retrieved successfully`,
      data: allergies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error retrieving Allergy in Malayalam",
    });
  }
});

router.post("/ingredient/sourceofingredients/eng", async (req, res) => {
  try {
    const { names } = req.body;

    if (!names) {
      return res.status(400).json({
        status: false,
        msg: "Names are missing or invalid",
      });
    }

    const sourceofingredientsEng = await IngredientModel.find(
      { names: { $in: names }, status: "Active" },
      { sourceofingredients_content_eng: 1, _id: 0 }
    );

    if (!sourceofingredientsEng || sourceofingredientsEng.length === 0) {
      return res.status(404).json({
        status: false,
        msg: `No active Source of Ingredients in English found for the provided names`,
      });
    }

    // Extract the values and flatten them
    const sourceOfIngredients = sourceofingredientsEng
      .map((item) => item.sourceofingredients_content_eng)
      .flat();

    res.status(200).json({
      status: true,
      msg: `Source of Ingredients in English retrieved successfully`,
      data: sourceOfIngredients,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error retrieving Source of Ingredients in English",
    });
  }
});

router.post("/ingredient/sourceofingredients/mal", async (req, res) => {
  try {
    const { names } = req.body;

    if (!names) {
      return res.status(400).json({
        status: false,
        msg: "Names are missing or invalid",
      });
    }

    const sourceofingredientsMal = await IngredientModel.find(
      { names: { $in: names }, status: "Active" },
      { sourceofingredients_content_mal: 1, _id: 0 }
    );

    if (!sourceofingredientsMal || sourceofingredientsMal.length === 0) {
      return res.status(404).json({
        status: false,
        msg: `No active Source of Ingredients in Malayalam found for the provided names`,
      });
    }

    // Extract the values and join them with commas
    const sourceOfIngredients = sourceofingredientsMal
      .map((item) => item.sourceofingredients_content_mal)
      .flat();

    res.status(200).json({
      status: true,
      msg: `Source of Ingredients in Malayalam retrieved successfully`,
      data: sourceOfIngredients,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Error retrieving Source of Ingredients in Malayalam",
    });
  }
});

module.exports = router;
