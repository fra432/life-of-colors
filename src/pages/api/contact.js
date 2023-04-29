const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDER_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { firstName, lastName, email, message } = req.body;

  const msg = {
    to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
    from: "francescofabrissin@gmail.com",
    subject: "Hai ricevuto un messsaggio da Paint your Life",
    text: { message },
    html: `
  <html>
    <body>
      <p>Hai ricevuto un messaggio da ${firstName} ${lastName}</p>
      <p>Email: ${email}</p>
      <p>Messaggio: ${message}</p>
    </body>
  </html>
`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Message sent" });
  } catch (error) {
    console.log(error);
    res.st;
  }
}
