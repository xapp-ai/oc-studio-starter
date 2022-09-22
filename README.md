## OC Studio Starter Template

A starter template repository for OC Studio leveraging 📣 stentor conversational framework.

## Repository Structure

This is a monorepo with four main packages found under `/packages`.

### App /packages/app

The main app that is deployed to an AWS Lambda. It is setup to communicate with OC Studio to retreive content and send events, use DynamoDB as your runtime database, and Lex V2 as your NLU.

### Components /packages/components

Custom components for extending the chat widget channel.

### Models /packages/models

Shared models across all the packages, specifically the app and components.

### Template /packages/templates

Starting point of content and interaction model.
