/*
# Create scores table (single-tenant, no auth)

## Summary
Creates a table to track quiz scores for the road signs flashcard app.
No authentication required — scores are stored globally for the device/session.

## New Tables

### scores
- `id` (uuid, primary key) — unique identifier for each score entry
- `score` (integer, not null) — number of correct answers (0–20)
- `total` (integer, not null, default 20) — total questions in the set
- `created_at` (timestamptz, default now()) — when the quiz was completed

## Security
- RLS enabled on `scores`.
- Anon + authenticated users can SELECT, INSERT (no update/delete to protect history integrity).
- This is a single-tenant app with no sign-in — scores are shared/public.

## Notes
1. No user_id column — this is a shared single-tenant leaderboard.
2. Read-only after insert — no update or delete policies to preserve history.
3. Index on created_at for efficient "last 10 scores" queries.
4. Index on score for efficient high-score queries.
*/

CREATE TABLE IF NOT EXISTS scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  score integer NOT NULL CHECK (score >= 0 AND score <= 20),
  total integer NOT NULL DEFAULT 20,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_scores" ON scores;
CREATE POLICY "anon_select_scores" ON scores FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_scores" ON scores;
CREATE POLICY "anon_insert_scores" ON scores FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS scores_created_at_idx ON scores (created_at DESC);
CREATE INDEX IF NOT EXISTS scores_score_idx ON scores (score DESC);
