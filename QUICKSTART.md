# Premier League Betting dApp - Quick Start Guide

Get up and running with the Aleo Premier League Betting dApp in 5 minutes.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- A modern web browser
- [Leo Wallet](https://www.leo.app/) or another Aleo-compatible wallet

## 1. Installation

```bash
# Clone the repository
git clone https://github.com/uzochukwuV/aleoLeaguex.git
cd aleoLeaguex

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

## 2. Configure Wallet

1. Download and install [Leo Wallet](https://www.leo.app/)
2. Create or import an Aleo testnet wallet
3. Request testnet credits from the Aleo faucet
4. Keep wallet open while using the dApp

## 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 4. Connect Wallet

1. Click **"Connect Wallet"** in top-right
2. Select your wallet (Leo Wallet recommended)
3. Approve the connection request
4. Wallet address will appear in header

## 5. Place Your First Bet

### Step 1: Browse Markets
- You'll see 6 sample matches on the homepage
- Each match shows real-time odds for Home/Draw/Away
- Odds range from 1.2x to 2.1x

### Step 2: Add Bets to Slip
- Click any odds button (1, X, or 2)
- The bet will appear in the **Bet Slip** panel on the right
- Add more bets to create a parlay (2-4 bets max)

### Step 3: Parlay Boost
- With 2+ bets selected, the parlay multiplier activates
- Watch your odds boost in real-time:
  - 2 bets: 1.0x base
  - 3 bets: 1.15x boost
  - 4 bets: 1.35x boost

### Step 4: Set Stake
- Use +/- buttons or type directly (10-1000 LEAGUE)
- Quick buttons: 10, 25, 50, 100
- See potential winnings in green

### Step 5: Place Bet
- Click **"Place Bet"** button
- Sign transaction in your wallet
- Wait for confirmation (~5 seconds)
- Bet appears in history

## 6. View Your History

- Click **"History"** tab to see all bets
- Filter by Win/Loss/Pending
- Click any bet to see full details
- Transaction hash links to Aleoscan

## 7. Check Standings

- Click **"Standings"** tab
- View all 20 teams with current points
- See win rates and goal differentials
- Make free season winner predictions

## Bet Types

### Home Win (1)
Bet the home team wins

### Draw (X)
Bet the match ends in a draw

### Away Win (2)
Bet the away team wins

## Parlay System

**Combine multiple bets for higher odds:**

```
Single Bet:
Manchester City to Win @ 1.95x
Stake: 100 LEAGUE
Potential: 195 LEAGUE

Parlay (2 bets, 1.15x boost):
Man City to Win @ 1.95x
Arsenal to Win @ 1.92x
Base Odds: 3.74x
Boosted: 4.30x (1.15x multiplier)
Stake: 100 LEAGUE
Potential: 430 LEAGUE
```

## UI Guide

### Header
- **Logo**: Home/Dashboard link
- **Balance**: Current LEAGUE tokens
- **Bet Slip Icon**: Toggle side panel
- **Wallet**: Connection status & address

### Main Content
- **Markets Tab**: Live betting options
- **Standings Tab**: League table & predictions
- **History Tab**: Betting records & results

### Bet Slip
- **Add Bets**: Click any odds button
- **Parlay Boost**: Automatic multiplier (2+ bets)
- **Stake Controls**: Set betting amount
- **Place Bet**: Submit to blockchain

## Keyboard Shortcuts

- `Escape`: Close modals
- `Enter`: Submit forms

## Troubleshooting

### "Wallet not connected"
- Ensure Leo Wallet extension is installed
- Check wallet is unlocked
- Try refreshing page
- Check browser console for errors

### "Insufficient balance"
- Request testnet LEAGUE from faucet
- Check wallet balance in settings
- Ensure testnet is selected

### "Transaction failed"
- Check gas fee is sufficient
- Verify contract address is correct
- Try again with smaller stake
- Check network connection

### Odds not updating
- Refresh page (F5)
- Clear browser cache
- Check network tab in DevTools
- Verify API connection in console

## Advanced Features

### Market Filters
- Click **"Advanced Filters"** button
- Filter by odds range (1.0x - 10x)
- Set minimum volume (betting interest)
- Choose time window (next 1-8 hours)

### Team Selection
- Click team name chips at top
- View only matches for selected teams
- Reset to view all matches

### Sort Options
- **Soonest**: Matches closest to kickoff
- **Best Odds**: Highest odds available

## Live Testing

### Mock Data
The app includes sample data for testing:
- 6 active matches per round
- 20 teams with standings
- Transaction history with samples
- Mock wallet balance: 1,250 LEAGUE

### What's Real
- Wallet integration (real Leo Wallet)
- Transaction signing
- Smart contract calls (when implemented)
- Block confirmations

## Next Steps

1. **Play Around**: Place test bets with mock data
2. **Read Docs**: See `DAPP_README.md` for full guide
3. **Smart Contracts**: Review Leo code in `/premier_league_betting/src/main.leo`
4. **Join Community**: Discord/Twitter for updates

## API Reference

The dApp is currently designed to work with mock data. For production:

```bash
# Future: Connect to real Aleo network
# For now, all data is simulated in lib/mock-data.ts
```

## Environment Variables

Key variables in `.env.local`:

```env
# Network
NEXT_PUBLIC_ALEO_NETWORK=testnet3

# Program addresses
NEXT_PUBLIC_ALEO_PROGRAM_ID=premier_league_betting.aleo

# Features
NEXT_PUBLIC_ENABLE_LIVE_ODDS=true
```

## Performance Tips

- Clear browser cache if slow
- Use desktop for better experience
- Chrome/Firefox recommended
- Disable browser extensions if issues

## Need Help?

1. Check browser console for errors (F12)
2. Review error messages in toast notifications
3. Read full documentation: `/DAPP_README.md`
4. Check smart contract docs: `/PREMIER_LEAGUE_BETTING_ANALYSIS.md`

## File Structure

```
Important files to know:

Frontend:
- app/page.tsx              Main dashboard
- components/betting-markets.tsx   Live markets
- components/bet-slip-panel.tsx    Bet placement
- lib/mock-data.ts         Sample data

Smart Contracts:
- premier_league_betting/src/main.leo   Main contract
- league_token/src/main.leo             Token contract
```

## What's Next?

After mastering the basics:
1. Explore the Standings tab
2. Try season winner predictions
3. Create 3-4 bet parlays
4. Check transaction history
5. Read smart contract code

Happy betting! 🎯

---

For issues or questions, check the main [README.md](./DAPP_README.md)
