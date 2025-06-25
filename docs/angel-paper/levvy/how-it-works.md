---
sidebar_position: 3
title: How Does Levvy Work?
description: Understanding the mechanics of peer-to-peer lending on Levvy
---

# 📚 How Does Levvy Work?

## Core Mechanism

With Levvy, NFT and Token holders have the opportunity to unlock liquidity without the need to sell their assets. By utilizing their NFTs or Fungible Tokens as collateral, users can instantly take loans based on the value of their assets.

## The Lending Process

<div className="process-flow">
  <div className="process-step">
    <div className="step-number">1</div>
    <h3>Asset Selection</h3>
    <p>Choose NFT or token to use as collateral</p>
  </div>
  <div className="process-arrow">→</div>
  <div className="process-step">
    <div className="step-number">2</div>
    <h3>Loan Offers</h3>
    <p>Review competitive offers from lenders</p>
  </div>
  <div className="process-arrow">→</div>
  <div className="process-step">
    <div className="step-number">3</div>
    <h3>Accept & Receive</h3>
    <p>Accept best offer and receive ADA instantly</p>
  </div>
  <div className="process-arrow">→</div>
  <div className="process-step">
    <div className="step-number">4</div>
    <h3>Repay or Extend</h3>
    <p>Repay loan + interest or extend terms</p>
  </div>
</div>

## Key Features

### 🔒 Collateral Management
- Assets are locked to your stake key in the smart contract
- You maintain ownership until loan is repaid or foreclosed
- Transparent on-chain custody

### ⏰ Loan Duration
- Fixed two-week lending periods
- Option to extend loans on new terms
- No automatic foreclosures

### 💰 Interest Rates

:::info Fixed Rates
The interest rate remains fixed regardless of when you repay within the lending period. This provides certainty for both borrowers and lenders.
:::

## Interest Rate Determination

The Levvy team carefully determines interest rates by analyzing various attributes:

### For Fungible Tokens

<div className="rate-factors">
  <div className="factor-card">
    <h4>📊 Trading Volume</h4>
    <p>Analyzed across multiple time ranges</p>
  </div>
  <div className="factor-card">
    <h4>💧 Liquidity Score</h4>
    <p>Available market depth and spread</p>
  </div>
  <div className="factor-card">
    <h4>📈 Volatility Score</h4>
    <p>Price stability over time</p>
  </div>
  <div className="factor-card">
    <h4>🪙 Supply Metrics</h4>
    <p>Circulating, total, and max supply</p>
  </div>
  <div className="factor-card">
    <h4>⚖️ Market Dynamics</h4>
    <p>Supply/demand balance between users</p>
  </div>
</div>

### For NFTs

<div className="rate-factors">
  <div className="factor-card">
    <h4>📊 Collection Volume</h4>
    <p>Historical trading activity</p>
  </div>
  <div className="factor-card">
    <h4>💵 Floor Price</h4>
    <p>Minimum market valuation</p>
  </div>
  <div className="factor-card">
    <h4>⚖️ Market Balance</h4>
    <p>Borrower/lender equilibrium</p>
  </div>
</div>

## Important Considerations

:::caution Manual Foreclosure
Loans are not automatically foreclosed. Lenders must manually initiate the foreclosure process, which may provide borrowers with a limited window to resolve issues.
:::

### For Lenders
- Interest rates displayed as **APY** (Annual Percentage Yield)
- Competitive bidding ensures market-driven rates
- Risk assessment tools provided

### For Borrowers
- Clear upfront costs
- No hidden fees
- Transparent terms

## Platform Benefits

1. **Instant Liquidity** - Access funds immediately upon loan acceptance
2. **Competitive Rates** - Market-driven pricing through lender competition
3. **Flexible Terms** - Extend loans if needed
4. **Secure Custody** - Smart contract-based collateral management
5. **No Sell Pressure** - Keep your assets while accessing liquidity

---

:::info Next Steps
Ready to start? Visit [Levvy.fi](https://levvy.fi) to begin borrowing or lending. Detailed guides will be added to this documentation soon.
:::