import KPI from "../model/kpi.js"


export const getKpi = async (req, resp, next)=>{
    try {
        const result = await KPI.find()
        resp.status(200).json(result)
    } catch (error) {
        resp.status(404).json(error.message)
    }
}