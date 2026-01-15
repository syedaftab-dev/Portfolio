// React hook for managing component state
import React, { useState } from 'react'

// EmailJS SDK for sending emails directly from frontend
import emailjs from "@emailjs/browser"

// Toast notifications for success/error messages
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'

const ContactFrom = () => {

  /**
   * formData holds values of all input fields
   * This makes the form a CONTROLLED FORM
   */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  /**
   * errors object stores validation errors
   * Example:
   * { name: "Name is required", email: "Invalid email" }
   */
  const [errors, setErrors] = useState({})

  /**
   * isSending is used to:
   * - disable submit button
   * - show "sending..." text
   */
  const [isSending, setIsSending] = useState(false)

  /**
   * Runs whenever user types in any input/textarea
   * Uses name attribute to update correct field
   */
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,   // keep old values
      [name]: value  // update only changed field
    })
  }

  /**
   * Validates form data before submission
   * Returns an object of errors
   */
  const validate = () => {
    let errors = {}

    // Name validation
    if (!formData.name) {
      errors.name = "Name is required"
    }

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required"
    }
    // Basic email regex check
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }

    // Message validation
    if (!formData.message) {
      errors.message = "message is required"
    }

    return errors
  }

  /**
   * Handles form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault() // stop page refresh

    // Validate form
    const validationErrors = validate()

    // If validation errors exist
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } 
    // If form is valid
    else {
      setErrors({})
      setIsSending(true) // disable button + show loader

      /**
       * Send email using EmailJS
       * formData keys must match template variables
       */
      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,     // EmailJS service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,    // EmailJS template ID
        formData,              // data sent to email template
        import.meta.env.VITE_EMAILJS_ACCOUNT_PUBLIC_KEY   // public key
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text)

        // Success toast
        toast.success("Message send successfull")

        // Reset form fields
        setFormData({
          name: "",
          email: "",
          message: ""
        })
      })
      .catch((error) => {
        console.log("FAILED...", error)

        // Error toast
        toast.error("Failed to send message. Please try again later")
      })
      .finally(() => {
        // Re-enable button
        setIsSending(false)
      })
    }
  }

  return (
    // Wrapper container with id used for navbar scrolling
    <div className="mx-auto max-w-3xl p-4" id="contact">

      {/* Required once for toast notifications */}
      <Toaster />

      <h2 className="my-8 text-center tex-4xl font-semibold tracking-tighter">
        Let's Connect
      </h2>

      {/* Form submission handled by React */}
      <motion.form 
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      transition={{duration:0.8}}
      onSubmit={handleSubmit}>

        {/* NAME FIELD */}
        <div className="mb-4">
          <input
            type="text"
            id="name"
            name="name"                // must match formData key
            value={formData.name}      // controlled input
            placeholder="Name"
            onChange={handleChange}
            className="mb-8 w-full appearance-none rounded-lg border border-gray-900 bg-transparent px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
          />

          {/* Show error only if it exists */}
          {errors.name && (
            <motion.p 
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            arial-live="polite"
            className="text-sm text-pink-700">{errors.name}</motion.p>
          )}
        </div>

        {/* EMAIL FIELD */}
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="mb-8 w-full appearance-none rounded-lg border border-gray-900 bg-transparent px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
          />

          {errors.email && (
            <motion.p 
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            arial-live="polite"
            className="text-sm text-pink-700">{errors.email}</motion.p>
          )}
        </div>

        {/* MESSAGE FIELD */}
        <div className="mb-4">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            placeholder="Message"
            onChange={handleChange}
            rows="4"
            className="mb-8 w-full appearance-none rounded-lg border border-gray-900 bg-transparent px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
          />

          {errors.message && (
            <motion.p 
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            arial-live="polite"
            className="text-sm text-pink-700">{errors.message}</motion.p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSending}
          className={`mb-8 w-full rounded bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-yellow-500 
          ${isSending ? "cursor-not-allowed opacity-50" : ""}`}
        >
          {isSending ? "sending..." : "Send"}
        </button>
      </motion.form>
    </div>
  )
}

export default ContactFrom
