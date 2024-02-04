const path = require("path");

const {
  exchangeNpssoForCode,
  exchangeCodeForAccessToken,
  exchangeRefreshTokenForAuthTokens,
  getUserTitles,
  makeUniversalSearch,
  getProfileFromUserName,
} = require("psn-api");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const psnToken = process.env.PSN_TOKEN;

async function getAuthorization() {
  const accessCode = await exchangeNpssoForCode(psnToken);
  console.log("getAuth");
  const authorization = await exchangeCodeForAccessToken(accessCode);
  const updatedAuthorization = await exchangeRefreshTokenForAuthTokens(authorization.refreshToken);
  return updatedAuthorization;
}

async function getAccessToken() {
  const authorization = await getAuthorization();
  return authorization.accessToken;
}

async function getPSNTitles() {
  const accessToken = await getAccessToken();
  const userTitlesResponse = await getUserTitles({ accessToken }, "me");
  console.log(userTitlesResponse);
  return userTitlesResponse;
}

async function getPSNUser() {
  const authorization = await getAuthorization();
  const response = await getProfileFromUserName(authorization, "Derigion");

  console.log(response);
  return response;
}

module.exports = {
  psnToken,
  getPSNTitles,
  getPSNUser,
};
