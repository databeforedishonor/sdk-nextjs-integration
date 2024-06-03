const contractABI = JSON.stringify([
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          name: '',
          type: 'string'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },

{
  constant: false,
  inputs: [
    {
      name: 'amountIn',
      type: 'uint256'
    },
    {
      name: 'amountOutMin',
      type: 'uint256'
    },
    {
      name: 'path',
      type: 'address[]'
    },
    {
      name: 'to',
      type: 'address'
    },
    {
      name: 'deadline',
      type: 'uint256'
    }
  ],
  name: 'swapExactTokensForETH',
  outputs: [
    {
      name: 'amounts',
      type: 'uint256[]'
    }
  ],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
},
{
  constant: false,
  inputs: [
    {
      name: 'spender',
      type: 'address'
    },
    {
      name: 'value',
      type: 'uint256'
    }
  ],
  name: 'approve',
  outputs: [
    {
      name: '',
      type: 'bool'
    }
  ],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
},
{
  constant: false,
  inputs: [
    {
      name: 'amountIn',
      type: 'uint256'
    },
    {
      name: 'amountOutMin',
      type: 'uint256'
    },
    {
      name: 'path',
      type: 'address[]'
    },
    {
      name: 'to',
      type: 'address'
    },
    {
      name: 'deadline',
      type: 'uint256'
    }
  ],
  name: 'swapExactTokensForTokens',
  outputs: [
    {
      name: 'amounts',
      type: 'uint256[]'
    }
  ],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
},

{
  constant: false,
  inputs: [
    {
      name: 'amountOutMin',
      type: 'uint256'
    },
    {
      name: 'path',
      type: 'address[]'
    },
    {
      name: 'to',
      type: 'address'
    },
    {
      name: 'deadline',
      type: 'uint256'
    }
  ],
  name: 'swapExactETHForTokens',
  outputs: [
    {
      name: 'amounts',
      type: 'uint256[]'
    }
  ],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
},
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [
        {
          name: '',
          type: 'string'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [
        {
          name: '',
          type: 'uint8'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address"
        }
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: "getReserves",
      outputs: [
        {
          internalType: "uint112",
          name: "_reserve0",
          type: "uint112"
        },
        {
          internalType: "uint112",
          name: "_reserve1",
          type: "uint112"
        },
        {
          internalType: "uint32",
          name: "_blockTimestampLast",
          type: "uint32"
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
  {
    constant: true,
    inputs: [],
    name: "allPairsLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "allPairs",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: "MINIMUM_LIQUIDITY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: "VTHO_CONTRACT_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: "WETH",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "burn",
    outputs: [
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address"
      }
    ],
    name: "claimGeneratedVTHO",
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]"
      }
    ],
    name: "getAmountsIn",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]"
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]"
      }
    ],
    name: "getAmountsOut",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]"
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address"
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address"
      }
    ],
    name: "getPair",
    outputs: [
      {
        internalType: "address",
        name: "pair",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },

  {
    constant: true,
    inputs: [],
    name: "getReserves",
    outputs: [
      {
        internalType: "uint112",
        name: "_reserve0",
        type: "uint112"
      },
      {
        internalType: "uint112",
        name: "_reserve1",
        type: "uint112"
      },
      {
        internalType: "uint32",
        name: "_blockTimestampLast",
        type: "uint32"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "token1",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "token0",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
  ]);


  export { contractABI };