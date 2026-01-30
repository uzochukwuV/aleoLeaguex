# Premier League Betting dApp - Aleo Privacy Blockchain

A sophisticated, privacy-first decentralized betting platform built on the Aleo blockchain using zero-knowledge proofs. Bet on Premier League matches with multi-bet parlays, parlay boosters, and real-time odds.

## 🚀 Key Features

### 1. **Privacy-First Design**
- Built on Aleo blockchain with zero-knowledge proofs
- Private transactions and user data by default
- Compliant betting through cryptographic proofs
- No exposure of betting patterns or personal information

### 2. **Advanced Betting System**
- **Live Markets**: Real-time match odds with 1-4 simultaneous matches per round
- **Multi-Bet Parlays**: Combine 2-4 bets for compounded odds
- **Virtual Parimutuel**: Locked odds system (1.2x - 2.1x range)
- **Parlay Boosters**: Tier-based multipliers (up to 2.5x) for multi-bets
- **Season Winner Prediction**: Free entry to predict season champion with 500k LEAGUE prize pool

### 3. **Team Management**
- 20 Premier League teams with dynamic strength ratings
- Real-time standings with goal differential tracking
- NFT Team Badges for bonus rewards (future feature)
- Historic performance statistics

### 4. **Smart Contract Integration**
- Aleo wallet adapter (Leo, other wallets)
- Transaction signing and verification
- Automatic bet settlement
- Prize pool management

### 5. **Premium UI/UX**
- Dark theme inspired by Base44 aesthetic
- Glass morphism effects and smooth animations
- Responsive design (mobile, tablet, desktop)
- Real-time odds ticker with change indicators
- Drawer-based navigation on mobile
- Hover effects and gradient backdrops

## 📦 Project Structure

```
├── app/
│   ├── layout.tsx                 # Root layout with wallet provider
│   ├── page.tsx                   # Main dashboard
│   └── globals.css                # Design tokens & theme
├── components/
│   ├── header.tsx                 # Navigation header
│   ├── betting-markets.tsx        # Live market display
│   ├── match-card.tsx             # Individual match card
│   ├── bet-slip-panel.tsx         # Bet selection & placement
│   ├── parlay-builder.tsx         # Parlay multiplier system
│   ├── standings-panel.tsx        # Team standings
│   ├── team-stats-card.tsx        # Team detail card
│   ├── season-winner-predictor.tsx # Season prediction
│   ├── transaction-history.tsx    # Betting history
│   ├── settlement-details.tsx     # Transaction details modal
│   ├── market-filters.tsx         # Advanced filtering
│   ├── live-odds-ticker.tsx       # Real-time odds
│   ├── wallet-status.tsx          # Wallet connection display
│   ├── providers/
│   │   └── wallet-provider.tsx    # Aleo wallet setup
│   └── ui/
│       └── button.tsx             # Base button component
├── hooks/
│   ├── use-bet-slip.ts           # Bet management state
│   └── use-contract.ts           # Smart contract interactions
├── lib/
│   ├── types.ts                   # TypeScript interfaces
│   ├── mock-data.ts              # Demo data
│   ├── contract-service.ts       # Aleo contract builders
│   └── utils.ts                  # Utility functions
└── package.json                   # Dependencies
```

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: shadcn/ui with Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Form Handling**: React Hook Form + Zod
- **Animations**: Tailwind CSS animations

### Blockchain
- **Network**: Aleo (TestnetBeta)
- **Wallet Integration**: 
  - `@demox-labs/aleo-wallet-adapter-react`
  - `@demox-labs/aleo-wallet-adapter-leo`
  - `@demox-labs/aleo-wallet-adapter-reactui`
- **Smart Contracts**: Leo language
  - `premier_league_betting.aleo` - Main betting contract
  - `league_token.aleo` - $LEAGUE token contract
  - `team_badges.aleo` - NFT team badges

### Development
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1
- **Package Manager**: npm/yarn

## 🎮 How to Use

### 1. Connect Wallet
- Click "Connect Wallet" button in header
- Select Leo Wallet or other Aleo-compatible wallet
- Approve wallet connection

### 2. Browse Markets
- View live matches in "Live Markets" tab
- Filter by team or odds range
- Sort by closest kickoff or best odds

### 3. Place Bets
- Click odds (1, X, 2) to add bets to slip
- Select bets in slip to create parlays
- Watch parlay multiplier boost in real-time
- Set stake (10-1000 LEAGUE)
- Click "Place Bet" to submit transaction

