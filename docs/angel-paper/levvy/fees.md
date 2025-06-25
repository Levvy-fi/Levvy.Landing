---
sidebar_position: 6
title: Fees
description: Understanding Levvy's fee structure and distribution
---

# 🏦 Fees

Transparent and fair fee structure designed to benefit all participants.

## Fee Structure Overview

Levvy implements a balanced fee model that ensures fairness between lenders and borrowers while supporting platform sustainability and rewarding $ANGELS holders.

## Token Lending Fees

<div className="fee-structure">
  <div className="fee-card">
    <h3>For Borrowers</h3>
    <div className="fee-amount">12.5%</div>
    <p>of interest rate</p>
    <span className="fee-timing">Charged when accepting loan</span>
  </div>
  
  <div className="fee-card">
    <h3>For Lenders</h3>
    <div className="fee-amount">12.5%</div>
    <p>of interest rate</p>
    <span className="fee-timing">Charged when claiming returns or foreclosing</span>
  </div>
  
  <div className="fee-card total">
    <h3>Total Platform Fee</h3>
    <div className="fee-amount">25%</div>
    <p>of interest rate</p>
    <span className="fee-timing">Split evenly between parties</span>
  </div>
</div>

### Example Calculation
:::info Token Loan Example
- Loan Amount: 1,000 ADA
- Interest Rate: 10% (100 ADA)
- Borrower Fee: 12.5% of 100 ADA = 12.5 ADA
- Lender Fee: 12.5% of 100 ADA = 12.5 ADA
- Total Platform Fee: 25 ADA
:::

## NFT Lending Fees

<div className="nft-fee-highlight">
  <h3>🎉 Reduced NFT Fees!</h3>
  <p>We've lowered NFT lending fees from 1.5% to just <strong>1%</strong> of the total loan amount</p>
</div>

### NFT Fee Details
- **Rate**: 1% of total loan value
- **Split**: Balanced between lenders and borrowers
- **Timing**: Applied at transaction execution

## Additional Fees

### MinUTXO Fees
:::caution Cardano Network Requirement
Both lenders and borrowers are subject to MinUTXO fees (approximately 1-2 ADA) as required by the Cardano protocol.
:::

## Fee Distribution

<div className="distribution-flow">
  <h3>📊 Where Do Fees Go?</h3>
  
  <div className="distribution-chart">
    <div className="dist-segment dev" style={{width: '25%'}}>
      <span>25%</span>
      <p>Development</p>
    </div>
    <div className="dist-segment holders" style={{width: '75%'}}>
      <span>75%</span>
      <p>$ANGELS Holders</p>
    </div>
  </div>
</div>

### Detailed Breakdown

<div className="breakdown-cards">
  <div className="breakdown-card">
    <h4>🛠️ Development (25%)</h4>
    <ul>
      <li>Platform maintenance</li>
      <li>New feature development</li>
      <li>Security audits</li>
      <li>Infrastructure costs</li>
    </ul>
  </div>
  
  <div className="breakdown-card">
    <h4>💎 $ANGELS Holders (75%)</h4>
    <p>Further split 80/20:</p>
    <ul>
      <li><strong>80%</strong> → Monthly distributions (60% of total)</li>
      <li><strong>20%</strong> → Treasury reinvestment (15% of total)</li>
    </ul>
  </div>
</div>

## Monthly Distribution Schedule

<div className="distribution-timeline">
  <div className="timeline-header">
    <h3>📅 Distribution Timeline</h3>
  </div>
  
  <div className="timeline-steps">
    <div className="timeline-step">
      <div className="step-date">1st - 14th</div>
      <p>Fees collected throughout the month</p>
    </div>
    <div className="timeline-arrow">→</div>
    <div className="timeline-step">
      <div className="step-date">15th</div>
      <p>Distribution to $ANGELS holders</p>
    </div>
    <div className="timeline-arrow">→</div>
    <div className="timeline-step">
      <div className="step-date">16th - 31st</div>
      <p>New collection period begins</p>
    </div>
  </div>
</div>

## Fee Comparison

<div className="comparison-table">
  <table>
    <thead>
      <tr>
        <th>Platform</th>
        <th>Token Fees</th>
        <th>NFT Fees</th>
        <th>Fee Model</th>
      </tr>
    </thead>
    <tbody>
      <tr className="levvy-row">
        <td><strong>Levvy</strong></td>
        <td>25% of interest</td>
        <td>1% of loan</td>
        <td>Split evenly</td>
      </tr>
      <tr>
        <td>Typical Platform A</td>
        <td>30-40% of interest</td>
        <td>2-3% of loan</td>
        <td>Borrower pays all</td>
      </tr>
      <tr>
        <td>Typical Platform B</td>
        <td>20-30% of interest</td>
        <td>1.5-2.5% of loan</td>
        <td>Lender pays most</td>
      </tr>
    </tbody>
  </table>
</div>

## Why Our Fee Model Works

<div className="fee-benefits">
  <div className="benefit">
    <h4>⚖️ Fair Distribution</h4>
    <p>Both parties share the cost equally, creating balanced incentives</p>
  </div>
  
  <div className="benefit">
    <h4>💰 Holder Rewards</h4>
    <p>75% of fees go directly to rewarding $ANGELS holders</p>
  </div>
  
  <div className="benefit">
    <h4>🚀 Sustainable Growth</h4>
    <p>25% ensures continuous platform improvement and security</p>
  </div>
  
  <div className="benefit">
    <h4>🎯 Competitive Rates</h4>
    <p>Lower than most competitors while maintaining quality</p>
  </div>
</div>

---

:::tip Fee Optimization
To minimize your effective fee rate:
- **For Borrowers**: Borrow larger amounts for longer periods
- **For Lenders**: Provide liquidity for stable, high-volume assets
- **For Everyone**: Hold $ANGELS to receive fee distributions
:::

:::info Next: Platform Statistics
View real-time [platform statistics](/docs/angel-paper/levvy/statistics) and performance metrics.
:::