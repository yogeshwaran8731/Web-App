const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Email configuration
// Note: You'll need to configure these with your actual email service credentials
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to other services like 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER || 'yogeshwaran8731@gmail.com', // Replace with your email
    pass: process.env.EMAIL_PASS || 'Welcomeleoyogesh@1010y'     // Replace with your app password
  }
});

// Alternative configuration for other SMTP services
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER || 'your-email@gmail.com',
//     pass: process.env.EMAIL_PASS || 'your-app-password'
//   }
// });

// Route to serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to send email
app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    // Validate input
    if (!to || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Recipient email and message are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email address format' 
      });
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: to,
      subject: subject || 'Message from Email Sender App',
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">You have received a new message</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #555; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #888; font-size: 12px;">Sent via Email Sender App</p>
        </div>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    
    res.json({ 
      success: true, 
      message: 'Email sent successfully!',
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Handle specific errors
    if (error.code === 'EAUTH') {
      res.status(500).json({ 
        success: false, 
        error: 'Email authentication failed. Please check your email credentials.' 
      });
    } else if (error.code === 'ECONNECTION') {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to connect to email server. Please check your internet connection.' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to send email. Please try again later.' 
      });
    }
  }
});

// Test route to verify email configuration
app.get('/test-email', async (req, res) => {
  try {
    await transporter.verify();
    res.json({ success: true, message: 'Email configuration is valid' });
  } catch (error) {
    console.error('Email configuration error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Email configuration is invalid. Please check your credentials.' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Make sure to configure your email credentials in environment variables or directly in the code');
});
