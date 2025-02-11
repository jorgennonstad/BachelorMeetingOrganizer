import React from 'react';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1 className="title">Welcome to Your Meeting & Todo Tracker!</h1>
        <p className="description">
          This website is designed for you and your bachelor group to keep track of meeting logs and to-do lists,
          organized by categories. Whether you're tracking meetings or managing tasks, we’ve got you covered!
        </p>
        <div className="cta">
          <button className="cta-button">Start Organizing Now</button>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="features-title">Key Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <h3>Meeting Logs</h3>
            <p>
              Keep track of all your meetings and add important notes, documents, and action points to stay organized.
            </p>
          </div>
          <div className="feature-card">
            <h3>Task Management</h3>
            <p>
              Organize your tasks by categories, and easily track your progress as you mark them as complete.
            </p>
          </div>
          <div className="feature-card">
            <h3>Category Organization</h3>
            <p>
              Group tasks and meetings by categories to ensure everything is organized and easy to access.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>Created with ❤️ by Your Bachelor Group</p>
      </div>
    </div>
  );
};

export default HomePage;
