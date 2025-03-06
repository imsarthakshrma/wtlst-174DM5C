import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendThankYouEmail(email: string) {

    try {
        const { data, error } = await resend.emails.send({
            from: "Sarthak Sharma <sarthak@kroskod.com>",
            to: email,
            subject: 'Thank you for joining the waitlist',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Welcome to the Kroskod !</h2>
                <p>Thank you for joining our waitlist. We're excited to have you on board!</p>
                <p>We're working hard to build an amazing product, and we'll keep you updated on our progress.</p>
                <p>If you have any questions, feel free to reply to this email.</p>
                <p>Best regards,<br>The Kroskod Team</p>
            </div>
        `,

        });

        if (error) {
            throw new Error(error.message);
        }
        
        return data;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}
