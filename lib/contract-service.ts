import {
  Transaction,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base';

// Contract configuration
const PREMIER_LEAGUE_BETTING_PROGRAM_ID = 'premier_league_betting.aleo';
const LEAGUE_TOKEN_PROGRAM_ID = 'league_token.aleo';
const TESTNET_BETA = WalletAdapterNetwork.TestnetBeta;

export interface PlaceBetParams {
  seasonId: number;
  roundNumber: number;
  matchIds: string[];
  betTypes: number[];
  numBets: number;
  totalStake: number;
  hasBadge: boolean;
}

export interface ClaimWinningsParams {
  seasonId: number;
  roundNumber: number;
  bets: Array<{
    matchId: string;
    betType: number;
    odds: number;
  }>;
  numBets: number;
  totalStake: number;
}

/**
 * Build a transaction to place a multi-bet on the Aleo network
 */
export function buildPlaceBetTransaction(
  publicKey: string,
  params: PlaceBetParams
): Transaction {
  // Convert bet types to u8 array
  const betTypesU8 = new Array(4).fill(0).map((_, i) => 
    i < params.betTypes.length ? params.betTypes[i] : 0
  );

  // Build match IDs as fields
  const matchIdsField = params.matchIds.map(id => `${id}field`);

  return Transaction.createTransaction(
    publicKey,
    TESTNET_BETA,
    PREMIER_LEAGUE_BETTING_PROGRAM_ID,
    'place_multi_bet',
    [
      params.seasonId, // season_id: u8
      params.roundNumber, // round_number: u8
      matchIdsField, // match_ids: [field; 4]
      betTypesU8, // bet_types: [u8; 4]
      params.numBets, // num_bets: u8
      params.totalStake, // total_stake: u64
      params.hasBadge, // has_badge: bool
    ],
    100 // 100 credits fee
  );
}

/**
 * Build a transaction to claim winnings from a bet slip
 */
export function buildClaimWinningsTransaction(
  publicKey: string,
  params: ClaimWinningsParams
): Transaction {
  return Transaction.createTransaction(
    publicKey,
    TESTNET_BETA,
    PREMIER_LEAGUE_BETTING_PROGRAM_ID,
    'claim_winnings',
    [
      params.seasonId,
      params.roundNumber,
      params.bets,
      params.numBets,
      params.totalStake,
    ],
    100
  );
}

/**
 * Build a transaction to start a new season
 */
export function buildStartSeasonTransaction(
  publicKey: string,
  seasonId: number,
  startTime: number
): Transaction {
  return Transaction.createTransaction(
    publicKey,
    TESTNET_BETA,
    PREMIER_LEAGUE_BETTING_PROGRAM_ID,
    'start_season',
    [seasonId, startTime],
    100
  );
}

/**
 * Build a transaction to start a new round with random matching
 */
export function buildStartRoundTransaction(
  publicKey: string,
  seasonId: number,
  roundNumber: number,
  roundTime: number
): Transaction {
  return Transaction.createTransaction(
    publicKey,
    TESTNET_BETA,
    PREMIER_LEAGUE_BETTING_PROGRAM_ID,
    'start_round_random',
    [seasonId, roundNumber, roundTime],
    100
  );
}

/**
 * Build a transaction to end a round and resolve matches
 */
export function buildEndRoundTransaction(
  publicKey: string,
  seasonId: number,
  roundNumber: number
): Transaction {
  return Transaction.createTransaction(
    publicKey,
    TESTNET_BETA,
    PREMIER_LEAGUE_BETTING_PROGRAM_ID,
    'end_round',
    [seasonId, roundNumber],
    100
  );
}

/**
 * Build a transaction to transfer LEAGUE tokens
 */
export function buildTransferTokenTransaction(
  publicKey: string,
  receiver: string,
  amount: number
): Transaction {
  return Transaction.createTransaction(
    publicKey,
    TESTNET_BETA,
    LEAGUE_TOKEN_PROGRAM_ID,
    'transfer_public',
    [receiver, amount],
    100
  );
}

/**
 * Parse transaction result to extract data
 */
export function parseTransactionResult(result: any) {
  try {
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('[ContractService] Error parsing transaction result:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Monitor transaction status
 */
export async function monitorTransactionStatus(
  txId: string,
  onStatusChange?: (status: string) => void,
  maxWaitTime: number = 300000 // 5 minutes
) {
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const checkStatus = async () => {
      try {
        // In production, you would poll Aleo network for transaction status
        // For now, we'll simulate with a timeout
        
        if (Date.now() - startTime > maxWaitTime) {
          reject(new Error('Transaction timeout'));
          return;
        }

        onStatusChange?.('processing');

        // Simulate transaction processing
        setTimeout(() => {
          onStatusChange?.('confirmed');
          resolve({ txId, status: 'confirmed' });
        }, 5000);
      } catch (error) {
        reject(error);
      }
    };

    checkStatus();
  });
}
