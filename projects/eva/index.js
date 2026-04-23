const ADDRESSES = require('../helper/coreAssets.json')

const tokens = {
  evaUSDC: '0x741bD193B6b40f8703d2e116FD1965421f290F58',
  evaUSDT: '0x501eBf66d76A96D4FB26ccead42957653e16B8B8',
  evaETH: '0xdBECD077c1C2feFDCB75f547d1b5a73BF8207e4C',
}

const underlyings = {
  evaUSDC: ADDRESSES.ethereum.USDC,
  evaUSDT: ADDRESSES.ethereum.USDT,
  evaETH: ADDRESSES.ethereum.WETH,
}

async function tvl(api) {
  const supplies = await api.multiCall({ abi: 'erc20:totalSupply', calls: Object.values(tokens) })
  Object.keys(tokens).forEach((key, i) => {
    api.add(underlyings[key], supplies[i])
  })
}

module.exports = {
  methodology: 'TVL is the total supply of each eva token, backed 1:1 by the underlying asset (USDC, USDT, ETH) via Wildcat lending markets.',
  ethereum: { tvl },
}
