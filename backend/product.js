const express = require("express")
const mongoose = require("mongoose")
const multer = require('multer');
const fs = require('fs')

const router = express.Router()
router.use(express.urlencoded({ extended: true }))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, "upimage.png")
    }
});

const upload = multer({ storage: storage })

const productSchema = mongoose.Schema({
    ProductID: { type: String, required: true },
    category: { type: String, required: true },
    image: {
        data: Buffer,
        contentType: String,

    },
    name: { type: String, required: true },
    discount: { type: Number, required: true },
    price: { type: Number, required: true },
    instock: String,
    rating: Number,
    tags: [String],
    sold: Number
})

const products = mongoose.model("products", productSchema)

router.get("/getProducts", async (req, res) => {
    try {
        const result = await products.find({})
        res.send(result)
    } catch (error) {
        res.send("Couldnt get products " + error.message)
    }

})

router.post("/addProduct", upload.single('image'), async (req, res) => {

    try {
        let upload_product = {
            ProductID: "product" + await (products.countDocuments({}) + 1),
            category: req.body.category,
            image: {
                data: fs.readFileSync('./uploads/upimage.png'),
                contentType: 'image/png'
            },
            name: req.body.name,
            discount: req.body.discount,
            price: req.body.price,
            instock: "yes",
            rating: 0,
            sold: 0
        }

        let response = await products.create(upload_product)

        res.send("Created new product "+response)
    } catch (error) {
        res.send("Error in creating new product "+error.message)
    }


})

router.get("/getOneProduct", async (req, res)=>{
    let productID = req.query.ProductID
    console.log(productID);
    try {
        let response = await products.find({ProductID: productID})
        res.send(response)
    } catch (error) {
        res.send("Error in getting one product "+error.message)
    }
})

module.exports = router