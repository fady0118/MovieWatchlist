import { Router } from "express";

const router = Router()

const movie = {
    title: "lies of p",
    year:2045,
    genre:"action-drama"
}

router.get('/', (req, res)=>{
    res.json({movie})
})

export default router;