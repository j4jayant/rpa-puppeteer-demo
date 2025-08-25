import { type Request, type Response } from 'express'
import * as calculator from './calculator'

export const calculateCancerRisk = async (req: Request, res: Response) => {
  try {
    
    if (!req.body) {
      console.error('No request body specified');
      res.status(500).json({
        success: false,
        "error": "No request body specified"
      })
      return
    }

    await calculator.calculateRisk(req.body, res)
    
  } catch (error) {
    res.status(500).json({
        success: false,
        "error": error
      })
    console.error(error)
  }
}
