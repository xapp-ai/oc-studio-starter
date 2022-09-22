## OC Studio Starter Template

A starter template for OC Studio leveraging 📣 stentor conversational framework.

## Repository Structure

This is a monorepo with four main packages found under `/packages`.

### App /packages/app

The main app that is deployed to an AWS Lambda. It is setup to communicate with OC Studio to retreive content and send events.

### Components /packages/components

### Models /packages/models

### Template /packages/templates

### Sample .env

```
AWS_REGION=us-east-1
STUDIO_APP_ID=
USER_STORAGE_TABLE=
```

### Running Locally

From app root

```bash
yarn start
```
