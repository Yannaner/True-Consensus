import { Injectable, OnModuleInit } from '@nestjs/common';
import { CurrentVotesService } from '../current_votes/current_votes.service';
import { CurrentVote } from 'src/current_votes/entities/current_vote.entity';
import { testVotes } from './testData';
@Injectable()
export class AlgorithmService {
  constructor(
    private readonly currentVotesService: CurrentVotesService
  ) {}

  async calculateConsensus(votingId: number): Promise<string> {
    console.log("consensus algo has been run! for this votingId: ", votingId);
    // Get all votes for the specified voting ID
    let votes = await this.currentVotesService.findByVotingId(votingId);
    // console.log("algorithm.service.ts: actual votes from DB: ", votes);
    
    // // Add test data if we have few or no votes (for development/testing)
    // if (!votes || votes.length < 3) {
    //   console.log("Using test data because we have few or no actual votes");
      
    //   // Sample test data with different rankings

    //   // Combine real votes with test votes
    //   votes = [...(votes || []), ...testVotes as unknown as CurrentVote[]];
    //   console.log("algorithm.service.ts: combined with test votes: ", votes);
    // }
    
    if (!votes || votes.length === 0) {
      return "";
    }

    // Extract all unique candidates from rankings
    const allCandidates = new Set<string>();
    votes.forEach(vote => {
      if (vote.ranking) {
        vote.ranking.split(',').forEach(candidate => {
          allCandidates.add(candidate);
        });
      }
    });

    // Convert to array and sort for consistent order
    const candidates = Array.from(allCandidates).sort();
    
    // If no candidates found, return empty string
    if (candidates.length === 0) {
      return "";
    }
    
    // Prepare votes for the Condorcet algorithm
    // Each vote needs to be converted from "2,1" format to array of indices
    const processedVotes = votes
      .filter(vote => vote.ranking && vote.ranking.trim())
      .map(vote => {
        const ranking = vote.ranking.split(',');
        // Map each candidate to its index in the candidates array
        return ranking.map(candidate => candidates.indexOf(candidate));
      });
    
    // Run the Condorcet algorithm
    const finalRanking = this.runCondorcet(candidates, processedVotes);
    
    // Convert the final ranking back to a string like "2,3,1"
    return finalRanking.join(',');
  }

  private runCondorcet(candidates: string[], votes: number[][]): string[] {
    if (candidates.length < 2 || candidates.length > 10) {
      throw new Error('Number of candidates must be between 2 and 10.');
    }
  
    // Build pairwise preference matrix
    const pairwise = Array.from({ length: candidates.length }, () =>
      Array(candidates.length).fill(0)
    );
  
    votes.forEach(ranking => {
      for (let i = 0; i < ranking.length; i++) {
        for (let j = i + 1; j < ranking.length; j++) {
          pairwise[ranking[i]][ranking[j]] += 1;
        }
      }
    });
  
    // Build edges with margin of victory
    interface Edge {
      winner: number;
      loser: number;
      margin: number;
    }
    const edges: Edge[] = [];
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
  
    // Sort edges by margin (descending)
    edges.sort((a, b) => b.margin - a.margin);
  
    // Lock edges (Ranked Pairs)
    const locked = Array.from({ length: candidates.length }, () =>
      Array(candidates.length).fill(false)
    );
  
    const createsCycle = (winner: number, loser: number): boolean => {
      if (winner === loser) return true;
      for (let k = 0; k < candidates.length; k++) {
        if (locked[loser][k] && createsCycle(winner, k)) {
          return true;
        }
      }
      return false;
    };
  
    edges.forEach(edge => {
      if (!createsCycle(edge.winner, edge.loser)) {
        locked[edge.winner][edge.loser] = true;
      }
    });
  
    // Determine final order based on inbound edges
    const rankingScores = candidates.map((_, idx) => {
      let inboundEdges = 0;
      for (let x = 0; x < candidates.length; x++) {
        if (locked[x][idx]) inboundEdges++;
      }
      return { candidate: idx, score: -inboundEdges };
    });
  
    rankingScores.sort((a, b) => b.score - a.score);
    
    // Return the final ranking
    return rankingScores.map(r => candidates[r.candidate]);
  }
}
