import { Cat, CatType } from "./cats.model";
import { Router } from "express";
import {
  createCat,
  deleteCat,
  readAllCat,
  readCat,
  updateCat,
  updatePartialCat,
} from "./cats.service";

const router = Router();

router.get("/cats", readAllCat);
router.get("/cats/:id", readCat);
router.post("/cats", createCat);
router.put("/cats/:id", updateCat);
router.patch("/cats/:id", updatePartialCat);
router.delete("/cats/:id", deleteCat);

export default router;
