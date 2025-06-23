# Blaze Cardano Integration Plan

This document outlines the planned integration of Blaze Cardano library for enhanced wallet functionality and transaction building in the Angel Finance landing page.

## Overview

**Blaze** is a JavaScript library for building Cardano blockchain transactions and off-chain code, particularly designed for Aiken smart contracts. It provides a developer-friendly API for transaction building and wallet operations.

### Key Features
- Simplified transaction building for Cardano
- Support for multiple blockchain providers (Blockfrost, Kupmios, Maestro, UTxORPC)
- Enhanced wallet API abstraction
- Built for modern TypeScript/JavaScript applications
- Used by major Cardano projects (Fortuna, jpg.store, Rocket, SundaeSwap)

## Installation

```bash
npm i @blaze-cardano/sdk
```

## Current Wallet Integration

The Angel Finance site currently uses a basic CIP-30 wallet integration pattern inherited from the Levvy.V3 project:

### Existing Implementation
- **Location**: `src/scripts/bifrost.ts` and `src/scripts/types.ts`
- **Pattern**: Direct CIP-30 wallet detection via `window.cardano`
- **Features**: Basic wallet connection, balance checking, transaction signing
- **Integration**: Header component with wallet connection modal

### Current Files Structure
```
src/scripts/
├── bifrost.ts           # Wallet detection and connection utilities
├── types.ts            # TypeScript types for Cardano wallet API
└── global.d.ts         # Global type declarations for window.cardano
```

## Blaze Integration Architecture

### Phase 1: Basic ADA Transfer (Minimal Scope)
The immediate goal is to implement a simple ADA transfer function using Blaze.

#### Core Implementation
```typescript
// Basic Blaze ADA transfer pattern
const blaze = await Blaze.from(provider, wallet);
const tx = await blaze
  .newTransaction()
  .payLovelace(recipientAddress, amountInLovelace)
  .complete();
```

#### Integration Points
1. **Provider Setup**: Configure Blockfrost provider for mainnet/testnet
2. **Wallet Service**: Create `BlazeWalletService` wrapping existing CIP-30 detection
3. **UI Integration**: Add transfer functionality to existing wallet connection flow
4. **Error Handling**: Implement transaction status tracking and error messages

### File Structure for Blaze Integration
```
src/services/
├── BlazeWalletService.ts    # Blaze wallet abstraction service
├── BlazeProvider.ts         # Blockfrost provider configuration
└── TransactionService.ts    # ADA transfer utilities

src/scripts/
├── bifrost.ts              # Enhanced with Blaze support
├── types.ts                # Extended types for Blaze operations
└── global.d.ts             # Updated global declarations
```

## Levvy.V3 Wallet Integration Patterns

The proven wallet integration patterns from Levvy.V3 provide the foundation:

### Key Components (Blazor/C# + TypeScript)
- **dAppBridgeService.cs**: C# service for wallet operations
- **app.ts**: TypeScript wallet functions (`listWallets`, `connectWalletById`, `getBalance`)
- **bifrost.ts**: CIP-30 wallet detection utilities
- **Local Storage**: Wallet persistence patterns

### Successful Patterns to Preserve
1. **Wallet Detection**: Runtime enumeration of `window.cardano` wallets
2. **Connection Flow**: Modal-based wallet selection with state persistence
3. **Error Handling**: Robust error handling for connection failures
4. **Type Safety**: Comprehensive TypeScript types for all wallet operations

## Future Extension Possibilities

Beyond the immediate ADA transfer implementation, Blaze enables:

### Advanced DeFi Features
- **Token Operations**: ANGELS token transfers and management
- **Smart Contracts**: Aiken contract interactions for DeFi protocols
- **Liquidity Pool**: LP token operations for the 10% ANGELS LP allocation
- **Staking/Rewards**: Monthly ADA reward distribution mechanisms

### User Experience Enhancements
- **Transaction History**: Query and display user transaction history
- **Portfolio Tracking**: Real-time ANGELS token balance and portfolio value
- **Batch Operations**: Multiple transactions in a single user action
- **Gas Optimization**: Smart fee calculation and optimization

## Provider Configuration

### Blockfrost Integration
Blaze supports Blockfrost as the primary provider for Cardano network access:

```typescript
import { Blockfrost, Blaze } from '@blaze-cardano/sdk';

const provider = new Blockfrost({
  network: 'mainnet', // or 'preview' for testnet
  projectId: process.env.BLOCKFROST_PROJECT_ID
});
```

### Alternative Providers
- **Kupmios**: Alternative Cardano node interface
- **Maestro**: Professional Cardano API service
- **UTxORPC**: Universal UTxO RPC protocol

## Testing Strategy

### Browser Testing with Playwright
- **Wallet Connection**: Automated testing of wallet detection and connection
- **Transaction Flows**: End-to-end testing of ADA transfer functionality
- **Error Scenarios**: Testing of network errors, insufficient funds, etc.
- **Multi-Wallet**: Testing across different Cardano wallet implementations

### Integration Testing
- **Provider Connectivity**: Testing Blockfrost API integration
- **Transaction Building**: Validating transaction construction and fees
- **Wallet Compatibility**: Testing across major Cardano wallets (Yoroi, Eternl, Flint, etc.)

## Security Considerations

### Best Practices
- **Never Store Private Keys**: All signing operations handled by user's wallet
- **Validate Addresses**: Strict address validation before transaction submission
- **Amount Verification**: User confirmation for all transaction amounts
- **Network Validation**: Ensure transactions are submitted to correct network
- **Error Disclosure**: Careful error message handling to avoid information leakage

### Audit Trail
- **Transaction Logging**: Non-sensitive transaction metadata logging
- **User Actions**: Audit trail of user-initiated actions
- **Error Tracking**: Comprehensive error tracking and monitoring

## Development Timeline

### Immediate (Phase 1)
1. Install Blaze SDK and configure basic provider
2. Create minimal ADA transfer service
3. Integrate with existing wallet connection UI
4. Implement basic error handling and user feedback

### Future Phases
- **Phase 2**: Token operations and ANGELS-specific functionality
- **Phase 3**: Smart contract integration for DeFi features
- **Phase 4**: Advanced portfolio and analytics features

## Documentation References

- **Blaze Repository**: https://github.com/butaneprotocol/blaze-cardano
- **Cardano CIP-30**: Wallet connector standard
- **Blockfrost API**: https://blockfrost.io/
- **Levvy.V3 Reference**: `/home/rawriclark/Projects/Levvy.V3/src/Levvy.Web/`

## Notes

This document serves as the technical specification for Blaze integration. The implementation should leverage proven patterns from Levvy.V3 while modernizing with Blaze's enhanced transaction building capabilities.

The focus remains on the immediate need for simple ADA transfers while maintaining architecture that can evolve into comprehensive DeFi functionality as the Angel Finance ecosystem grows.