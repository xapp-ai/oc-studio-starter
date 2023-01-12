## OC Studio Starter Template

A starter template for OC Studio leveraging 📣 stentor conversational framework.

### Sample .env

```
AWS_REGION=us-east-1
STUDIO_APP_ID=
STUDIO_TOKEN=
USER_STORAGE_TABLE=
LEX_BOT_ID=
LEX_BOT_ALIAS_ID=
```

### Deploying

Make sure you set your `AWS_PROFILE` to one that has administrative privileges before you deploy using the following command from app root (`cd packages/app`):

```bash
yarn deploy:prod
```

### Running Locally

From app root (`cd packages/app`), you can run an express server that calls your handler with:

```bash
yarn start
```

Optional: Then also at app root in another terminal:

```bash
xapp serve
```

Which will then serve the app's chat widget channel.
