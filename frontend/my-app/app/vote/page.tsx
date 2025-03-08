// "use client";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios"

// export default function VotePage() {
//   const [selectedSport, setSelectedSport] = useState<string | null>(null);
//   const [topPlayers, setTopPlayers] = useState<string[]>([]);
//   // const [timeLeft, setTimeLeft] = useState(6000);
//   const [votingData, setVotingData] = useState<any>(null); // Store the voting data
//   const dragItem = useRef<number | null>(null);
//   const dragOverItem = useRef<number | null>(null);

//   const sports = ["Soccer", "Basketball", "Tennis", "Baseball"];
//   const players: Record<string, string[]> = {
//     Basketball: Array.from({ length: 100 }, (_, i) => `Basketball Player ${i + 1}`),
//     Soccer: Array.from({ length: 100 }, (_, i) => `Soccer Player ${i + 1}`),
//     Tennis: Array.from({ length: 100 }, (_, i) => `Tennis Player ${i + 1}`),
//     Baseball: Array.from({ length: 100 }, (_, i) => `Baseball Player ${i + 1}`),
//   };

//   useEffect(() => {
//     const getVotingList = async () => {
//       const url = "https://tcbackend.backendboosterbeast.com/voting-elements/voting_list/1";

//       try {
//         let response;
//         axios.get(url).then(res => {
//           response = res.data
//           console.log(response)
//           setVotingData(response)
//         })
//         .catch(error => {
//           console.error(error);
//         });
//         let data = (response as any)
//         console.log("Voting List:", votingData);
//       } catch (error) {
//         console.error("Error fetching voting list:", error);
//       }
//     };

//     getVotingList();
//   }, []);

//   const handleDragStart = (event: React.DragEvent, player: string) => {
//     event.dataTransfer.setData("player", player);
//   };

//   const handleDrop = (event: React.DragEvent) => {
//     const player = event.dataTransfer.getData("player");
  
//     if (player && !topPlayers.includes(player) && topPlayers.length < 10) {
//       setTopPlayers((prevTopPlayers) => [...prevTopPlayers, player]);
//     }
//   };

//   const handleDragOver = (event: React.DragEvent) => {
//     event.preventDefault();
//   };

//   const handleDelete = (playerToDelete: string) => {
//     setTopPlayers(topPlayers.filter((player) => player !== playerToDelete));
//   };

//   const handleSubmit = () => {
//     if (topPlayers.length === 10) {
//       alert(`Thanks for submitting`);
//     } else {
//       alert("Please select exactly 10 players before submitting.");
//     }
//   };

//   const onDragStartTopPlayers = (event: React.DragEvent, index: number) => {
//     dragItem.current = index;
//     event.dataTransfer.effectAllowed = "move";
//   };

//   const onDragEnterTopPlayers = (event: React.DragEvent, index: number) => {
//     if (index !== dragItem.current) {
//       dragOverItem.current = index;
//     }
//   };

//   const onDragEndTopPlayers = () => {
//     if (dragItem.current !== null && dragOverItem.current !== null) {
//       const updatedList = [...topPlayers];
//       const draggedItemContent = updatedList[dragItem.current];
//       updatedList.splice(dragItem.current, 1);
//       updatedList.splice(dragOverItem.current, 0, draggedItemContent);
//       dragItem.current = null;
//       dragOverItem.current = null;
//       setTopPlayers(updatedList);
//     }
//   };

//   return (
//     <div className="vote-page">
//       <div className="left-side" onDrop={handleDrop} onDragOver={handleDragOver}>
//         <h2 className="top-players-header">Top 10 Players</h2>
//         <div className="top-players-list">
//           {topPlayers.length === 0 ? (
//             <p>No players selected yet. Drag and drop players here!</p>
//           ) : (
//             topPlayers.map((player, index) => (
//               <div
//                 key={player.id}
//                 className="top-player-item"
//                 draggable
//                 onDragStart={(e) => onDragStartTopPlayers(e, index)}
//                 onDragEnter={(e) => onDragEnterTopPlayers(e, index)}
//                 onDragEnd={onDragEndTopPlayers}
//               >
//                 <span>{index + 1}. {player.item}</span>
//                 <button onClick={() => handleDelete(player.item)} className="delete-button">
//                   ✖️
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//         <button onClick={handleSubmit} className="submit-button">Submit</button>
//       </div>

