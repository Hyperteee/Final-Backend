import { Router } from "express";
import { getAppointmentsData } from "../controller/dataController.js";

const dataRouter = Router();

// GET /data/getAppointments
dataRouter.get("/getAppointments", async (req, res) => {
  try {
    const result = await getAppointmentsData();
    res.status(200).json({
      message: "Success",
      appointments: result
    });
  } catch (error) {
    console.error("GET APPOINTMENTS ERROR:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
});

export default dataRouter;
