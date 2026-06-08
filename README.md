# Road Signs Flashcards

## Fly.io

This app deploys to Fly.io in Johannesburg, following the same scale-to-zero
setup as `unit-assistant-service`. Scores are stored in a persistent Fly volume.

Authenticate once, then deploy:

```bash
flyctl auth login
./deploy.sh
```

The first deployment creates the `roadsigns-quiz` app and its `scores_data`
volume. Later deployments reuse both.
