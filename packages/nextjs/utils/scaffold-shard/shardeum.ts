import { defineChain } from "viem";

/**
 * Shardeum Mezame Testnet Chain Definition
 * Chain ID: 8119
 * RPC URL: https://api-mezame.shardeum.org/
 * Faucet: https://faucet-mezame.shardeum.org/
 * Explorer: https://explorer-mezame.shardeum.org/
 */
export const shardeumSphinx = defineChain({
    id: 8119,
    name: "Shardeum Mezame",
    nativeCurrency: {
        decimals: 18,
        name: "Shardeum",
        symbol: "SHM",
    },
    rpcUrls: {
        default: {
            http: ["https://api-mezame.shardeum.org/"],
        },
        public: {
            http: ["https://api-mezame.shardeum.org/"],
        },
    },
    blockExplorers: {
        default: {
            name: "Shardeum Explorer",
            url: "https://explorer-mezame.shardeum.org",
        },
    },
    testnet: true,
});
