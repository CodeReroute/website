import { webConfig } from './webConfig';

interface SendEmailProps<T> {
  body: Record<string, unknown>;
  onFailed: (error: Error) => void;
  onSuccess: (data: T) => void;
}

export const sendEmail = <T>({
  onFailed,
  onSuccess,
  body,
}: SendEmailProps<T>) => {
  const httpClient = new XMLHttpRequest();
  httpClient.onreadystatechange = () => {
    if (httpClient.readyState !== 4) {
      return null;
    }
    if (httpClient.status === 200) {
      onSuccess(httpClient.response);
    } else {
      onFailed(httpClient.response);
    }
  };
  httpClient.open(
    'POST',
    `${webConfig.sendEmailBaseUrl}/social-reroute/emails/form-submission`,
    true,
  );
  httpClient.setRequestHeader('Content-type', 'application/json');
  httpClient.send(JSON.stringify(body));
};
