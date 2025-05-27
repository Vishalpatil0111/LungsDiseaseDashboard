import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { FaHeartbeat, FaLungs, FaTachometerAlt, FaMicroscope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
const InfoCard = ({ icon, label, value, color }) => (
  <div className={`flex items-center bg-${color}-900 text-${color}-200 rounded-2xl p-4 shadow w-full`}>
    <div className="text-3xl mr-4">{icon}</div>
    <div>
      <p className="text-sm uppercase tracking-wider">{label}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  </div>
);

function Dashboard() {
  const navigate = useNavigate()
  const [data, setData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/latest-prediction")
      .then(res => {
        setData(res.data);

        // Now get rule-based recommendations
        return axios.post("http://127.0.0.1:5000/recommendations", {
          shap_values: res.data.shap_values,
          risk_level: res.data.risk_level
        });
      })
      .then(recRes => setRecommendations(recRes.data.recommendations))
      .catch(err => console.error("Dashboard error:", err));
  }, []);

  if (!data) return <div className="text-white p-8">Loading...</div>;

  const { prediction, probability, risk_level, shap_values, name } = data;

  const shapChartData = Object.entries(shap_values).map(([feature, value]) => ({
    feature,
    value,
  }));

  const pieData = [
    { name: 'No Disease', value: 1 - probability },
    { name: 'Disease', value: probability },
  ];

  const pieColors = ['#4bc0c0', '#ff6384'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6 space-y-8">
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold mb-4"
      >
        Home
      </button>

      {/* Top Summary */}
      <div className="grid md:grid-cols-4 gap-4">
        <InfoCard icon={<FaLungs />} label="Prediction" value={prediction === 1 ? 'Positive' : 'Negative'} color="red" />
        <InfoCard icon={<FaTachometerAlt />} label="Probability" value={`${(probability * 100).toFixed(1)}%`} color="yellow" />
        <InfoCard icon={<FaHeartbeat />} label="Risk Level" value={risk_level.toUpperCase()} color={risk_level === 'high' ? 'red' : risk_level === 'medium' ? 'yellow' : 'green'} />
        <InfoCard icon={<FaMicroscope />} label="User" value={name} color="blue" />
      </div>

      {/* Main Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Vertical SHAP Bar Chart */}
        <div className="bg-zinc-900 rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-orange-400 mb-4">📊 SHAP Feature Impact (Bar)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={shapChartData} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 10 }}>
              <XAxis type="number" />
              <YAxis dataKey="feature" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="value" fill="#ff6384" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-zinc-900 rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-orange-400 mb-4">🍩 Prediction Probability</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart instead of Radar */}
        <div className="md:col-span-2 bg-zinc-900 rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-orange-400 mb-4">📈 SHAP Feature Trend (Line)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={shapChartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="feature" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#facc15" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Horizontal SHAP Contribution Chart */}
        <div className="md:col-span-1 bg-zinc-900 rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-orange-400 mb-4">🧮 SHAP Contributions (Sorted)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[...shapChartData].sort((a, b) => b.value - a.value)} layout="horizontal">
              <XAxis type="category" dataKey="feature" />
              <YAxis type="number" />
              <Tooltip />
              <Bar dataKey="value" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cumulative SHAP Contribution */}
        <div className="md:col-span-1 bg-zinc-900 rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-orange-400 mb-4">📊 Cumulative Contribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={shapChartData.map((item, idx, arr) => ({
                ...item,
                cumulative: arr.slice(0, idx + 1).reduce((sum, x) => sum + x.value, 0),
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="feature" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cumulative" stroke="#34d399" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="bg-zinc-900 rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold text-orange-400 mb-3">💡 Recommendations</h2>
        <ul className="list-disc pl-5 text-sm space-y-1">
          {recommendations.length > 0 ? (
            recommendations.map((rec, index) => <li key={index}>{rec}</li>)
          ) : (
            <li>Loading recommendations...</li>
          )}
        </ul>
      </div>

    </div>
  );
}

export default Dashboard;
