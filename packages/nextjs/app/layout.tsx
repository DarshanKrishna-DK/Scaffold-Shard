import "@rainbow-me/rainbowkit/styles.css";
import "@scaffold-ui/components/styles.css";
import { ScaffoldShardAppWithProviders } from "~~/components/ScaffoldShardAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-shard/getMetadata";

export const metadata = getMetadata({
  title: "Scaffold-Shard App",
  description: "Built with 🏗 Scaffold-Shard for Shardeum",
});

const ScaffoldShardApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem>
          <ScaffoldShardAppWithProviders>{children}</ScaffoldShardAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldShardApp;
