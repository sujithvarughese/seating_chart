import { useState, useEffect } from 'react'
import './App.css'
import seatingData from './assets/seatingchart.json'

interface Guest {
  name: string;
  table: number | string | null;
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

  const formatTableDisplay = (table: number | string | null): string => {
    if (table === null) {
      return 'Not Assigned'
    }
    return table.toString()
  }

  return (
    <div className="seating-chart">
      <header>
        <h1>Wedding Seating Chart</h1>
        <p>Find your perfect seat for our special day</p>
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
                  <td>{formatTableDisplay(guest.table)}</td>
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
