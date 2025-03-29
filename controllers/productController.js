import ProductModel from "../models/product.model.js";
import fs from "fs"

// add product item
const addProduct = async (req) => {

    let image_filename = `${req.file.filename}`

    const product = new ProductModel({
        name : req.body.name,
        price : req.body.price,
        category : req.body.category,
        image : image_filename
    })
    try {
        await product.save()
        return {success : true, msg : "Product Added"}
    } catch (error) {
        console.error(error)
        return {success : false, msg : "Error"}
    }
}


const listProduct = async (req, res) => {
    try {
        const products = await ProductModel.find({})
        res.status(200).json({success : true, data : products})

    } catch (error) {
        console.error(error)
        res.status(400).json({success : false, msg : "Error"})
    }
}

const removeProduct = async(req, res) => {
    try {
        const product = await ProductModel.findById(req.body.id)
        fs.unlink(`uploads/${product.image}`,()=>{})

        await ProductModel.findByIdAndDelete(req.body.id)
        res.status(200).json({success : true, msg : "Product Removed"})
    } catch (error) {
        console.error(error)
        res.status(400).json({success : false, msg : "Error"})
    }
}
export {addProduct, listProduct, removeProduct}