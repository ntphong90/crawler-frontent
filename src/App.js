import React, { useState } from "react";

const App = () => {
  // States for managing loaders
  const [isLoading, setLoading] = useState(false);

  const [list1, setList1] = useState([]);
  const [dropdown1, setDropdown1] = useState("https://vnexpress.net");
  const [dropdown2, setDropdown2] = useState("10");
  const fetchListData = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/ranking?url=${dropdown1}&limit=${dropdown2}`;
    
    // Simulate an API call
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  };

  const handleToggleList = async () => {
    setLoading(true);
    setList1([]);
    const data = await fetchListData();
    setList1(data);
    setLoading(false);
  };



  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>News Ranking</h1>
      
      {/* List 1 */}
      <div>
        <button
          onClick={handleToggleList}
          disabled={isLoading}
        >
          Get data
        </button>
        <select
          value={dropdown1}
          onChange={(e) => setDropdown1(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <option value="">Select Option</option>
          <option value="https://vnexpress.net">vnexpress.net</option>
          <option value="https://tuoitre.vn">tuoitre.vn</option>
        </select>
        <select
          value={dropdown2}
          onChange={(e) => setDropdown2(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <option value="">Select Option</option>
          <option value="10">10 items</option>
          <option value="20">20 items</option>
        </select>

        {isLoading && <p><img src="/circles.svg" onerror="this.src='your.png'"/></p>}
        {(
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {list1.map((item, index) => (
              <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                marginBottom: "8px",
                backgroundColor: "#f8f9fa",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                <strong>{item.title}</strong>
              </a>
              <span style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
              }}>{item.vote} Votes</span>
            </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;

