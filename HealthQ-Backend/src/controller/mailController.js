import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

app.use((req, res, next) => {
    console.log("Method:", req.method);
    console.log("Content-Type:", req.headers['content-type']);
    console.log("Raw Body:", req.body);
    next();
});