import { render } from '@react-email/components';
import nodemailer from 'nodemailer';
import { renderToString } from 'react-dom/server';
import { VerificationTemplate } from '../../emails/VerificationTemplate';
import React from 'react';
interface Email {
    to: string[] // An array of email addresses to which to send the email.
    subject: string // The subject of the email.
    template: React.ReactElement // The body of the email as a React element.
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.forwardemail.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});



export const sendEmail = async ({ to, subject, template} : Email) => {
  const emailHtml = render(template);
  const options = {
    from: 'sanjanabhat2002@gmail.com',
    to: to,
    subject: subject,
    html: emailHtml,
  };
  
  await transporter.sendMail(options);

}

