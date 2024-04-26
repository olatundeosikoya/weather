// your config code

import algosdk from "algosdk";

const algodToken = "a".repeat(64);
const server = "http://localhost";
const port = "4001";

const mnemonic = "cycle judge beef gesture carry library sauce steel dog zoo mango eternal taxi obtain bring talent gauge custom monitor lonely law morning rack absorb favorite";

export function getClient() {
  const client = new algosdk.Algodv2(algodToken, server, port);
  return client;
}

export function getAccount() {
  const account = algosdk.mnemonicToSecretKey(mnemonic);
  return account;
}
