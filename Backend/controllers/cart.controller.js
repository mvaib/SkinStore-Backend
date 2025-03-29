import UserModel from "../models/users.model.js";


// add to cart
const addToCart = async (req, res) => {
    const { userId, itemId } = req.body;
    if (!userId || !itemId) {
        return res.status(400).json({ success: false, msg: "User ID and Item ID are required" });
    }
    
    try {
        const update = { $inc: { [`cartData.${itemId}`]: 1 } };
        await UserModel.findOneAndUpdate({ _id: userId }, update, { new: true, useFindAndModify: false });
        res.status(200).json({ success: true, msg: "Item added to cart" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, msg: "Error" });
    }
}


// remove from cart
const removeFromCart = async (req, res) => {
    const { userId, itemId } = req.body;
    if (!userId || !itemId) return res.status(400).json({ success: false, msg: "User ID and Item ID are required" });
    
    try {
        const user = await UserModel.findOne({_id: userId});
        if (!user || !user.cartData[itemId]) {
            return res.status(400).json({ success: false, msg: "Item not found in cart" });
        }
        
        const update = user.cartData[itemId] > 1 
            ? { $inc: { [`cartData.${itemId}`]: -1 } } 
            : { $unset: { [`cartData.${itemId}`]: "" } };

        await UserModel.findOneAndUpdate({ _id: userId }, update, { new: true, useFindAndModify: false });
        res.status(200).json({ success: true, msg: "Item removed from cart" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, msg: "Error" });
    }
}


// clear cart
const clearCart = async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, msg: "User ID is required" });
    
    try {
        const update = { $set: { cartData: {} } };
        await UserModel.findOneAndUpdate({ _id: userId }, update, { new: true, useFindAndModify: false });
        res.status(200).json({ success: true, msg: "Cart cleared" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, msg: "Error" });
    }
}

const getCart = async (req, res) => {
    try {
        let userData = await UserModel.findOne({_id : req.body.userId})
        let cartData = await userData.cartData
        res.status(200).json({success : true, data : cartData})
    } catch (error) {
        console.error(error)
        res.status(400).json({success : false, msg : "Error"})
    }
}

export {addToCart, removeFromCart, getCart, clearCart}