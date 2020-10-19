const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.postmarkapp.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'c61a35ed-a242-4275-88ef-945b6b52e39f',
      pass: 'c61a35ed-a242-4275-88ef-945b6b52e39f'
    }
  });

  export default transporter;