# Email Sender Web Application

A full-stack web application that allows users to send real emails through a backend server with email service integration.

## Features

- Modern, responsive web interface with animated gradient background
- Real email sending functionality through backend server
- Input validation and error handling
- Loading states and success/error feedback
- Email formatting with HTML templates

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Service

You need to configure your email service credentials. You have two options:

#### Option A: Environment Variables (Recommended)
Create a `.env` file in the root directory:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

#### Option B: Direct Configuration
Edit the `server.js` file and replace the placeholder values:

```javascript
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',     // Replace with your email
    pass: 'your-app-password'         // Replace with your app password
  }
});
```

### 3. Gmail Setup (if using Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in your configuration

### 4. Other Email Services

You can use other email services by changing the service configuration:

```javascript
// For Outlook
service: 'outlook'

// For Yahoo
service: 'yahoo'

// For custom SMTP
{
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@domain.com',
    pass: 'your-password'
  }
}
```

### 5. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The application will be available at `http://localhost:3000`

### 6. Test Email Configuration

Visit `http://localhost:3000/test-email` to verify your email configuration is working.

## Usage

1. Open the application in your browser
2. Click "Write an email"
3. Enter the recipient's email address
4. Compose your message
5. Click "Send Email"
6. The email will be sent to the recipient's inbox

## File Structure

```
├── index.html          # Frontend HTML
├── style.css           # Styling with animated gradient
├── server.js           # Backend Express server
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## Security Notes

- Never commit your email credentials to version control
- Use environment variables for sensitive information
- Consider using OAuth2 for production applications
- Implement rate limiting for production use

## Troubleshooting

### Common Issues

1. **Authentication Error**: Check your email credentials and app password
2. **Connection Error**: Verify your internet connection and SMTP settings
3. **Port Already in Use**: Change the PORT in server.js or kill the existing process

### Error Messages

- "Email authentication failed": Wrong email/password
- "Failed to connect to email server": Network or SMTP configuration issue
- "Invalid email address format": Frontend validation failed

## Dependencies

- **express**: Web server framework
- **nodemailer**: Email sending library
- **cors**: Cross-origin resource sharing
- **body-parser**: Request body parsing middleware

## License

MIT License
