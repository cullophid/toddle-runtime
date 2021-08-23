import qs from "qs";

const getAuth0 = () => {
  return {
    clientId:
      localStorage.getItem("auth0ClientId") ??
      "Q7yX7hKowqI9b8N7sJr74cKab5SXblNP",
    domain: localStorage.getItem("auth0Domain") ?? "toddle.eu.auth0.com",
  };
};
const redirect_uri =
  typeof window === "undefined"
    ? ""
    : `${window.location.protocol}//${window.location.host}/login_callback`;

export type TokenResponse = {
  access_token: string;
  expires_in: number;
  id_token: string;
  scope: string;
  token_type: string;
};
export const verifyCode = async (code: string) => {
  const code_verifier = localStorage.getItem("code_verifier");
  if (!code_verifier) {
    throw new Error("No code verifer stored");
  }
  const tokenResult = await getToken(code, code_verifier);
  localStorage.setItem("id_token", tokenResult.id_token);
  return tokenResult;
};

export const authorize = async () => {
  if (typeof window === "undefined") {
    return;
  }
  const auth0 = getAuth0();

  const { code_challenge, code_verifier } = await getCodeChallengePair();
  const loginUrl = `https://${auth0.domain}/authorize${qs.stringify(
    {
      scope: "openid profile email",
      response_type: "code",
      client_id: auth0.clientId,
      redirect_uri,
      code_challenge,
      code_challenge_method: "S256",
    },
    { addQueryPrefix: true }
  )}`;

  localStorage.setItem("code_verifier", code_verifier);

  window.location.assign(loginUrl);
};

export const logout = () => {
  const auth0 = getAuth0();

  localStorage.removeItem("id_token");
  window.location.assign(
    `https://${auth0.domain}/v2/logout?client_id=${auth0.clientId}`
  );
};
export const getToken = async (code: string, code_verifier: string) => {
  const auth0 = getAuth0();
  const headers = new Headers({
    "content-type": "application/x-www-form-urlencoded",
  });

  const data = {
    grant_type: "authorization_code",
    client_id: auth0.clientId,
    code,
    code_verifier,
    redirect_uri,
  };
  const res = await fetch(`https://${auth0.domain}/oauth/token`, {
    method: "POST",
    headers,
    body: qs.stringify(data),
  });
  const tokenResult: TokenResponse = await res.json();
  localStorage.setItem("id_token", tokenResult.id_token);
  return tokenResult;
};

export const refreshToken = async (config?: { redirectOnFail: boolean }) => {
  const auth0 = getAuth0();
  const { code_challenge, code_verifier } = await getCodeChallengePair();
  const loginUrl = `https://toddle.eu.auth0.com/authorize${qs.stringify(
    {
      scope: "openid profile email",
      response_type: "code",
      client_id: auth0.clientId,
      redirect_uri,
      code_challenge,
      code_challenge_method: "S256",
      propt: "none",
      response_mode: "web_message",
    },
    { addQueryPrefix: true }
  )}`;

  try {
    const codeResult = await runIframe(loginUrl, `https://${auth0.domain}`);
    if (codeResult.code) {
      return await getToken(codeResult.code, code_verifier);
    }
  } catch (e) {
    if (config?.redirectOnFail) {
      window.location.href = "/login";
    }
    console.error("TOKEN ERROR", e);
    console.error("REFRESH ERROR", e);
  }

  throw new Error("missing code");
};

const createRandomString = () => {
  const charset =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_~.";
  let random = "";
  const randomValues = Array.from(
    window.crypto.getRandomValues(new Uint8Array(43))
  );
  randomValues.forEach((v) => (random += charset[v % charset.length]));
  return random;
};

const sha256 = async (s: string) => {
  const digestOp: any = window.crypto.subtle.digest(
    { name: "SHA-256" },
    new TextEncoder().encode(s)
  );

  return await digestOp;
};

const urlEncodeB64 = (input: string) => {
  const b64Chars: { [index: string]: string } = { "+": "-", "/": "_", "=": "" };
  return input.replace(/[+/=]/g, (m: string) => b64Chars[m]);
};

const bufferToBase64UrlEncoded = (input: number[] | Uint8Array) => {
  const ie11SafeInput = new Uint8Array(input);
  return urlEncodeB64(
    window.btoa(String.fromCharCode(...Array.from(ie11SafeInput)))
  );
};

const getCodeChallengePair = async () => {
  const code_verifier = createRandomString();
  localStorage.setItem("code_verifier", code_verifier);
  const code_challengeBuffer = await sha256(code_verifier);
  const code_challenge = bufferToBase64UrlEncoded(code_challengeBuffer);

  return { code_challenge, code_verifier };
};
export type AuthenticationResult = {
  state: string;
  code?: string;
  error?: string;
  error_description?: string;
};

const runIframe = (
  authorizeUrl: string,
  eventOrigin: string,
  timeoutInSeconds: number = 60
) => {
  return new Promise<AuthenticationResult>((res, rej) => {
    const iframe = window.document.createElement("iframe");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "100%");
    iframe.style.position = "fixed";
    iframe.style.left = "0";
    iframe.style.top = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";

    const removeIframe = () => {
      if (window.document.body.contains(iframe)) {
        window.document.body.removeChild(iframe);
      }
    };

    const timeoutSetTimeoutId = setTimeout(() => {
      rej(new TimeoutError());
      removeIframe();
    }, timeoutInSeconds * 1000);

    const iframeEventHandler = function(e: MessageEvent) {
      if (e.origin != eventOrigin) return;
      if (!e.data || e.data.type !== "authorization_response") return;
      const eventSource = e.source;
      if (eventSource) {
        (eventSource as any).close();
      }
      e.data.response.error
        ? rej(GenericError.fromPayload(e.data.response))
        : res(e.data.response);
      clearTimeout(timeoutSetTimeoutId);
      window.removeEventListener("message", iframeEventHandler, false);
      // Delay the removal of the iframe to prevent hanging loading status
      // in Chrome: https://github.com/auth0/auth0-spa-js/issues/240
      setTimeout(removeIframe, 2000);
    };
    window.addEventListener("message", iframeEventHandler, false);
    window.document.body.appendChild(iframe);

    iframe.setAttribute("src", authorizeUrl);
  });
};

class GenericError extends Error {
  constructor(public error: string, public error_description: string) {
    super(error_description);

    Object.setPrototypeOf(this, GenericError.prototype);
  }

  static fromPayload({
    error,
    error_description,
  }: {
    error: string;
    error_description: string;
  }) {
    return new GenericError(error, error_description);
  }
}

class TimeoutError extends GenericError {
  constructor() {
    super("timeout", "Timeout");
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}
