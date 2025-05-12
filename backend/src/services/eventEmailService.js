import { createTransporter, config } from '../config/dbconfig.js';

const createEmailHtml = (name, description, date, location) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>⚔️ A New Event Awaits You!</title>
    <style>
        body {
        background-color: #121212;
        font-family: 'Segoe UI', sans-serif;
        color: #f0f0f0;
        padding: 20px;
        }

        .container {
        max-width: 600px;
        margin: auto;
        background: #1e1e2e;
        padding: 30px;
        border-radius: 15px;
        border: 2px solid #4caf50;
        box-shadow: 0 0 15px rgba(76, 175, 80, 0.3);
        }

        h1 {
        color: #4caf50;
        text-align: center;
        }

        .event-details {
        margin-top: 20px;
        background: #2a2a3b;
        padding: 20px;
        border-radius: 10px;
        }

        .event-details p {
        font-size: 16px;
        line-height: 1.6;
        color: #ffffff
        }

        .highlight {
        color: #ffd54f;
        }

        .btn {
        display: inline-block;
        margin-top: 25px;
        padding: 12px 20px;
        background-color: #4caf50;
        color: #000;
        text-decoration: none;
        font-weight: bold;
        border-radius: 30px;
        text-align: center;
        }

        .footer {
        text-align: center;
        margin-top: 40px;
        font-size: 12px;
        color: #aaa;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h1>🎉 Event Unlocked!</h1>
        <p>Greetings, Hero!</p>
        <p>A brand new quest has emerged, and your presence is vital. Here are the sacred scrolls detailing the mission:</p>

        <div class="event-details">
        <p><strong>🏷️ Event:</strong> <span class="highlight">${name}</span></p>
        <p><strong>📅 Date:</strong> <span class="highlight">${date}</span></p>
        <p><strong>📍 Location:</strong> <span class="highlight">${location}</span></p>
        <p><strong>🧭 Objective:</strong> <span class="highlight">${description}</span></p>
        </div>

        <div style="text-align:center;">
        <a href="{{ctaLink}}" class="btn">🚀 Accept the Challenge</a>
        </div>

        <div class="footer">
        Powered by QuestEngine™ | Your legend grows with every mission!
        </div>
    </div>
    </body>
    </html>
    `;
  };

  const updateEmailHtml = (name, description, date, location) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>⚔️ A New Event Awaits You!</title>
    <style>
        body {
        background-color: #121212;
        font-family: 'Segoe UI', sans-serif;
        color: #f0f0f0;
        padding: 20px;
        }

        .container {
        max-width: 600px;
        margin: auto;
        background: #1e1e2e;
        padding: 30px;
        border-radius: 15px;
        border: 2px solid #4caf50;
        box-shadow: 0 0 15px rgba(76, 175, 80, 0.3);
        }

        h1 {
        color: #4caf50;
        text-align: center;
        }

        .event-details {
        margin-top: 20px;
        background: #2a2a3b;
        padding: 20px;
        border-radius: 10px;
        }

        .event-details p {
        font-size: 16px;
        line-height: 1.6;
        color: #ffffff
        }

        .highlight {
        color: #ffd54f;
        }

        .btn {
        display: inline-block;
        margin-top: 25px;
        padding: 12px 20px;
        background-color: #4caf50;
        color: #000;
        text-decoration: none;
        font-weight: bold;
        border-radius: 30px;
        text-align: center;
        }

        .footer {
        text-align: center;
        margin-top: 40px;
        font-size: 12px;
        color: #aaa;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h1>🎉 Event Updated!</h1>
        <p>Greetings, Hero!</p>
        <p>This event was modified but still your presence is vital. Here are the sacred scrolls detailing the mission:</p>

        <div class="event-details">
        <p><strong>🏷️ Event:</strong> <span class="highlight">${name}</span></p>
        <p><strong>📅 Date:</strong> <span class="highlight">${date}</span></p>
        <p><strong>📍 Location:</strong> <span class="highlight">${location}</span></p>
        <p><strong>🧭 Objective:</strong> <span class="highlight">${description}</span></p>
        </div>

        <div style="text-align:center;">
        <a href="{{ctaLink}}" class="btn">🚀 Accept the Challenge</a>
        </div>

        <div class="footer">
        Powered by QuestEngine™ | Your legend grows with every mission!
        </div>
    </div>
    </body>
    </html>
    `;
  };

  const cancelEmailHtml = (name, description, date, location) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>❌ Event Cancelled</title>
      <style>
        body {
          background-color: #1a1a1a;
          font-family: 'Segoe UI', sans-serif;
          color: #f0f0f0;
          padding: 20px;
        }
  
        .container {
          max-width: 600px;
          margin: auto;
          background: #2a2a3b;
          padding: 30px;
          border-radius: 15px;
          border: 2px solid #e53935;
          box-shadow: 0 0 15px rgba(229, 57, 53, 0.3);
        }
  
        h1 {
          color: #e53935;
          text-align: center;
        }
  
        .event-details {
          margin-top: 20px;
          background: #3a3a4f;
          padding: 20px;
          border-radius: 10px;
        }
  
        .event-details p {
          font-size: 16px;
          line-height: 1.6;
          color: #ffffff;
        }
  
        .highlight {
          color: #ffb74d;
        }

        p {
          color: #ffffff;
        }
  
        .footer {
          text-align: center;
          margin-top: 40px;
          font-size: 12px;
          color: #ffffff;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🛑 Quest Cancelled</h1>
        <p>Dear Hero,</p>
        <p>We regret to inform you that the following event has been <strong>cancelled</strong>. While the journey ends here for now, greater quests await you in the future.</p>
  
        <div class="event-details">
          <p><strong>🏷️ Event:</strong> <span class="highlight">${name}</span></p>
          <p><strong>📅 Date:</strong> <span class="highlight">${date}</span></p>
          <p><strong>📍 Location:</strong> <span class="highlight">${location}</span></p>
          <p><strong>🧭 Description:</strong> <span class="highlight">${description}</span></p>
        </div>
  
        <p style="text-align:center; margin-top: 20px;">Stay alert, brave one. New missions will be assigned soon. ⚔️</p>
  
        <div class="footer">
          Powered by QuestEngine™ | Adventures may pause, but the legend continues...
        </div>
      </div>
    </body>
    </html>
    `;
  };
  

const newEventEmail = async (data) => {
    const { name, description, date, location } = data;
    const transporter = createTransporter();
    
    const mailOptions = {
      from: config.EMAIL_USER,
      to: "wintopadedokun@gmail.com",
      subject: `New Event Created`,
      html: createEmailHtml(name, description, date, location),
    };
    
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email enviado: ' + info.response);
      return { success: true, message: 'Correo enviado exitosamente.' };
    } catch (error) {
      console.error('Error al enviar el email:', error);
      return { success: false, error: 'Error al enviar el correo.' };
    }
};

const updateEventEmail = async (data) => {
  const { name, description, date, location } = data;
  const transporter = createTransporter();
  
  const mailOptions = {
    from: config.EMAIL_USER,
    to: "wintopadedokun@gmail.com",
    subject: `New Event Created`,
    html: updateEmailHtml(name, description, date, location),
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: ' + info.response);
    return { success: true, message: 'Correo enviado exitosamente.' };
  } catch (error) {
    console.error('Error al enviar el email:', error);
    return { success: false, error: 'Error al enviar el correo.' };
  }
};

const eventCancelEmail = async (data) => {
  const { eventData } = data;
  const transporter = createTransporter();
  
  const mailOptions = {
    from: config.EMAIL_USER,
    to: "wintopadedokun@gmail.com",
    subject: `New Event Created`,
    html: cancelEmailHtml(eventData.name, eventData.description, eventData.date, eventData.location),
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: ' + info.response);
    return { success: true, message: 'Correo enviado exitosamente.' };
  } catch (error) {
    console.error('Error al enviar el email:', error);
    return { success: false, error: 'Error al enviar el correo.' };
  }
}

export {newEventEmail, updateEventEmail, eventCancelEmail};