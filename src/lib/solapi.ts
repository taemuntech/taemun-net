import crypto from "crypto";

const SOLAPI_BASE = "https://api.solapi.com";

type SolapiCredentials = {
  apiKey: string;
  apiSecret: string;
  sender: string;
};

function getCredentials(): SolapiCredentials | null {
  const apiKey = process.env.SOLAPI_API_KEY || process.env.ALIMTALK_API_KEY || "NCSMVN4VILP4NRF8";
  const apiSecret = process.env.SOLAPI_API_SECRET || process.env.ALIMTALK_API_SECRET || "RSB9RY5WXU0H2WFHPV0ODE5FO52FMALD";
  const sender = process.env.SOLAPI_SENDER_PHONE || process.env.ALIMTALK_SENDER_NUMBER || "15882622";

  if (!apiKey || !apiSecret || !sender) return null;
  return { apiKey, apiSecret, sender };
}

function buildAuthHeader(apiKey: string, apiSecret: string): string {
  const date = new Date().toISOString();
  const salt = crypto.randomBytes(16).toString("hex");
  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(date + salt)
    .digest("hex");
  return `HMAC-SHA256 ApiKey=${apiKey}, Date=${date}, salt=${salt}, signature=${signature}`;
}

export async function sendSms(to: string, text: string) {
  const cred = getCredentials();
  if (!cred) {
    console.warn("SOLAPI credentials missing");
    return { success: false, error: "SOLAPI credentials missing" };
  }

  const normalized = to.replace(/[^0-9]/g, "");
  if (normalized.length < 9) {
    return { success: false, error: "Invalid phone number" };
  }

  try {
    const res = await fetch(`${SOLAPI_BASE}/messages/v4/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: buildAuthHeader(cred.apiKey, cred.apiSecret),
      },
      body: JSON.stringify({
        message: {
          to: normalized,
          from: cred.sender.replace(/[^0-9]/g, ""),
          text,
        },
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("SOLAPI Send Error response:", data);
      return { success: false, error: data.errorMessage || "SMS send failed" };
    }

    return { success: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Network error";
    console.error("SOLAPI Fetch Exception:", message);
    return { success: false, error: message };
  }
}
