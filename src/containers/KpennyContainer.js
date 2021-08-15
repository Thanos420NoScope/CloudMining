import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/macro';
import FormContainer from '../components/shared/FormContainer';
import Input from '../components/shared/Input';
import Button from '../components/shared/Button';
import KPTxView from '../components/shared/KPTxView';
import { ReactComponent as KadenaLogo } from '../assets/images/crypto/kadena-logo.svg';
import { PactContext } from '../contexts/PactContext';
import {reduceBalance, extractDecimal} from '../utils/reduceBalance';
import { ReactComponent as CloseIcon } from '../assets/images/shared/cross.svg';
import pwError from '../components/alerts/pwError'
import { Message, Divider, Dimmer, Loader } from 'semantic-ui-react'
import Table from "react-bootstrap/Table";
import '../styles/inputoverride.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  position: absolute;
  top: 200px;
`;

const Label = styled.span`
  font-size: 13px;
  font-family: neue-bold;
  text-transform: capitalize;
`;

const KpennyContainer = ({ data }) => {

  const pact = React.useContext(PactContext);

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTxModal, setShowTxModal] = useState(false);

  const getButtonLabel = () => {
    if (!pact.account.account) return 'Connect your KDA wallet';
    if (!pact.hasWallet()) return 'Set signing method in wallet';
    if (!amount) return 'Enter an amount';
    if (amount > pact.account.balance) return `Insufficient KDA balance`
    if (amount < 5) return `Minimum buy is 5KDA`
    return 'Buy';
  };

  const getButtonLabel2 = () => {
    if (!pact.account.account) return 'Connect your KDA wallet';
    if (!pact.hasWallet()) return 'Set signing method in wallet';
    return 'Withdraw';
  };

  const getButtonLabel3 = () => {
    if (!pact.account.account) return 'Connect your KDA wallet';
    if (!pact.hasWallet()) return 'Set signing method in wallet';
    return 'Spread Rewards';
  };

  return (
    <Container>
      <KPTxView
        show={showTxModal}
        amtKda={amount}
        onClose={() => setShowTxModal(false)}
        isRedeem={false}
      />
    <ColumnContainer >
      <Message style={{ marginBottom: 40, textAlign: "center"}}>
        <Message.Header>Cloud Mining Experiment</Message.Header>
        <br/>
        <Message.Content>
          Buy shares of a miner. Get rewards every pool payout. Never worry about managing the miner.
        </Message.Content>
        <Message.Content>
          The price is measured based on the miner cost and an approximation of electricity cost over the KD5 lifetime.
        </Message.Content>
        <Message.Content>
          Purchase and rewards are permanent until the KD5 breaks. NO refunds.
        </Message.Content>
        <Message.Content>
          TESTNET. I WILL SEND COINS ONCE IN A WHILE TO SIMULATE POOL PAYMENTS.
        </Message.Content>
        <Message.Content>
          NO PARTICIPATION = NO MAINNET.
        </Message.Content>
        <Message.Content>
          MINIMUM BUY 5KDA
        </Message.Content>
      </Message>
      <FormContainer title="Buy shares"  containerStyle={{ marginBottom: 40, maxWidth: 500 }}>
        <Input
          placeholder="amount to buy"
          numberOnly
          value={amount}
          onChange={async (e, { value }) => {
            setAmount(value)
          }}
        />
        <>
        <RowContainer>
          <Label>Price</Label>
          <span>1 KDA per share</span>
         </RowContainer>
         <RowContainer>
           <Label>Shares left</Label>
           <span>{pact.sharesLeft}</span>
         </RowContainer>
         <RowContainer>
           <Label>Total Shares</Label>
           <span>26875</span>
         </RowContainer>
       </>
        {(getButtonLabel() === "Buy"
          ?
            <>
              <RowContainer>
               <Label>Get</Label>
               <span>{amount / 268.75}% of the miner revenue</span>
             </RowContainer>
           </>
          :
            <></>
        )}
        <Button
          buttonStyle={{ marginTop: 24, marginRight: 0 }}
          disabled={getButtonLabel() !== "Buy" || isNaN(amount)}
          loading={loading}
          onClick={async () => {
            setLoading(true)
            if (pact.signing.method !== 'sign') {
              const res = await pact.kpennyReserveLocal(amount)
              if (res === -1) {
                setLoading(false)
                //error alert
                if (pact.localRes) pwError();
                return
              } else {
                setShowTxModal(true)
                setLoading(false)
              }
            } else {
              pact.kpennyReserveWallet(amount)
              setLoading(false)
            }
            setAmount("");
          }}
        >
          {getButtonLabel()}
        </Button>
        <RowContainer>
          <Label>Personal Rewards available</Label>
          <span>{pact.pendingRewards} KDA</span>
        </RowContainer>
        <Button
          buttonStyle={{ marginTop: 24, marginRight: 0 }}
          enabled={getButtonLabel2() !== "Withdraw" || isNaN(amount)}
          loading={loading}
          onClick={async () => {
            setLoading(true)
            if (pact.signing.method !== 'sign') {
              const res = await pact.kpennyRedeemLocal(amount)
              if (res === -1) {
                setLoading(false)
                //error alert
                if (pact.localRes) pwError();
                return
              } else {
                setShowTxModal(true)
                setLoading(false)
              }
            } else {
              pact.kpennyRedeemWallet(amount)
              setLoading(false)
            }
            setAmount("");
          }}
        >
          {getButtonLabel2()}
        </Button>
        <RowContainer>
          <Label>Group Rewards available</Label>
          <span>{pact.pendingRewardsAll} KDA</span>
        </RowContainer>
        <Button
          buttonStyle={{ marginTop: 24, marginRight: 0 }}
          enabled={getButtonLabel3() !== "spread" || isNaN(amount)}
          loading={loading}
          onClick={async () => {
            setLoading(true)
            if (pact.signing.method !== 'sign') {
              const res = await pact.kpennySpreadLocal(amount)
              if (res === -1) {
                setLoading(false)
                //error alert
                if (pact.localRes) pwError();
                return
              } else {
                setShowTxModal(true)
                setLoading(false)
              }
            } else {
              pact.kpennySpreadWallet(amount)
              setLoading(false)
            }
            setAmount("");
          }}
        >
          {getButtonLabel3()}
        </Button>
      </FormContainer>

        <FormContainer title="User Statistics" containerStyle={{ 
            marginBottom: 50, 
            minWidth: 1000,
            overflowY: 'scroll',
            maxHeight: 600
          }}>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Account</th>
                    <th>Shares</th>
                    <th>Profit</th>
                    <th>Balance</th>
                </tr>
                </thead>
                <tbody>
                  {pact.viewClients.map((object, i) =>
                      <tr>
                          <td>{i}</td>
                          <td>{object.account}</td>
                          <td>{object.shares}</td>
                          <td>{typeof (object.profit) === "number" ? object.profit : object.profit.decimal}</td>
                          <td>{typeof (object.balance) === "number" ? object.balance : object.balance.decimal}</td>
                      </tr>
                  )}
                </tbody>
            </Table>
        </FormContainer>

    </ColumnContainer>
    </Container>
  );
};

export default KpennyContainer;
