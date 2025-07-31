import "./App.css";

function App() {
  return (
    <div className="screen">
      {/* Top Section */}
      <div className="top-bar">
        <div className="logo-box">Gov Logo</div>
        <div className="circle-buttons">
          <div className="circle">About</div>
          <div className="circle">Developer</div>
          <div className="circle">User</div>
        </div>
      </div>

      {/* Search + Nav in One Line */}
      <div className="search-nav">
        <input className="search-bar" placeholder="Search..." />
        <button>Outstanding Due</button>
        <button>Rewards</button>
        <button>Fines</button>
      </div>

      {/* News Slider */}
      <div className="news-slider">
        <p>
          Latest Government Updates: New schemes launched | Tax filing deadline
          extended | New traffic rules implemented | Subsidies for rural
          farmers...
        </p>
      </div>
    </div>
  );
}

export default App;
