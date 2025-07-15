import React, { useState } from 'react';
import './BusinessProfileForm.css';

const BusinessProfileForm = ({ onSubmit, isSubmitted = false }) => {
  const [formData, setFormData] = useState({
    businessType: '',
    county: '',
    employees: '',
    investment: ''
  });

  const exampleData = {
    businessType: 'Technology/Software',
    county: 'Montgomery',
    employees: '11-50',
    investment: '$500K-1M'
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePrefill = () => {
    setFormData(exampleData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = Object.values(formData).every(value => value !== '');

  return (
    <div className="business-profile-form">
      <div className="form-header">
        <h3>Tell us about your business</h3>
        <button className="prefill-btn" onClick={handlePrefill} type="button">
          <span className="icon">auto_fix_high</span>
          <span>Prefill Example</span>
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="businessType">Business Type</label>
          <select
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            required
          >
            <option value="">Select a type...</option>
            <option value="Technology/Software">Technology/Software</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Retail">Retail</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Professional Services">Professional Services</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="county">County</label>
          <select
            id="county"
            name="county"
            value={formData.county}
            onChange={handleChange}
            required
          >
            <option value="">Select a county...</option>
            <option value="Allegany">Allegany</option>
            <option value="Anne Arundel">Anne Arundel</option>
            <option value="Baltimore">Baltimore</option>
            <option value="Baltimore City">Baltimore City</option>
            <option value="Calvert">Calvert</option>
            <option value="Caroline">Caroline</option>
            <option value="Carroll">Carroll</option>
            <option value="Cecil">Cecil</option>
            <option value="Charles">Charles</option>
            <option value="Dorchester">Dorchester</option>
            <option value="Frederick">Frederick</option>
            <option value="Garrett">Garrett</option>
            <option value="Harford">Harford</option>
            <option value="Howard">Howard</option>
            <option value="Kent">Kent</option>
            <option value="Montgomery">Montgomery</option>
            <option value="Prince George's">Prince George's</option>
            <option value="Queen Anne's">Queen Anne's</option>
            <option value="Somerset">Somerset</option>
            <option value="St. Mary's">St. Mary's</option>
            <option value="Talbot">Talbot</option>
            <option value="Washington">Washington</option>
            <option value="Wicomico">Wicomico</option>
            <option value="Worcester">Worcester</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="employees">Number of Employees</label>
          <select
            id="employees"
            name="employees"
            value={formData.employees}
            onChange={handleChange}
            required
          >
            <option value="">Select range...</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="500+">500+</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="investment">Investment Amount</label>
          <select
            id="investment"
            name="investment"
            value={formData.investment}
            onChange={handleChange}
            required
          >
            <option value="">Select range...</option>
            <option value="Under $100K">Under $100K</option>
            <option value="$100K-$500K">$100K-$500K</option>
            <option value="$500K-1M">$500K-1M</option>
            <option value="$1M-$5M">$1M-$5M</option>
            <option value="$5M-$10M">$5M-$10M</option>
            <option value="Over $10M">Over $10M</option>
          </select>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={!isFormValid || isSubmitted}
          >
            <span>{isSubmitted ? 'Processing...' : 'Search Incentives'}</span>
            <span className="icon">{isSubmitted ? 'hourglass_empty' : 'search'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessProfileForm;
