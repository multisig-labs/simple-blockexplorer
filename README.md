# Simple Blockexplorer

This blockexplorer is a client-only (i.e. serverless) block explorer, where the client makes RPC calls directly to the blockchain node.

- Search bar to directly query an address / transaction / block.
- Changeable RPC URL with chain ID verification.
- Custom known addresses for better UX.
- Light & dark theme support.


## Usage

Clone the repo, and just `yarn`. Then, `yarn dev` to run the web app locally. Enter the RPC url and the chain ID to the settings button on the top right.

## Required RPC Endpoints

The connected node must support the following:

- [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber)
- [`eth_call`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call)
- [`eth_getBalance`](https://eth.wiki/json-rpc/API#eth_getbalance)
- [`eth_getCode`](https://eth.wiki/json-rpc/API#eth_getcode)
- [`eth_getBlockByHash`](https://eth.wiki/json-rpc/API#eth_getblockbyhash)
- [`eth_getBlockByNumber`](https://eth.wiki/json-rpc/API#eth_getblockbynumber)
- [`eth_getTransactionByHash`](https://eth.wiki/json-rpc/API#eth_gettransactionbyhash)
- [`eth_getTransactionByBlockHashAndIndex`](https://eth.wiki/json-rpc/API#eth_gettransactionbyblockhashandindex)
- [`eth_getTransactionByBlockNumberAndIndex`](https://eth.wiki/json-rpc/API#eth_gettransactionbyblocknumberandindex)
- [`eth_getTransactionReceipt`](https://eth.wiki/json-rpc/API#eth_gettransactionreceipt)
- [`eth_getUncleByBlockHashAndIndex`](https://eth.wiki/json-rpc/API#eth_getunclebyblockhashandindex)
- [`eth_getLogs`](https://eth.wiki/json-rpc/API#eth_getlogs)

Inspired from [blockscout](https://docs.blockscout.com/for-developers/information-and-settings/node-tracing-json-rpc-requirements).

# Misc
I looked through different options for block explorers -> Seems like there's 2 different main kinds. 
* One that has an indexer and has a kinda complex setup and needs infra
	* BlockScout -  ($600/mo for their lowest production plan lol). For self hosting, setting up the infra seems like a pain. 
	* Explorer as a service providers
* RPC only (slow but needs no infra)
	* Expedition - seems to be dead? Not updated for years
	* Simple Block explorer (https://github.com/erhant/simple-blockexplorer) what I decided to start with.
	* Had trouble finding other options for RPC only



## How to use
How it works: Can pass in any l1 RPC url for the block explorer. The frontend gets the RPC url from the query params and sets it in context. Currently only accepts the RPC query param on the `/` route but could be easily changed. 
https://l1-explorer.vercel.app/?rpc=https://node.l1marketplace.com/ext/bc/5mEwEcPTRnezL4asCZSRx1ED1XB5dx8UyQNnuSWGR21C3awzB/rpc


Repo: https://github.com/multisig-labs/simple-blockexplorer
