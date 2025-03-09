/**
 * Run a Condorcet-style (Ranked Pairs) method on up to 10 candidates.
 * @param {string[]} candidates Array of candidate names (2-10 in length).
 * @param {Array<number[]>} votes Each vote is an array of candidate indices in ranked order (index 0 is top).
 * @returns {string[]} Final ranking of candidates.
 */
function runCondorcet(candidates, votes) {
    if (candidates.length < 2 || candidates.length > 10) {
      throw new Error('Number of candidates must be between 2 and 10.');
    }
  
    console.log('\n=== Building Pairwise Preference Matrix ===');
    const pairwise = Array.from({ length: candidates.length }, () =>
      Array(candidates.length).fill(0)
    );
  
    votes.forEach((ranking, voteIndex) => {
      console.log(`\nProcessing vote #${voteIndex + 1}:`, ranking);
      for (let i = 0; i < ranking.length; i++) {
        for (let j = i + 1; j < ranking.length; j++) {
          pairwise[ranking[i]][ranking[j]] += 1;
        }
      }
    });
  
    console.log('\n=== Pairwise Preference Matrix (rows prefer over columns) ===');
    console.table(pairwise);
  
    console.log('\n=== Building Edges with Margin of Victory ===');
    const edges = [];
    for (let i = 0; i < candidates.length; i++) {
      for (let j = 0; j < candidates.length; j++) {
        if (i !== j && pairwise[i][j] > pairwise[j][i]) {
          edges.push({
            winner: i,
            loser: j,
            margin: pairwise[i][j] - pairwise[j][i],
          });
        }
      }
    }
    console.log('Unsorted Edges:', edges);
  
    edges.sort((a, b) => b.margin - a.margin);
    console.log('\n=== Sorted Edges (descending margin) ===');
    console.log(edges);
  
    console.log('\n=== Locking Edges (Ranked Pairs) ===');
    const locked = Array.from({ length: candidates.length }, () =>
      Array(candidates.length).fill(false)
    );
  
    function createsCycle(winner, loser) {
      if (winner === loser) return true;
      for (let k = 0; k < candidates.length; k++) {
        if (locked[loser][k] && createsCycle(winner, k)) {
          return true;
        }
      }
      return false;
    }
  
    edges.forEach((edge, idx) => {
      console.log(`\nChecking edge #${idx + 1}:`, edge);
      if (!createsCycle(edge.winner, edge.loser)) {
        locked[edge.winner][edge.loser] = true;
        console.log(
          `Locked in: ${candidates[edge.winner]} -> ${candidates[edge.loser]} (margin ${edge.margin})`
        );
      } else {
        console.log(
          `Skipped (would form cycle): ${candidates[edge.winner]} -> ${candidates[edge.loser]}`
        );
      }
    });
  
    console.log('\n=== Final "Locked" Matrix (true = locked edge) ===');
    console.table(locked);
  
    console.log('\n=== Determining Final Order ===');
    const rankingScores = candidates.map((_, idx) => {
      let inboundEdges = 0;
      for (let x = 0; x < candidates.length; x++) {
        if (locked[x][idx]) inboundEdges++;
      }
      return { candidate: idx, score: -inboundEdges };
    });
  
    console.log('\nRanking Scores (negative inboundEdges):', rankingScores);
  
    rankingScores.sort((a, b) => b.score - a.score);
    const finalRanking = rankingScores.map((r) => candidates[r.candidate]);
  
    console.log('\n== Final Ranking ==', finalRanking, '\n');
    return finalRanking;
  }
  
  // Example usage #1
  const exampleCandidates1 = ['CandidateA', 'CandidateB', 'CandidateC'];
  const exampleVotes1 = [
    [0, 1, 2], // Voter 1: A > B > C
    [1, 2, 0], // Voter 2: B > C > A
    [1, 0, 2], // Voter 3: B > A > C
  ];
  console.log('=== Example #1 ===');
  runCondorcet(exampleCandidates1, exampleVotes1);
  
  // Example usage #2
  const exampleCandidates2 = ['W', 'X', 'Y', 'Z'];
  const exampleVotes2 = [
    [0, 1, 2, 3], // Voter 1: W > X > Y > Z
    [0, 2, 1, 3], // Voter 2: W > Y > X > Z
    [1, 2, 0, 3], // Voter 3: X > Y > W > Z
    [3, 0, 1, 2], // Voter 4: Z > W > X > Y
    [1, 0, 2, 3], // Voter 5: X > W > Y > Z
  ];
  console.log('=== Example #2 ===');
  runCondorcet(exampleCandidates2, exampleVotes2);
  
  // Example usage #3
  const exampleCandidates3 = ['Hello', 'Beta', 'Gamma', 'Delta', 'Epsilon'];
  const exampleVotes3 = [
    [0, 1, 2, 3, 4],
    [1, 2, 3, 4, 0],
    [2, 3, 4, 0, 1],
    [0, 2, 1, 4, 3],
    [3, 1, 2, 0, 4],
    [4, 0, 1, 2, 3],
  ];
  console.log('=== Example #3 ===');
  runCondorcet(exampleCandidates3, exampleVotes3);
  
  // Expose the function globally
  window.runCondorcet = runCondorcet;
  
  module.exports = { runCondorcet };