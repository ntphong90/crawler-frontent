import React, { useState } from "react";
import reportWebVitals from './reportWebVitals';

const App = () => {
  // States for managing loaders
  const [isLoading, setLoading] = useState(false);

  const [list1, setList1] = useState([]);
  const [dropdown1, setDropdown1] = useState("https://vnexpress.net");
  const [dropdown2, setDropdown2] = useState("10");
  const [dropdown3, setDropdown3] = useState("1");
  const fetchListData = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/ranking?url=${dropdown1}&limit=${dropdown2}&dateRange=${dropdown3}`;
    
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

        <select
          value={dropdown3}
          onChange={(e) => setDropdown3(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <option value="">Select Option</option>
          <option value="1">Today</option>
          <option value="7">Last 7 days</option>
        </select>

        {isLoading && <p><img src="/circles.svg"/></p>}
        {(
           <div className="row margin-md">
            {list1.map((item, index) => (
            <div className="card col-lg-4 col-md-12" key={index}>
            <img className="card-img-top" src={item.image} alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <a className="card-text" href={item.url}  target="_blank">{item.url}</a>
              <p className="card-text"><small className="text-muted">{item.vote} votes</small></p>
            </div>
          </div>
            ))}
          </div>

        )}
        </div>
</div>
  );
};
reportWebVitals((metric) => {
  console.log(metric); // Log each Web Vital metric, including LCP and INP
  fetch(`${process.env.REACT_APP_API_URL}/webvital`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: metric.name,
      value: metric.value,
      delta: metric.delta,
      id: metric.id,
      timestamp: new Date().toISOString(),
    }),
  }).catch((err) => console.error('Failed to send metric', err));
});
export default App;

