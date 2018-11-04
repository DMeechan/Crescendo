// Source: Leonid Shevtsov
// https://leonid.shevtsov.me/post/demystifying-s3-browser-upload/

const crypto = require('crypto');
const awsConfig = require('../credentials').aws;

function s3Credentials(filename) {
  const config = awsConfig;
  return {
    endpoint_url: `https://s3-${config.region}.amazonaws.com/${config.bucket}`,
    params: s3Params(config, filename),
  };
}

// Returns the parameters that must be passed to the API call
function s3Params(config, filename) {
  const credential = amzCredential(config);
  const policy = s3UploadPolicy(config, filename, credential);
  const policyBase64 = new Buffer(JSON.stringify(policy)).toString('base64');
  return {
    key: filename,
    acl: 'public-read',
    success_action_status: '201',
    policy: policyBase64,
    'x-amz-algorithm': 'AWS4-HMAC-SHA256',
    'x-amz-credential': credential,
    'x-amz-date': dateString() + 'T000000Z',
    'x-amz-signature': s3UploadSignature(config, policyBase64, credential),
  };
}

function dateString() {
  var date = new Date().toISOString();
  return date.substr(0, 4) + date.substr(5, 2) + date.substr(8, 2);
}

function amzCredential(config) {
  return [
    config.accessKey,
    dateString(),
    config.region,
    's3/aws4_request',
  ].join('/');
}

// Constructs the policy
function s3UploadPolicy(config, filename, credential) {
  return {
    // 2 minutes into the future
    expiration: new Date(new Date().getTime() + 2 * 60 * 1000).toISOString(),
    conditions: [
      { bucket: config.bucket },
      { key: filename },
      { acl: 'public-read' },
      { success_action_status: '201' },
      // Optionally control content type and file size
      // {'Content-Type': 'application/pdf'},
      ['content-length-range', 0, 1000000],
      { 'x-amz-algorithm': 'AWS4-HMAC-SHA256' },
      { 'x-amz-credential': credential },
      { 'x-amz-date': dateString() + 'T000000Z' },
    ],
  };
}

function hmac(key, string) {
  const hmac = crypto.createHmac('sha256', key);
  hmac.end(string);
  return hmac.read();
}

// Signs the policy with the credential
function s3UploadSignature(config, policyBase64, credential) {
  const dateKey = hmac('AWS4' + config.secretKey, dateString());
  const dateRegionKey = hmac(dateKey, config.region);
  const dateRegionServiceKey = hmac(dateRegionKey, 's3');
  const signingKey = hmac(dateRegionServiceKey, 'aws4_request');
  return hmac(signingKey, policyBase64).toString('hex');
}

module.exports = {
  run: s3Credentials,
};
