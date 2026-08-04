# @pipeworx/ipify

[ipify](https://www.ipify.org/) MCP — keyless "what is my public IP" echo.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `ipv4()` — caller's IPv4 (as gateway sees it — note: this is the CF Worker egress IP, not the upstream caller)
- `ipv6()` — caller's IPv6

When called via the pipeworx gateway, the returned IP is the Cloudflare egress IP that fetched the upstream — not the LLM/agent IP. Useful for verifying egress IPs / smoke tests.

## Data source

`https://api.ipify.org`, `https://api64.ipify.org`

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "ipify": {
      "url": "https://gateway.pipeworx.io/ipify/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Ipify data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
