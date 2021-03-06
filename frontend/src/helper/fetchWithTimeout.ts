interface RequestTimeout extends RequestInit {
  timeout?: number,
}

async function fetchWithTimeout(url: string, options:RequestTimeout = {}) {
  const { timeout = 6000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(url, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}

export default fetchWithTimeout;
