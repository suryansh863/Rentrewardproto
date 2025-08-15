const express = require('express');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/User');
const { sequelize } = require('../config/database');
const { sendVerificationEmail } = require('../services/emailService');
const router = express.Router();

// Input validation middleware
const validateAuthInput = (req, res, next) => {
  try {
    const { email, phone_number, password } = req.body;
    
    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 8 characters long'
      });
    }

    if (!email && !phone_number) {
      return res.status(400).json({
        success: false,
        error: 'Either email or phone number is required'
      });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Validation error'
    });
  }
};

// Signup route
router.post('/signup', validateAuthInput, async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { email, phone_number, password, display_name, user_type } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email: email?.toLowerCase() },
          { phone_number }
        ]
      },
      transaction: t
    });

    if (existingUser) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email or phone number'
      });
    }

    // Create new user
    const user = await User.create({
      email: email?.toLowerCase(),
      phone_number,
      password,
      display_name,
      user_type,
      is_verified: !email // Auto-verify if using phone number
    }, { transaction: t });

    // Generate verification token if email is provided
    if (email) {
      const verificationToken = user.generateVerificationToken();
      await user.save({ transaction: t });

      try {
        await sendVerificationEmail(email, verificationToken);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        await t.rollback();
        return res.status(500).json({
          success: false,
          error: 'Failed to send verification email'
        });
      }
    }

    await t.commit();

    res.status(201).json({
      success: true,
      message: email
        ? 'Signup successful. Please check your email for verification.'
        : 'Signup successful.',
      data: {
        userId: user.id,
        isVerified: user.is_verified
      }
    });
  } catch (error) {
    await t.rollback();
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      error: 'Error creating account. Please try again.'
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields'
      });
    }

    // Find user by email or phone
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: identifier?.toLowerCase() },
          { phone_number: identifier }
        ]
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        userType: user.user_type,
        isVerified: user.is_verified
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      data: {
        token,
        userId: user.id,
        userType: user.user_type,
        isVerified: user.is_verified,
        displayName: user.display_name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed. Please try again.'
    });
  }
});

// Email verification route
router.get('/verify/:token', async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { token } = req.params;

    const user = await User.findOne({
      where: {
        verification_token: token,
        verification_token_expires: {
          [Op.gt]: new Date()
        }
      },
      transaction: t
    });

    if (!user) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired verification token'
      });
    }

    user.is_verified = true;
    user.verification_token = null;
    user.verification_token_expires = null;
    await user.save({ transaction: t });

    await t.commit();

    res.json({
      success: true,
      message: 'Email verified successfully',
      data: {
        userId: user.id
      }
    });
  } catch (error) {
    await t.rollback();
    console.error('Verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Error during email verification'
    });
  }
});

// Resend verification email
router.post('/resend-verification', async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    const user = await User.findOne({
      where: { email: email.toLowerCase() },
      transaction: t
    });

    if (!user) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    if (user.is_verified) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        error: 'Email is already verified'
      });
    }

    const verificationToken = user.generateVerificationToken();
    await user.save({ transaction: t });

    try {
      await sendVerificationEmail(email, verificationToken);
      await t.commit();
      
      res.json({
        success: true,
        message: 'Verification email sent successfully'
      });
    } catch (emailError) {
      await t.rollback();
      console.error('Email sending failed:', emailError);
      res.status(500).json({
        success: false,
        error: 'Failed to send verification email'
      });
    }
  } catch (error) {
    await t.rollback();
    console.error('Resend verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Error sending verification email'
    });
  }
});

module.exports = router;