import e from "express";
import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
    //service: "gmail",
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "seamus40@ethereal.email",
        pass: "	G2CngtnXhE7FX9FQjdc",
    }
});

export const sendEmail = async (req, res) => {
    
    const email = await transport.sendMail({
        from: "1 <seamus40@ethereal.email>",
        to: "2 <abagail.schmitt66@ethereal.email>",
        subject: "Mail recibido",
        html: `<h1>Este es el mensaje.</h1>`,
        text: "No se puede visualizar el mensaje."
    });
    console.log(email)
    res.send("Correo enviado.")
};