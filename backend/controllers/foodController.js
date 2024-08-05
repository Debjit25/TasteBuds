// import foodModel from "../models/foodModel.js";
// import fs from 'fs'

// //add food item

// const addFood=async (req,res)=>{

//     let image_filename = `${req.file.filename}`;
//     const food= new foodModel({
//         name:req.body.name,
//         description:req.body.description,
//         price:req.body.price,
//         category:req.body.category,
//         image:image_filename
//     })
//     try{
//         await food.save();
//         res.json({success:true,message:"Food Added"})
//     }catch(error){
//         console.log("error")
//         res.json({success:false,message:"Error"})
//     }

// }
// export {addFood}

import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);

  // Check if the file and fields are present
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Image file is required" });
  }

  const { name, description, price, category } = req.body;

  // Validate request body
  if (!name || !description || !price || !category) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name,
    description,
    price,
    category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error("Error while adding food:", error); // Log detailed error
    res
      .status(500)
      .json({ success: false, message: "Error", error: error.message });
  }
};

//all food list
const listFood=async (req,res)=>{
      try{
        const foods=await foodModel.find({});
        res.json({succes:true,data:foods})
      }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
      }
}

//remove food item
const removeFood=async (req,res)=>{
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({succes:true,message:"Food Removed"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

export { addFood,listFood,removeFood};
