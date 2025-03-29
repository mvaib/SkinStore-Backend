import express from "express"
import { addProduct, listProduct, removeProduct } from "../controllers/productController.js"
import multer from "multer"
import fs from "fs"

const productRouter = express.Router()

// Image Storage Engine

const storage = multer.diskStorage({
    destination : "uploads",
    filename : (req,file,cb)=>{
        return cb(null, `${Date.now()} ${file.originalname}`)
    }
})

const upload = multer({storage : storage})

productRouter.post("/add",upload.single("image"),async (req, res)=>{
    const result = await addProduct(req)
    
    if(result.success){
        return res.status(200).json({success : result.success, message : result.msg})
    }else{
        if(req.file){
            const path = `uploads/${req.file.filename}`
            fs.unlink(path, (err) => {
                if(err) console.error(`Failed to delete image : ${err.message}`)
            })
        }
        return res.status(400).json({success : result.success, message : result.msg})
    }
})

productRouter.get("/list",listProduct)
productRouter.post("/remove", removeProduct)


export default productRouter