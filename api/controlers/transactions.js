import transactions from "../model/transactions.js"

export const getTransactions=async(req, resp, next)=>{

    try {
        const result = await transactions.find().limit(50).sort({"createdAt": -1})

        resp.status(200).json(result)
    } catch (error) {
        resp.status(404).json(error.message)
    }

}