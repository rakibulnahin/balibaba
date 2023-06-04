const express = require("express")
const mongoose = require("mongoose")
const multer = require('multer');
const fs = require('fs')
// const cors = require('cors')


const router = express.Router()
router.use(express.urlencoded({ extended: true }))
// router.use(cors())


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
    instock: { type: Number, required: true },
    rating: Number,
    tags: [String],
    sold: Number,
    description: [String],
    options: [String],

})

const products = mongoose.model("products", productSchema)

router.get("/getProducts", async (req, res) => {
    try {
        console.log("In the Server Getting products");
        const result = await products.find({})
        res.send(result)
    } catch (error) {
        res.send("Couldnt get products " + error.message)
    }

})

router.get("/getFilteredProducts", async (req, res) => {
    let category = req.query.category;
    let tags = req.query.tags;
    try {
        console.log("Getting ");
        if (category != "undefined") {
            console.log("Filtering by category " + typeof(category) );
            const result = await products.find({ category: category })
            res.send(result)
        } else if (tags != "undefined") {
            console.log("Filtering by tags " + tags);
            const result = await products.find({tags:tags})
            res.send(result)
        } else {
            console.log("Filtered to all items");
            const result = await products.find({})
            res.send(result)
        }
    } catch (error) {
        res.send("Couldnt get products " + error.message)
    }

})

router.post("/addProduct", upload.single('image'), async (req, res) => {

    try {
        let no_products = await (products.countDocuments({})) + 1

        let upload_product = {
            ProductID: "product" + no_products,
            category: req.body.category,

            name: req.body.name,
            discount: req.body.discount,
            price: req.body.price,
            instock: req.body.instock,
            rating: req.body.rating != undefined ? req.body.rating : 0,
            sold: req.body.sold != undefined ? req.body.sold : 0,
            description: req.body.description != undefined ? req.body.description : [],
            options: req.body.options != undefined ? req.body.options : [],
            tags: req.body.tags != undefined ? req.body.tags : [],

            image: {
                data: fs.readFileSync('./uploads/upimage.png'),
                contentType: 'image/png'
            },
        }

        console.log(upload_product);

        let response = await products.create(upload_product)

        res.send("Created new product ")
        // res.send("Created new product "+response)
    } catch (error) {
        res.send("Error in creating new product " + error.message)
    }


})

router.get("/getOneProduct", async (req, res) => {
    let productID = req.query.ProductID
    console.log(productID);
    try {
        let response = await products.find({ ProductID: productID })
        res.send(response)
    } catch (error) {
        res.send("Error in getting one product " + error.message)
    }
})

module.exports = router