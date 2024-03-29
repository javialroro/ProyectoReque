import { Resend } from 'resend';
const resend = new Resend('re_5fUuEmqN_FkEZd9JnmvWLEgEX8tPxbLXN');

export class Email {
    async sendEmail (correos) {
        const { data, error } = await resend.emails.send({
        from: 'Snupie <snupie@resend.dev>',
        to: correos,
        subject: 'Hello World',
        html: '<strong>It works!</strong>',
        });
    
        if (error) {
        return console.error({ error });
        }
    
        return {data};
    };

}
