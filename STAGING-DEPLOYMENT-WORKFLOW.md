# Staging deployment workflow

Repository: https://github.com/2kjam/bridge-therapy-website

Production site `bridge-therapy-website` deploys only `main`. The isolated site
`bridge-therapy-staging` deploys `staging` at
https://bridge-therapy-staging.netlify.app. Staging must retain
`BRIDGE_ENABLE_INDEXING=false` and must have no production custom domains.

1. Develop changes on a feature branch.
2. Review the changes and merge approved changes into `staging`.
3. Let GitHub continuous deployment build the staging site only.
4. Verify indexing protection, hydration, redirects, security, forms using mocked
   submissions, navigation, service pages, and articles on staging.
5. Obtain explicit production deployment approval before merging the tested
   changes into `main`. A push or merge to `main` automatically deploys production.
6. Merge the tested changes into `main` only after that approval.

Never automatically promote staging, automatically merge into main, submit live
test inquiries, or enable indexing as part of ordinary staging verification.
Before changing deployment triggers, confirm production excludes `staging`,
review CI workflows and build hooks, and verify production deploy IDs before and
after a staging deployment. A pull request targeting main can create a preview
on the production Netlify site; do not open one during staging-only verification.

Initial baseline: `e71e3105637777ddb4f3c1b3eb0160320057ae23`, verified as the
published commit on both sites. This initial commit changes documentation only;
pending local alias/permalink protection changes are excluded.
