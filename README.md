# CloudMining

npm install

npm start

http://localhost:3000/

## Todo
### UI
- Disable `Withdraw` button when pendingRewards is under 0.1 KDA
- Disable `Spread Rewards` button when pendingRewardsAll balance is under 1 KDA
### Contract
- Execute `sendpayment` before every `buy`*

*Tiny abuse vector IF there is rewards to be spread when buying  
*Can steal part of a single payout by _buying, then spreading rewards right after_
