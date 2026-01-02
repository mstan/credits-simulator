import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Credits Simulator</h1>
        <p className="home-subtitle">Choose your credits style</p>

        <div className="style-options">
          <Link
            to="/director"
            className="style-card"
          >
            <div className="style-icon">🎬</div>
            <h2>Director Style</h2>
            <p>One name at a time with smooth transitions</p>
          </Link>

          <Link
            to="/scrolling"
            className="style-card"
          >
            <div className="style-icon">📜</div>
            <h2>Scrolling Style</h2>
            <p>Traditional bottom-to-top scrolling credits</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
