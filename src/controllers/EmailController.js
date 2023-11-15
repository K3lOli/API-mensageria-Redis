// const MailQueue = require("../queue/MailQueue");

// const MailQueue = require("../lib/Mail")

const Queue = require("../lib/Queue");

async function sendEmail(req, res){
    const {
        email,
        firstName,
        secondName
    } = req.body;

    const user = {
        email,
        firstName,
        secondName
    }

    await Queue.add("RegistrationMail", { user });

    // const template = `
        
    // `

    // try {
    //     // await MailQueue.add({
    //     //     to: email,
    //     //     from: "k3lson.oliveira@gmail.com",
    //     //     subject: "Assinatura Confirmada",
    //     //     text: `Olá ${firstName} ${lastName}, sua assinatura foi confirmada!
    //     //     Para acessar seus recursos exclusivos você precisa basta clicar aqui.`
    //     // })
    //     return reply.code(200).send();
    // } catch {
    //     return reply.code(500).send("Internal Server Error");
    // }
    return res.json(user);
}

module.exports = {
    sendEmail
}
