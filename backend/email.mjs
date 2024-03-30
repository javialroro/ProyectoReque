import nodemailer from 'nodemailer';

export class Email {
    constructor() {
        // Configura el transporte
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'snupie.tech@gmail.com', // Reemplaza con tu dirección de correo electrónico
                pass: 'igns qmkj eeux xxnu' // Reemplaza con tu contraseña
            }
        });
    }

    async sendEmail(correos, asunto, mensaje) {
        try {
            // Configura el mensaje
            let mailOptions = {
                from: 'snupie.tech@gmail.com', // Dirección de correo del remitente
                to: correos,
                subject: asunto,
                html: '<strong>'+mensaje+'</strong>'
            };

            // Envía el correo electrónico
            const response = await this.transporter.sendMail(mailOptions);
            console.log('Correo electrónico enviado correctamente:', response);
            return response;
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            throw error;
        }
    }
}
