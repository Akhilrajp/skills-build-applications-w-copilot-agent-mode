export function getApiUrl(path) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME || '';
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

  if (hostname.includes('app.github.dev')) {
    if (hostname.includes('-5173.')) {
      return `https://${hostname.replace('-5173.', '-8000.')}/api/${path}`;
    }

    if (codespaceName) {
      return `https://${codespaceName}-8000.app.github.dev/api/${path}`;
    }
  }

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/${path}`;
  }

  return `http://localhost:8000/api/${path}`;
}
