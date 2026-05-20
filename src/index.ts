interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * ipify MCP.
 */


const UA = 'pipeworx-mcp-ipify/1.0 (+https://pipeworx.io)';

const tools: McpToolExport['tools'] = [
  { name: 'ipv4', description: "Caller's IPv4 (gateway egress IP).", inputSchema: { type: 'object', properties: {} } },
  { name: 'ipv6', description: "Caller's IPv6 (gateway egress IP, IPv4 fallback).", inputSchema: { type: 'object', properties: {} } },
];

async function callTool(name: string, _args: Record<string, unknown>): Promise<unknown> {
  const get = async (url: string) => {
    const res = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': UA } });
    if (!res.ok) throw new Error(`ipify: ${res.status}`);
    return res.json();
  };
  switch (name) {
    case 'ipv4':
      return get('https://api.ipify.org?format=json');
    case 'ipv6':
      return get('https://api64.ipify.org?format=json');
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
