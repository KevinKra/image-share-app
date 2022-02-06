# Phases

These phases and solutions are tailored around AWS integrations.

## Phase 1

### S3, IAM, Cognito

- [ ] identity pool created, role-based IAM policy configurations set.
- [ ] unauth users (guests) can list and _temporarily_ put objects in bucket.
- [ ] user pool created, role-based IAM policy configurations set.
- [ ] guests can login and/or register.
- [ ] auth user can **put** objects in **their** _user-unique_ folder within the bucket.
- [ ] auth user can **delete** objects in **their** _user-unique_ folder within the bucket.
- [ ] auth user can **get** objects from _user-unique_ folder within the bucket.
- [ ] unauth users can no longer put objects in buckets, but can still view objects.
- [ ] all users can visit other user pages and see _that user's_ image collection.

## Phase 2

### Pipelines

- [ ] setup automated pipeline using CodePipeline and CodeDeploy
- [ ] explore suitable approach to deploy and maintain reachable endpoint.
- [ ] explore SAM / Cloudformation IAC solutions.

## Phase 3

### Lambda, DynamoDB

#### Lambda

- [ ] when image is uploaded, trigger lambda to resize image to large and medium formats.

#### DynamoDB

- [ ] when image is uploaded, capture relationship to user in DynamoDB.
- [ ] explore liking feature.
- [ ] explore subscribing feature.
- [ ] explore recommended feature.
