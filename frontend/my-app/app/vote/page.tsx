"use client";
import { useState } from "react";

export default function VotePage() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [topPlayers, setTopPlayers] = useState<string[]>([]); // To hold the top 10 players

  const sports = ["Soccer", "Basketball", "Tennis", "Baseball"];
  const players: Record<string, string[]> = {
    Basketball: Array.from({ length: 100 }, (_, i) => `Basketball Player ${i + 1}`),
    Soccer: Array.from({ length: 100 }, (_, i) => `Soccer Player ${i + 1}`),
    Tennis: Array.from({ length: 100 }, (_, i) => `Tennis Player ${i + 1}`),
    Baseball: Array.from({ length: 100 }, (_, i) => `Baseball Player ${i + 1}`),
  };

  const handleDragStart = (event: React.DragEvent, player: string) => {
    event.dataTransfer.setData("player", player); // Store the player data in drag event
  };

  const handleDrop = (event: React.DragEvent) => {
    const player = event.dataTransfer.getData("player"); // Retrieve the player data
    if (topPlayers.length < 10 && !topPlayers.includes(player)) {
      setTopPlayers([...topPlayers, player]);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault(); // Allow the drop
  };

  // Handle deletion of players from top 10 list
  const handleDelete = (playerToDelete: string) => {
    setTopPlayers(topPlayers.filter((player) => player !== playerToDelete));
  };

  return (
    <div className="vote-page">
      {/* Left side: Top Players List */}
      <div
        className="left-side"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h2 className="top-players-header">Top 10 Players</h2>
        <div className="top-players-list">
          {topPlayers.length === 0 ? (
            <p>No players selected yet. Drag and drop players here!</p>
          ) : (
            topPlayers.map((player, index) => (
              <div key={index} className="top-player-item">
                <span>{index + 1}. {player}</span>
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(player)}
                  className="delete-button"
                >
                🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right side: Sports Selection */}
      <div className="right-side">
        <div className="header">
          <h1>Select a Sport</h1>
        </div>

        <div className="buttons-container">
          {sports.map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`sport-button ${selectedSport === sport ? "selected" : ""}`}
            >
              {sport}
            </button>
          ))}
        </div>

        {selectedSport && (
          <div className="players-container">
            <h2>{selectedSport} Players:</h2>
            <div className="players-list">
              {players[selectedSport].map((player, index) => (
                <p
                  key={index}
                  className="player-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, player)}
                >
                  {player}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
