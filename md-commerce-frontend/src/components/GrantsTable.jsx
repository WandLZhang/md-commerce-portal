import React from 'react';
import './GrantsTable.css';

const GrantsTable = ({ grants, onContactClick }) => {
  const grantData = grants || [
    {
      id: 1,
      name: 'Maryland Small Business Innovation Research (SBIR) Grant',
      amount: 'Up to $150,000',
      deadline: 'March 15, 2025',
      eligibility: 'Tech startups with <50 employees',
      link: '#'
    },
    {
      id: 2,
      name: 'Cybersecurity Investment Incentive Tax Credit',
      amount: 'Up to $250,000 tax credit',
      deadline: 'Rolling basis',
      eligibility: 'Companies investing in cybersecurity infrastructure',
      link: '#'
    },
    {
      id: 3,
      name: 'Montgomery County Economic Development Fund',
      amount: '$50,000 - $500,000',
      deadline: 'Quarterly reviews',
      eligibility: 'Businesses creating 10+ jobs in Montgomery County',
      link: '#'
    },
    {
      id: 4,
      name: 'Manufacturing 4.0 Technology Grant',
      amount: 'Up to $100,000',
      deadline: 'April 30, 2025',
      eligibility: 'Manufacturing companies adopting Industry 4.0 tech',
      link: '#'
    },
    {
      id: 5,
      name: 'Workforce Development Training Grant',
      amount: 'Up to $75,000',
      deadline: 'February 28, 2025',
      eligibility: 'Companies with employee training programs',
      link: '#'
    }
  ];

  return (
    <>
      <div className="grants-table-container">
      <div className="table-header">
        <h3>Available Grant Opportunities</h3>
        <div className="ai-insight">
          <span className="icon">auto_awesome</span>
          <span>AI-powered matching found additional relevant opportunities</span>
        </div>
      </div>
      
      <div className="table-wrapper">
        <table className="grants-table">
          <thead>
            <tr>
              <th>Program Name</th>
              <th>Amount</th>
              <th>Deadline</th>
              <th>Eligibility</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {grantData.map((grant) => (
              <tr key={grant.id}>
                <td className="grant-name">
                  {grant.name}
                </td>
                <td>{grant.amount}</td>
                <td>{grant.deadline}</td>
                <td>{grant.eligibility}</td>
                <td>
                  <a href={grant.link} className="view-link">
                    View Details
                    <span className="icon">arrow_forward</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      </div>
      
      <div className="action-chips-container">
        <button className="action-chip" onClick={onContactClick}>
          <span className="icon">contact_support</span>
          <span>Who should I contact?</span>
        </button>
        <button className="action-chip">
          <span className="icon">description</span>
          <span>Help with applications</span>
        </button>
        <button className="action-chip">
          <span className="icon">calendar_today</span>
          <span>Schedule consultation</span>
        </button>
      </div>
    </>
  );
};

export default GrantsTable;
