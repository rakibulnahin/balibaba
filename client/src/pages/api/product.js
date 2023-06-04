import axios from "axios";
// require('dotenv').config()

const getAllProducts = async () => {

    try {
        // console.log(process.env.NEXT_PUBLIC_SERVER+"/api/products/getProducts");
        let response = await axios.get(process.env.NEXT_PUBLIC_SERVER + "/api/products/getProducts")
        console.log(response);
        return response.data

    } catch (error) {
        console.log("error on getting product " + error.message);
        return null
    }
}

const getOneProduct = async (ProductID) => {

    try {
        // let response = await axios.get("http://localhost:3001/api/products/getProducts")
        // console.log(response);
        // return response.data

        let response = await fetch(process.env.NEXT_PUBLIC_SERVER + `/api/products/getOneProduct?ProductID=${encodeURIComponent(ProductID)}`)
        console.log(response);
        response = await response.json()
        console.log(response);
        return response

    } catch (error) {
        console.log("error on getting product " + error.message);
        return null
    }
}

const getFilteredProduct = async (category, tags) => {
    try {
        console.log( `categroy: ${category} and tags: ${tags}`)
        let response = await fetch(process.env.NEXT_PUBLIC_SERVER + `/api/products/getFilteredProducts?category=${encodeURIComponent(category)}&tags=${encodeURIComponent(tags)}`)
        console.log(response);
        response = await response.json()
        console.log(response);
        return response

    } catch (error) {
        console.log("error on getting filtered product in backend " + error.message);
        return null
    }
}

export {
    getAllProducts,
    getOneProduct,
    getFilteredProduct
}