const localtunnel = require('localtunnel');

async function startTunnel() {
  try {
    const tunnel = await localtunnel({
      port: 5173,
      subdomain: 'nutri-german'
    });

    console.log('TUNNEL_URL:' + tunnel.url);

    tunnel.on('close', () => {
      console.log('Tunnel closed, restarting in 3s...');
      setTimeout(startTunnel, 3000);
    });

    tunnel.on('error', (err) => {
      console.error('Tunnel error:', err.message);
      tunnel.close();
    });
  } catch (err) {
    console.error('Error opening tunnel:', err.message);
    setTimeout(startTunnel, 5000);
  }
}

startTunnel();
