import Contact from "../models/ContactModel.js";
import sendEmail from "../utils/sendEmail.js";
import {
  isValidName,
  isValidEmail,
  isValidPhone,
} from "../utils/validators.js";

export const createContact = async (req, res) => {
  try {
    const {
      source = "Contact",
      name,
      company,
      email,
      phone,
      quantity,
      occasion,
      message,
    } = req.body;

    // Validate inputs
    if (!isValidName(name || "")) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid name.",
      });
    }

    if (!isValidEmail(email || "")) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email.",
      });
    }

    if (!isValidPhone(phone || "")) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number.",
      });
    }

    if (!message || message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Please enter your message.",
      });
    }

    // Save to MongoDB
    const contact = await Contact.create({
      source,
      name,
      company,
      email,
      phone,
      quantity,
      occasion,
      message,
    });

    // Send email
    await sendEmail({
      source,
      name,
      company,
      email,
      phone,
      quantity,
      occasion,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Your inquiry has been submitted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};