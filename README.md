# Seenit Library Technical Test

- Hello, we'd like you to create a Library displaying multiple videos and images.
- Design link: https://zpl.io/VkPjq8K . You'll have to login and make you sure you've been added to the project.
- We'd love you to be creative, use latest technologies and 3rd parties if needed, and of course, we want to see your testing strategy.
- Don't worry if you can't finish this, just add some notes and we can go through them on the next step of the interview.

## API

This endpoint gives access to authorised users to view some sample data for the purpose of Seenit Technical tests.

### Available end points

1. https://tech-test-service-staging.seenit.studio/v1/uploads

### Pagination

This API requests 50 records by default. However, you can change this by calling the above with the following query parameters.

```
page=1
   > minimum = 1
perPage=10
   > minimum = 1
   > maximum = 100
```

E.g.

# Wrong path

https://tech-test.staging.seenit.io/v1/uploads?page=3&perPage=40

# Authorization

You will need to call the endpoint with Authorization header as follows:

```

    curl -H "Authorization: BASIC <<your_email_address>>" \
    "https://tech-test-service-staging.seenit.studio/v1/uploads"

```

Only authorised email addresses are allowed, make sure you've been added to the whitelist before.

## Acceptance Criteria

1. Layout matches the design
2. Tests for components
3. Pagination || Infinite scrolling
4. The user should be able to preview the asset by clicking on the tile (e.g. Modal)
