import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    if(req.session.nombre){
        res.render("home", { nombre: req.session.nombre });
    }else{
    res.redirect("/login");
    }
});



export default router;