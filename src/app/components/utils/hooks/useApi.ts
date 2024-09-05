import { useCallback, useState } from 'react';
import { sendEmail } from '../sendEmail';

interface RequestStateSuccess<T> {
  type: 'REQUEST_SUCCESS';
  data: T;
}

export type RequestState<T> =
  | ReturnType<typeof requestInit | typeof requestStart | typeof requestError>
  | RequestStateSuccess<T>;

export type RequestStateType = RequestState<unknown>['type'];

const requestInit = () => ({ type: 'REQUEST_INIT', data: null } as const);

const requestStart = () => ({ type: 'REQUEST_START', data: null } as const);

const requestSuccess = <T>(data: T): RequestStateSuccess<T> =>
  ({ type: 'REQUEST_SUCCESS', data } as const);

const requestError = (error: Error) =>
  ({ type: 'REQUEST_ERROR', error, data: null } as const);

export const useApi = <T>() => {
  const [requestState, setRequestState] = useState<RequestState<T>>(
    requestInit(),
  );
  const onSuccess = useCallback(
    (data: T) => {
      setRequestState(requestSuccess(data));
    },
    [setRequestState],
  );
  const onFailed = useCallback(
    (error: Error) => {
      setRequestState(requestError(error));
    },
    [setRequestState],
  );
  const makeRequest = useCallback(
    async (body: Record<string, unknown>) => {
      setRequestState(requestStart());
      try {
        sendEmail({ onSuccess, onFailed, body });
        // eslint-disable-next-line
      } catch (error: any) {
        setRequestState(requestError(error));
      }
    },
    [setRequestState, onSuccess, onFailed],
  );
  return [requestState, makeRequest] as const;
};
