// import React, { Component } from "react";
// import "./App.css";
// import data from "./constant";
// import BarChart from "./BarChart";

// class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {

//     return ( 
//       <React.Fragment>
//         <BarChart
//           width={800}
//           height={450}
//           data={
//             data.USData
//           }
//           yAxisTitle={`Rating`}
//         />

//       </React.Fragment>
//     );
//   }
// }

// export default App;

import "./App.css";
import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import BarChart2 from "./BarChart2";

function App() {
  const url = "https://localhost:7277/api/player/GetBatsmanRating";
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))
  }

  const url2 = "https://localhost:7277/api/player/GetBowlerWicket";
  const [data2, setData2] = useState([]);

  const fetchInfo2 = () => {
    return fetch(url2)
      .then((res) => res.json())
      .then((d) => setData2(d))
  }


  useEffect(() => {
    fetchInfo();
    fetchInfo2();
  }, []);

  return (
    <React.Fragment>
      <BarChart
        width={800}
        height={450}
        data={
          data
        }
        yAxisTitle={`Rating`}
      />
      <br></br>
      <br></br>
      <BarChart2
        width={800}
        height={450}
        data={
          data2
        }
        yAxisTitle={`Number Of Wickets`}
      />
    </React.Fragment>

  );

}

export default App;
