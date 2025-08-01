
// AddUser page: form to add a new user to the dashboard
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import type { User } from '../types/User';
import { isEmail } from '../utils/validators';
import { useNavigate } from 'react-router-dom';


// Fields for the add user form
interface FormData {
  name: string;
  email: string;
  phone: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  companyName: string;
}

// Maps field names to error messages
interface FormErrors {
  [key: string]: string;
}


const AddUser: React.FC = () => {
  // Access dispatch and state from user context
  const { dispatch, state } = useContext(UserContext);
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    companyName: '',
  });

  // State for form errors and submission
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Validate form fields
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!isEmail(formData.email)) newErrors.email = 'Invalid email format';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    // Build new user object from form data
    const newUser: User = {
      id: state.users.length > 0 ? Math.max(...state.users.map((u) => u.id)) + 1 : 1,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: {
        street: formData.street.trim(),
        suite: formData.suite.trim(),
        city: formData.city.trim(),
        zipcode: formData.zipcode.trim(),
      },
      company: {
        name: formData.companyName.trim(),
        catchPhrase: '',
        bs: '',
      },
    };

    // Dispatch action to add user and redirect
    dispatch({ type: 'ADD_USER', payload: newUser });
    setSubmitting(false);
    navigate('/'); // Redirect to user list
  };

  // Render the add user form
  return (
    <div className="p-4 max-w-lg mx-auto" role="main" aria-label="Add User Page">
      <h1 className="text-3xl font-bold mb-6" tabIndex={0} aria-label="Add New User Heading">Add New User</h1>
      <form onSubmit={handleSubmit} noValidate aria-label="Add User Form" autoComplete="off">
        {/* Name field */}
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-1">
            Name *
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`block w-full px-3 py-2 border rounded ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            autoComplete="name"
          />
          {errors.name && (
            <p id="name-error" className="text-red-600 mt-1 text-sm" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email field */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`block w-full px-3 py-2 border rounded ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <p id="email-error" className="text-red-600 mt-1 text-sm" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        
        {/* Phone field */}
        <div className="mb-4">
          <label htmlFor="phone" className="block font-semibold mb-1">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded"
            autoComplete="tel"
          />
        </div>

        {/* Address fields */}
        <fieldset className="mb-4 border border-gray-300 rounded p-3" aria-label="Address Fields">
          <legend className="font-semibold px-2">Address</legend>
          <input
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            className="block w-full mb-2 px-3 py-2 border border-gray-300 rounded"
            aria-label="Street"
            autoComplete="address-line1"
          />
          <input
            name="suite"
            placeholder="Suite"
            value={formData.suite}
            onChange={handleChange}
            className="block w-full mb-2 px-3 py-2 border border-gray-300 rounded"
            aria-label="Suite"
            autoComplete="address-line2"
          />
          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="block w-full mb-2 px-3 py-2 border border-gray-300 rounded"
            aria-label="City"
            autoComplete="address-level2"
          />
          <input
            name="zipcode"
            placeholder="Zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            className="block w-full mb-2 px-3 py-2 border border-gray-300 rounded"
            aria-label="Zipcode"
            autoComplete="postal-code"
          />
        </fieldset>

        {/* Company name field */}
        <div className="mb-4">
          <label htmlFor="companyName" className="block font-semibold mb-1">
            Company Name
          </label>
          <input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded"
            aria-label="Company Name"
            autoComplete="organization"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          aria-busy={submitting}
        >
          {submitting ? 'Adding...' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
