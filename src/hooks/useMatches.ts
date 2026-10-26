import { useEffect, useRef, useState } from 'react';
import { MATCHES_URL } from '../config';
import { type MatchesResponse, parseMatchesResponse } from '../matches';

type LoadState =
  | { status: 'loading' }
  | { status: 'error' }
  | {
    status: 'success'; data: MatchesResponse; updatedAt: Date;
    refreshing: boolean; refreshError: boolean;
  };

export function useMatches() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const requestInFlight = useRef(true);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    function showError() {
      setState((previous) => previous.status === 'success'
        ? { ...previous, refreshing: false, refreshError: true }
        : { status: 'error' });
    }
    const timeout = setTimeout(() => {
      // Commit the recoverable state even if a transport ignores cancellation.
      if (active) showError();
      requestInFlight.current = false;
      active = false;
      controller.abort();
    }, 15_000);

    async function load() {
      try {
        const response = await fetch(MATCHES_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = parseMatchesResponse(await response.json());
        if (active) setState({
          status: 'success', data, updatedAt: new Date(), refreshing: false, refreshError: false,
        });
      } catch {
        if (active) showError();
      } finally {
        clearTimeout(timeout);
        if (active) requestInFlight.current = false;
      }
    }
    void load();

    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);

  function retry() {
    if (requestInFlight.current) return;
    requestInFlight.current = true;
    setState((previous) => previous.status === 'success'
      ? { ...previous, refreshing: true, refreshError: false }
      : { status: 'loading' });
    setAttempt((previous) => previous + 1);
  }

  return { state, retry, refresh: retry };
}
