import {sendEmail, updateTaskEmail, welcome} from "../services/emailService.js";
import {newEventEmail, updateEventEmail, eventCancelEmail} from "../services/eventEmailService.js";


const sendTaskEmail = async (req, res) => {
    try {
      const result = await sendEmail(req.body);
      
      if (result.success) {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(500).json({ error: result.error });
      }
    } catch (error) {
      console.error('Error en el controlador de email:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const updateEmail = async (req, res) => {
    try {
      const result = await updateTaskEmail(req.body);
      
      if (result.success) {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(500).json({ error: result.error });
      }
    } catch (error) {
      console.error('Error en el controlador de email:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const sendEmailEvent = async (req, res) => {
    try {
      const result = await newEventEmail(req.body);
      
      if (result.success) {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(500).json({ error: result.error });
      }
    } catch (error) {
      console.error('Error en el controlador de email:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const eventUpdateEmail = async (req, res) => {
  try {
    const result = await updateEventEmail(req.body);

    if (result.success) {
      return res.status(200).json({ message: result.message });
    }else{
      return res.status(500).json({error: 'Error interno del servidor.'})
    }
  } catch (error) {
    console.error('Error en el controlador de email:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

const eventCancelled = async (req, res) => {
  try {
    const result = await eventCancelEmail(req.body);

    if (result.success) {
      return res.status(200).json({ message: result.message });
    }else{
      return res.status(500).json({error: 'Error interno del servidor.'})
    }
  } catch (error) {
    console.error('Error en el controlador de email:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

const welcomeEmail = async (req, res) => {
  try {
    const result = await welcome(req.body);

    if (result.success) {
      return res.status(200).json({ message: result.message });
    }else{
      return res.status(500).json({error: 'Error interno del servidor.'})
    }
  } catch (error) {
    console.error('Error en el controlador de email:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

const testRoute = (req, res) => {
    res.send('Servidor de emails funcionando correctamente.');
};

export {sendTaskEmail, testRoute, updateEmail, welcomeEmail, 
sendEmailEvent, eventUpdateEmail, eventCancelled};