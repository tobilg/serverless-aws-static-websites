module.exports.handler = (data, serverless, options) => {
    serverless.cli.log(`DNS nameservers to be configured with your '${serverless.providers.aws.options.domain}' domain: ${data.HostedZoneNameservers}`);
};
