// https://usehooks-ts.com/react-hook/use-fetch
/* eslint no-void: ["error", { "allowAsStatement": true }] */
import { useEffect, useReducer, useRef } from 'react';

interface State<T> {
  data?: T,
  error?: Error
}

type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

function useFetch<T = unknown>(url?: string, options?: RequestInit): State<T> {
  const cache = useRef<Cache<T>>({});

  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState };
      case 'fetched':
        return { ...initialState, data: action.payload };
      case 'error':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // return undefined because of consistent-return rule
    // 'This rule requires return statements to either always or never specify values'
    // if not lint will accuse a problem at the unmount
    if (!url) return undefined;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: 'loading' });

      if (cache.current[url]) {
        dispatch({ type: 'fetched', payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;
        cache.current[url] = data;
        if (cancelRequest.current) return;

        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: 'error', payload: error as Error });
      }
    };

    void fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [url]);

  return state;
}

export default useFetch;