### 4. Multi-Bet Parlays
- Add 2+ bets to unlock parlay system
- Tier 1 (2 bets): 1.0x base
- Tier 2 (3 bets): 1.15x boost + 50 LEAGUE reward
- Tier 3 (4 bets): 1.35x boost + 150 LEAGUE reward
- Tier 4 (5 bets): 1.60x boost + 400 LEAGUE reward

### 5. Check Results
- View "Betting History" for past bets
- Click transaction to see settlement details
- Win/loss/pending status tracked on-chain
- View transaction hash on Aleoscan

### 6. Predict Season Winner
- Free entry prediction in "Standings" tab
- Odds based on current standings
- Prize pool: 500k LEAGUE (1st: 250k, 2nd: 150k, 3rd: 100k)
- Winner determined at season end

## 🔐 Security & Privacy Features

### Zero-Knowledge Proofs
- Private inputs processed off-chain
- Public verification on-chain
- No exposure of betting amounts or patterns
- Compliant transaction handling

### Smart Contracts
- Parameterized queries prevent SQL injection
- Input validation on all transactions
- Locked odds prevent manipulation
- Automatic house edge collection

### Wallet Integration
- Hardware wallet support via Leo Wallet
- Transaction signing required for all operations
- No private keys exposed
- Session management via wallet

## 💰 Economics

### Token System
- **$LEAGUE**: Platform utility token (1,000,000,000 total)
- **30% Airdrop**: Early user distribution
- **40% Betting Rewards**: Winner prizes
- **10% NFT Rewards**: Badge holder bonuses
- **20% Development**: Team & operations

### Betting House Edge
- **Match Betting**: 3-5% house edge
- **Parlay System**: No additional edge, multipliers only
- **Fees**: Minimal transaction fees on Aleo
- **Season Pool**: 2% rake on match betting volume

### Odds Model
- **Virtual Parimutuel**: Fixed odds per match
- **Range**: 1.2x - 2.1x (profitable margins)
- **Parlay Multiplier**: Product of selected odds
- **Badge Boost**: +5% odds for badge holders

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Leo Wallet or compatible Aleo wallet

### Installation

```bash
# Clone repository
git clone https://github.com/uzochukwuV/aleoLeaguex.git
cd aleoLeaguex

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Environment Variables

Create `.env.local`:
```env
# Aleo Network
NEXT_PUBLIC_ALEO_NETWORK=testnet3
NEXT_PUBLIC_ALEO_PROGRAM=premier_league_betting.aleo

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 📊 Smart Contract Reference

### place_multi_bet
Place a multi-bet slip with 1-4 bets

```leo
async transition place_multi_bet(
    season_id: u8,
    round_number: u8,
    match_ids: [field; 4],
    bet_types: [u8; 4],      // 1=home, 2=draw, 3=away
    num_bets: u8,
    total_stake: u64,
    has_badge: bool
) -> (BetSlip, Future)
```

### claim_winnings
Claim winnings from settled bets

```leo
async transition claim_winnings(
    slip: BetSlip
) -> (Winnings, Future)
```

### end_round
Resolve all matches in a round

```leo
async transition end_round(
    public season_id: u8,
    public round_number: u8
) -> Future
```

## 🎯 Roadmap

### Phase 1: MVP (Current)
- ✅ Live betting markets
- ✅ Multi-bet parlays
- ✅ Real-time odds
- ✅ Wallet integration
- ✅ Premium UI

### Phase 2: NFT Integration
- Team badge NFTs (collectible)
- Badge-holder betting bonuses
- Marketplace for trading
- Rarity tiers & special effects

### Phase 3: Social Features
- Leaderboards & rankings
- Friend referrals
- Social betting pools
- Achievement badges

### Phase 4: Expansion
- Additional sports (Tennis, Basketball, etc.)
- Live in-match betting
- Exotic markets
- DAO governance

## 📝 License

MIT License - See LICENSE file

## 🤝 Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

- **Documentation**: Read smart contract analysis in `/PREMIER_LEAGUE_BETTING_ANALYSIS.md`
- **Issues**: Open GitHub issues for bugs
- **Discord**: Join community for support
- **Aleo Docs**: https://developer.aleo.org/

## 🙏 Acknowledgments

- Aleo team for zero-knowledge proof technology
- Demox Labs for wallet adapter libraries
- Base44 for UI design inspiration
- Premier League for sports data reference

---

**Made with ❤️ for privacy-first betting on Aleo**
