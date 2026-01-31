import { useState, useEffect } from "react";
import "./App.css";

interface Guest {
  firstName: string;
  lastName: string;
  tableNum: number | string | null;
}

function getFullName(guest: Guest): string {
  return `${guest.firstName} ${guest.lastName}`.trim();
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/seatingChart.json")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load seating chart");
        return res.json();
      })
      .then((data: Guest[]) => {
        setGuests(data);
        setFilteredGuests(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredGuests(guests);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = guests.filter((guest: Guest) =>
        getFullName(guest).toLowerCase().includes(term),
      );
      setFilteredGuests(filtered);
    }
  }, [searchTerm, guests]);

  const formatTableDisplay = (tableNum: number | string | null): string => {
    if (tableNum === null) {
      return "Not Assigned";
    }
    return tableNum.toString();
  };

  return (
    <div className="seating-chart">
      <div className="banner">
        <img src="/banner.jpeg" alt="Shaina & Justin" />
      </div>
      <header>
        <h1>Wedding Seating Chart</h1>
        <p>Find your perfect seat for our special day</p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a guest..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      <main>
        {loading ? (
          <div className="no-results">
            <p>Loading seating chart...</p>
          </div>
        ) : error ? (
          <div className="no-results">
            <p>{error}</p>
          </div>
        ) : filteredGuests.length > 0 ? (
          <table className="seating-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Table Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map((guest: Guest, index: number) => (
                <tr key={index}>
                  <td>{getFullName(guest)}</td>
                  <td>{formatTableDisplay(guest.tableNum)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-results">
            <p>No guests found matching "{searchTerm}"</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
