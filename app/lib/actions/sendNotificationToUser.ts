import axios from "axios";
import { GoogleAuth } from "google-auth-library";

const serviceAccount = {
  type: "service_account",
  project_id: process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
  client_id: process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_CLIENT_CERT_URL,
  universe_domain: "googleapis.com",
};

// Create a GoogleAuth instance
const auth = new GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});

async function getAccessToken() {
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  return accessToken.token;
}

export default async function sendNotificationToUser(
  token: string,
  title: string,
  body: string,
) {
  const notificationDetails = {
    message: {
      notification: {
        title,
        body,
      },
      token,
      data: {
        link: process.env.NEXT_PUBLIC_BASE_URL,
      },
    },
  };

  try {
    const accessToken = await getAccessToken();

    const response = await axios.post(
      `https://fcm.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_PROJECT_ID}/messages:send?key=AIzaSyBTAcMkbsVJzZh4dNeL-U9k7pLWk5qAQ0Q`,
      notificationDetails,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response.data);
  } catch (error: any) {
    console.error("Error sending notification:", error.response?.data || error);
  }
}
