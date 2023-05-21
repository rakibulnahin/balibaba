import axios from "axios";

const getAllProducts = async () => {

    try {
        let response = await axios.get("http://localhost:3001/api/products/getProducts")
        console.log(response);
        return response.data

    } catch (error) {
        console.log("error on getting product "+error.message);
        return null
    }
}

const getOneProduct = async (ProductID) => {
    
    try {
        // let response = await axios.get("http://localhost:3001/api/products/getProducts")
        // console.log(response);
        // return response.data

        let response = await fetch(`http://localhost:3001/api/products/getOneProduct?ProductID=${encodeURIComponent(ProductID)}`)
        console.log(response);
        response = await response.json()
        console.log(response);
        return response

    } catch (error) {
        console.log("error on getting product "+error.message);
        return null
    }
}

export {
    getAllProducts,
    getOneProduct,
}