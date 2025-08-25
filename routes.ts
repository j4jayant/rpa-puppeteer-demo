import { Router } from 'express'
import * as calculator from './controller'

export const router = Router()

router.post('/calculator/cancerrisk', async (req, res): Promise<any> => {
    return calculator.calculateCancerRisk(req, res)
});

module.exports = router;
