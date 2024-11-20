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
           <div class="row margin-md">
            {list1.map((item, index) => (
            <div class="card col-lg-4 col-md-12" key={index}>
            <img class="card-img-top" src={item.image} alt="Card image cap"/>
            <div class="card-body">
              <h5 class="card-title">{item.title}</h5>
              <a class="card-text" href={item.url}  target="_blank">{item.url}</a>
              <p class="card-text"><small class="text-muted">{item.vote} votes</small></p>
            </div>
          </div>
            ))}
          </div>

        )}
        </div>
</div>
  );
};

export default App;

