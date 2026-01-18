import { useState, useEffect } from 'react'
import './App.css'
import seatingData from './assets/seatingchart.json'

interface Guest {
  name: string;
  table: number;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>(seatingData)

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredGuests(seatingData)
    } else {
      const filtered = seatingData.filter((guest: Guest) =>
        guest.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredGuests(filtered)
    }
  }, [searchTerm])

  return (
    <div className="seating-chart">
      <header>
        <h1>Wedding Seating Chart</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a guest..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      <main>
        <div className="results-info">
          {filteredGuests.length === seatingData.length ? (
            <p>Showing all {seatingData.length} guests</p>
          ) : (
            <p>Found {filteredGuests.length} guest{filteredGuests.length !== 1 ? 's' : ''} matching "{searchTerm}"</p>
          )}
        </div>

        {filteredGuests.length > 0 ? (
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
                  <td>{guest.name}</td>
                  <td>{guest.table}</td>
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
  )
}

export default App
