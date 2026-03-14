# 1. Caching Strategy for GCS Images

Date: 2026-03-09

## Status

Accepted

## Context

The homepage image loading was failing with an `ExpiredToken` error when serving images from Google Cloud Storage (GCS). This was due to a mismatch between the GCS Signed URL expiration (1 hour) and Vercel Blob cache persistence (24 hours). The cache held onto URLs that had already expired at the source.

## Decision

We aligned the TTLs by increasing the GCS Signed URL expiration to 24 hours and decreasing the Vercel Blob cache persistence to 12 hours. We also implemented a utility script (`flush-cache.ts`) to manually clear Redis and Vercel Blob caches when needed, and adjusted Next.js `unstable_cache` revalidation to ensure stale caches can be cleared.

## Consequences

Images are reliably loaded on the homepage without expiration issues. The cache refresh aligns with the underlying URL validity, improving visual stability and user experience.
