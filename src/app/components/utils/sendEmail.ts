import { webConfig } from './webConfig';

interface SendEmailProps<T> {
  body: Record<string, unknown>;
  onFailed: (error: Error) => void;
  onSuccess: (data: T) => void;
}

// const localUrl =
//   'localhost:9000/.netlify/functions/api/code-reroute/emails/beta-testers';
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
    `${webConfig.sendEmailBaseUrl}/code-reroute/emails/waitlist`,
    true,
  );
  httpClient.setRequestHeader('Content-type', 'application/json');
  httpClient.send(JSON.stringify(body));
};
