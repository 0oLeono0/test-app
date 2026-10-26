import { useEffect, useState } from 'react';
import { MATCHES_URL } from '../config';
import { type MatchesResponse, parseMatchesResponse } from '../matches';

type LoadState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; data: MatchesResponse };

export function useMatches() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch(MATCHES_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = parseMatchesResponse(await response.json());
        if (active) setState({ status: 'success', data });
      } catch {
        if (active) setState({ status: 'error' });
      }
    }
    void load();

    return () => {
      active = false;
      controller.abort();
    };
  }, [attempt]);

  function retry() {
    if (state.status === 'loading') return;
    setState({ status: 'loading' });
    setAttempt((previous) => previous + 1);
  }

  return { state, retry };
}
