import { createTransporter, config } from '../config/dbconfig.js';

// const updateEmailHtml = (title, description, deadline, trait, points) => {
//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>🎮 Quest Updated!</title>
//         <style>
//           body {
//             margin: 0;
//             padding: 0;
//             background: #1e1e2f;
//             font-family: 'Trebuchet MS', sans-serif;
//             color: #ffffff;
//           }
  
//           .container {
//             max-width: 600px;
//             margin: 40px auto;
//             background: #29293d;
//             border: 2px solid #4CAF50;
//             border-radius: 10px;
//             padding: 30px;
//             box-shadow: 0 0 10px rgba(76, 175, 80, 0.4);
//           }
  
//           h2 {
//             text-align: center;
//             color: #4CAF50;
//             margin-bottom: 30px;
//             font-size: 26px;
//           }
  
//           .task-info p {
//             font-size: 16px;
//             margin: 12px 0;
//             line-height: 1.6;
//             background: #3a3a5c;
//             padding: 10px 15px;
//             border-radius: 8px;
//             border-left: 5px solid #4CAF50;
//             color: #ffffff
//           }
  
//           .task-info strong {
//             color: #fdd835;
//           }
  
//           .badge {
//             display: inline-block;
//             padding: 10px 15px;
//             background: #4CAF50;
//             color: #000;
//             font-weight: bold;
//             border-radius: 20px;
//             margin-top: 20px;
//           }
  
//           .footer {
//             text-align: center;
//             margin-top: 40px;
//             font-size: 12px;
//             color: #bbb;
//           }
  
//           @media (max-width: 600px) {
//             .container {
//               margin: 20px;
//               padding: 20px;
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <h2>🛡️ New Quest Unlocked!</h2>
//           <div class="task-info">
//             <p><strong>📝 Title:</strong> ${title}</p>
//             <p><strong>📖 Description:</strong> ${description}</p>
//             <p><strong>⏰ Deadline:</strong> ${deadline}</p>
//             <p><strong>💡 Trait Required:</strong> ${trait}</p>
//             <p><strong>🏆 XP Points:</strong> ${points}</p>
//           </div>
//           <div style="text-align:center;">
//             <span class="badge">🎯 Accept Quest</span>
//           </div>
//           <div class="footer">
//             Powered by TaskPlanner Guild ✨ | Complete your quests and level up!
//           </div>
//         </div>
//       </body>
//       </html>
//     `;
//   };

// const updateEmail = async (data) => {
//     const { title, description, deadline, trait, points } = data;
//     const transporter = createTransporter();
    
//     const mailOptions = {
//       from: config.EMAIL_USER,
//       to: "wintopadedokun@gmail.com",
//       subject: `Updated Task`,
//       html: updateEmailHtml(title, description, deadline, trait, points),
//     };
    
//     try {
//       const info = await transporter.sendMail(mailOptions);
//       console.log('Email enviado: ' + info.response);
//       return { success: true, message: 'Correo enviado exitosamente.' };
//     } catch (error) {
//       console.error('Error al enviar el email:', error);
//       return { success: false, error: 'Error al enviar el correo.' };
//     }
// };

export default updateEmail;