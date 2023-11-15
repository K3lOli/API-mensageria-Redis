const Mail = require("../lib/Mail");

module.exports = {
    key: 'RegistrationMail',
    async handle({ data }) {
        const { user } = data;

        await Mail.sendMail({
            to: user.email,
            from: "k3lson.oliveira@gmail.com",
            subject: "Assinatura Confirmada",
            html: `Olá ${user.firstName} ${user.secondName}, sua assinatura foi confirmada!
            Para acessar seus recursos exclusivos você precisa basta clicar aqui.`
        });
    },
};