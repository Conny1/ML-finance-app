import Products from "../model/products.js"

export const getproducts=async(req, resp, next)=>{

    try {
        const result = await Products.find()
        resp.status(200).json(result)
    } catch (error) {
        resp.status(404).json(error.message)
    }

}