//       <div className="right-side">
//         <div className="header">
//           <h1>What's the top 10 colleges?</h1>
//         </div>
//         <div className="items"><p>Items</p>
//         </div>

//         {selectedSport && (
//           <div className="players-container">
//             <div className="players-list">
//               {votingData.map((item:any) => (
//                   <p>{item.item}</p>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function VotePage() {
  const [topPlayers, setTopPlayers] = useState<string[]>([]);
  const [votingData, setVotingData] = useState<any>(null); // Store the voting data
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  useEffect(() => {
    const getVotingList = async () => {
      const url = "https://tcbackend.backendboosterbeast.com/voting-elements/voting_list/1";

      try {
        let response;
        axios.get(url)
          .then(res => {
            response = res.data;
            console.log(response);
            setVotingData(response); // Correctly sets voting data
          })
          .catch(error => {
            console.error(error);
          });
      } catch (error) {
        console.error("Error fetching voting list:", error);
      }
    };

    getVotingList();
  }, []);

  const handleDragStart = (event: React.DragEvent, player: string) => {
    event.dataTransfer.setData("player", player);
  };

  const handleDrop = (event: React.DragEvent) => {
    const player = event.dataTransfer.getData("player");

    if (player && !topPlayers.includes(player) && topPlayers.length < 10) {
      setTopPlayers((prevTopPlayers) => [...prevTopPlayers, player]);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDelete = (playerToDelete: string) => {
    setTopPlayers(topPlayers.filter((player) => player !== playerToDelete));
  };

  const handleSubmit = () => {
    if (topPlayers.length === 10) {
      alert(`Thanks for submitting`);
    } else {
      alert("Please select exactly 10 players before submitting.");
    }
  };

  const onDragStartTopPlayers = (event: React.DragEvent, index: number) => {
    dragItem.current = index;
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragEnterTopPlayers = (event: React.DragEvent, index: number) => {
    if (index !== dragItem.current) {
      dragOverItem.current = index;
    }
  };

  const onDragEndTopPlayers = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const updatedList = [...topPlayers];
      const draggedItemContent = updatedList[dragItem.current];
      updatedList.splice(dragItem.current, 1);
      updatedList.splice(dragOverItem.current, 0, draggedItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      setTopPlayers(updatedList);
    }
  };

  return (
    <div className="vote-page">
      <div className="left-side" onDrop={handleDrop} onDragOver={handleDragOver}>
        <h2 className="top-players-header">Top 10 Players</h2>
        <div className="top-players-list">
          {topPlayers.length === 0 ? (
            <p>No players selected yet. Drag and drop players here!</p>
          ) : (
            topPlayers.map((player, index) => (
              <div
                key={player}
                className="top-player-item"
                draggable
                onDragStart={(e) => onDragStartTopPlayers(e, index)}
                onDragEnter={(e) => onDragEnterTopPlayers(e, index)}
                onDragEnd={onDragEndTopPlayers}
              >
                <span>{index + 1}. {player}</span>
                <button onClick={() => handleDelete(player)} className="delete-button">
                  ✖️
                </button>
              </div>
            ))
          )}
        </div>
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div>

      <div className="right-side">
        <div className="header">
          <h1>What's the top 10 colleges?</h1>
        </div>
        <div className="items">
          <p>Items</p>
        </div>

        {votingData && (
          <div className="players-container">
            <div className="players-list">
              {votingData.map((item: any) => (
                <div
                  key={item.id} // Ensure unique key for each item
                  className="player-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.item)}
                >
                  <p>{item.item}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
