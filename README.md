# serverless-aws-static-websites
A blueprint for hosting static websites on AWS with CloudFront, S3, ACM and Route53.

It will host your static website on S3, completely with SSL certificates, `www`-subdomain redirection and a CloudFront distribution.

## Preconditions
This guide assumes that you have a pre-existing domain which you want to use for hosting your static website. Furthermore, you need to have access to the domain's DNS configuration.

Also, you need to have an install of [Serverless](https://www.serverless.com) on your machine.

## How-to
To use this blueprint with your own static websites, you can fork this repo in GitHub and then customize it to match your needs.

### Fork and clone
One you forked the repo, you can clone it locally via

```bash
$ git clone git@github.com:youraccount/yourrepo.git
```

where `youraccount/yourrepo` needs to be replaced with the actual repository name of your forked repo.

### Create your static website
You can now create your static website in the `src` folder of your cloned repo.

### Deploy
You can deploy your static website with the following command:

```bash
$ sls deploy --domain yourdomain.yourtld
```

where `yourdomain.yourtld` needs to be replaced with your actual domain name.

#### Manual update of DNS records on first deploy
On the first deploy, it is necessary to update the DNS setting for the domain manually, otherwise the hosted zone will not be able to be established.

Therefore, once you triggered the `sls deploy` command, you need to log into the AWS console, go to the [Hosted Zones](https://console.aws.amazon.com/route53/home?region=eu-central-1#hosted-zones:) menu and select the corresponding domain name you used for the deployment.

The nameservers you have to configure your domain DNS to can be found under the `NS` record and will look similar to this:

```bash
ns-1807.awsdns-33.co.uk.
ns-977.awsdns-58.net.
ns-1351.awsdns-40.org.
ns-32.awsdns-04.com.
```

You should then update your DNS settings for your domain with those values, **otherwise the stack creation process will fail**.

This is a bit misfortunate, but to the best of knowledge there's currently no other way possible if you use AWS external (non-Route53) domains.

#### Deployment process time
As a new CloudFront distribution is created (which is pretty slow), it can take **up to 45min** for the initial deploy to finish. This is normal and expected behavior.

### Post-deploy
If the deployment finished successfully, you will be able to access your domain via `https://www.yourdomain.yourtld` and `https://yourdomain.yourtld`.

This setup should give you some good [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=en) results.

### Updates
For every update of your website, you can trigger a deploy as stated above.

## Removal
If you want to remove the created stack, your will have to delete all records of the Hosted Zone of the respective domain except the `SOA` and `NS` records, otherwise the stack deletion via

```bash
$ sls remove --domain yourdomain.yourtld
```

will fail.
