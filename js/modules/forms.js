// Form Module
import { debounce } from '../utils/helpers.js';

class Forms {
    constructor() {
        this.contactForm = document.querySelector('.contact-form');
        this.formInputs = document.querySelectorAll('.form-input, .form-textarea');
        this.submitButton = document.querySelector('.contact-form .btn-primary');
        
        this.isSubmitting = false;
        
        this.init();
    }

    init() {
        if (!this.contactForm) return;
        
        this.bindEvents();
        this.initValidation();
    }

    bindEvents() {
        // Form submission
        this.contactForm.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Real-time validation
        this.formInputs.forEach(input => {
            input.addEventListener('blur', this.validateField.bind(this));
            input.addEventListener('input', debounce(this.validateField.bind(this), 300));
        });

        // Enhanced UX
        this.formInputs.forEach(input => {
            input.addEventListener('focus', this.handleInputFocus.bind(this));
            input.addEventListener('blur', this.handleInputBlur.bind(this));
        });
    }

    initValidation() {
        // Add custom validation styles
        this.formInputs.forEach(input => {
            input.addEventListener('invalid', this.handleInvalid.bind(this));
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;
        
        // Validate all fields
        const isValid = this.validateForm();
        if (!isValid) {
            this.showFormError('Please fix the errors above and try again.');
            return;
        }
        
        this.isSubmitting = true;
        this.setSubmittingState(true);
        
        try {
            const formData = this.getFormData();
            await this.submitForm(formData);
            this.showFormSuccess('Thank you! Your message has been sent successfully.');
            this.resetForm();
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormError('Sorry, there was an error sending your message. Please try again.');
        } finally {
            this.isSubmitting = false;
            this.setSubmittingState(false);
        }
    }

    validateForm() {
        let isValid = true;
        
        this.formInputs.forEach(input => {
            if (!this.validateField({ target: input })) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(e) {
        const input = e.target;
        const value = input.value.trim();
        const fieldName = input.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(input);

        // Required field validation
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(input)} is required.`;
        }

        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }

        // Name validation (basic)
        if ((fieldName === 'firstName' || fieldName === 'lastName') && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long.';
            }
        }

        // Message validation
        if (fieldName === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long.';
            }
        }

        if (!isValid) {
            this.showFieldError(input, errorMessage);
        } else {
            this.showFieldSuccess(input);
        }

        return isValid;
    }

    getFieldLabel(input) {
        const label = document.querySelector(`label[for="${input.id}"]`);
        return label ? label.textContent.replace('*', '').trim() : input.name;
    }

    showFieldError(input, message) {
        input.classList.add('error');
        input.classList.remove('success');
        
        let errorElement = input.parentNode.querySelector('.form-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            input.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        
        // Accessibility
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', errorElement.id = `error-${input.id}`);
    }

    showFieldSuccess(input) {
        input.classList.remove('error');
        input.classList.add('success');
        this.clearFieldError(input);
        
        // Accessibility
        input.setAttribute('aria-invalid', 'false');
        input.removeAttribute('aria-describedby');
    }

    clearFieldError(input) {
        const errorElement = input.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
        
        input.classList.remove('error');
    }

    handleInputFocus(e) {
        const input = e.target;
        input.parentNode.classList.add('focused');
    }

    handleInputBlur(e) {
        const input = e.target;
        input.parentNode.classList.remove('focused');
        
        if (!input.value.trim()) {
            input.parentNode.classList.remove('filled');
        } else {
            input.parentNode.classList.add('filled');
        }
    }

    handleInvalid(e) {
        e.preventDefault(); // Prevent default browser validation messages
    }

    getFormData() {
        const formData = new FormData(this.contactForm);
        return Object.fromEntries(formData.entries());
    }

    async submitForm(formData) {
        // For now, simulate form submission
        // In production, this would POST to your backend
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Example implementation:
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(formData)
        // });
        // 
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        // 
        // return response.json();
        
        console.log('Form submitted:', formData);
    }

    setSubmittingState(isSubmitting) {
        if (isSubmitting) {
            this.submitButton.classList.add('btn-loading');
            this.submitButton.disabled = true;
            this.submitButton.textContent = 'Sending...';
        } else {
            this.submitButton.classList.remove('btn-loading');
            this.submitButton.disabled = false;
            this.submitButton.textContent = 'Send';
        }
    }

    showFormSuccess(message) {
        this.showFormMessage(message, 'success');
    }

    showFormError(message) {
        this.showFormMessage(message, 'error');
    }

    showFormMessage(message, type) {
        // Remove existing messages
        const existingMessage = this.contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-${type}`;
        messageElement.textContent = message;
        
        this.contactForm.insertBefore(messageElement, this.contactForm.firstChild);
        
        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 5000);
        }
    }

    resetForm() {
        this.contactForm.reset();
        
        // Clear all validation states
        this.formInputs.forEach(input => {
            input.classList.remove('error', 'success');
            input.parentNode.classList.remove('focused', 'filled');
            this.clearFieldError(input);
        });
    }
}

export default Forms;