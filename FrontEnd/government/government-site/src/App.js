import "./App.css";

function App() {
  return (
    <div className="screen">
      {/* Top Section */}
      <div className="top-bar">
        <div className="logo-box">Gov Logo</div>
        <div className="circle-buttons">
          <div className="circle">Gov</div>
          <div className="circle">Dev</div>
          <div className="circle">User</div>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <input className="search-bar" placeholder="Search..." />
        <div className="nav-buttons">
          <button>Outstanding Due</button>
          <button>Rewards</button>
          <button>Fines</button>
        </div>
      </div>

      {/* News Slider */}
      <div className="news-slider">
        <p>Government News & Updates will appear here...</p>
      </div>
    </div>
  );
}

export default App;
