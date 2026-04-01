# Sponsor Operations V1

## Summary

DevBcn needs a lightweight sponsor operations system, not a full CRM.

The system should support:

- a canonical sponsor record used by the public website
- sponsor self-service for public-profile content and job offers
- organizer ownership of governance and publication controls
- lightweight moderation through sponsor status

This document captures the agreed V1 scope.

## Product Goal

Provide a single sponsor directory that serves two audiences:

- organizers, who maintain clean and publishable sponsor data
- sponsor contacts, who can self-serve their public profile and job offers

The public website reads from the canonical sponsor record.

## Core Principles

- Admins are the primary editors.
- Sponsor contacts can edit only sponsor-facing content.
- Sponsor changes go live immediately.
- Sponsor changes on an already published sponsor mark the record as `needs_review`.
- There is no full approval queue, version history, or diff review in V1.
- The system should stay operationally simple.

## Domain Model

### Sponsor

The sponsor is the canonical company record used by the public site.

Fields in scope:

- `name`
- `edition`
- `category`
- `status`
- `internal_owner_user_id`
- `website`
- `logo_url`
- `description`
- `linkedin`
- `twitter`
- `bluesky`
- `instagram`

### Sponsor Contact

Sponsor contacts are access principals, not CRM contacts.

Fields in scope:

- `email`
- `name` optional
- `sponsor_id`
- `user_id` nullable until first authenticated session is linked

Rules:

- multiple contacts per sponsor are allowed
- there is no primary or secondary contact in V1
- all contacts share the same sponsor workspace
- contacts are internal/auth-only and are not shown publicly

### Internal Owner

Each sponsor can have one DevBcn internal owner.

Rules:

- exactly one owner per sponsor in V1
- owner is selected from a fixed list of internal admin users
- this is an assignment field, not a separate permission model

## Ownership Rules

### Admin-Owned Fields

Admins control:

- `name`
- `edition`
- `category`
- sponsor contact emails
- internal owner
- `status`

### Sponsor-Owned Fields

Sponsor contacts control:

- `description`
- `website`
- `logo_url`
- `linkedin`
- `twitter`
- `bluesky`
- `instagram`
- job offers

Sponsors do not control:

- `name`
- `edition`
- `category`
- internal owner
- contact assignments
- moderation status

## Status Model

Sponsor records support three statuses:

- `draft`
- `published`
- `needs_review`

### Semantics

`draft`

- not ready for public display
- typically used for incomplete sponsor records

`published`

- approved and publicly visible

`needs_review`

- publicly visible
- the canonical record has been changed by a sponsor and should be reviewed by admins

## Publication Rules

### Admin-Created Sponsors

- new sponsors created by admins default to `published`

### Sponsor Edits

When a sponsor edits a sponsor record:

- the canonical record is updated immediately
- if the previous status was `published`, it becomes `needs_review`
- if the previous status was already `draft` or `needs_review`, it stays as is

### Public Visibility

The public website should show only:

- `published`
- `needs_review`

The public website should hide:

- `draft`

## Authentication and Access

### Sponsor Contacts

V1 authentication preference:

- magic link by email

Supporting assumptions:

- sponsor contacts should not need to remember passwords
- sponsor access is keyed by stored contact email
- after login, the authenticated user should be linked to the stored sponsor contact row

### Internal Admins

Admins can use any Supabase-supported authentication method available in the project without extra cost, including:

- magic link
- email and password
- OAuth providers such as Google

V1 does not require a custom admin identity-management UI.

## Primary Admin Workflows

The main organizer workflow is maintaining a clean sponsor directory for the website.

The first-class actions on sponsor admin screens should be:

1. list sponsors for a given edition
2. edit or complete sponsor-submitted values
3. assign an internal owner to the sponsor

Supporting actions:

- manage sponsor contact emails
- inspect current publication status
- republish or downgrade a sponsor through status edits

## Sponsor Portal Scope

The sponsor portal is intended for sponsor contacts to:

- edit their public company profile
- manage their job offers

The sponsor portal is not intended to:

- manage edition or category
- manage internal owner
- manage access permissions
- manage publication workflow directly

## Out of Scope for V1

- full CRM pipeline management
- lead/prospect stages
- invoicing or billing workflows
- review queues
- historical revision tracking
- approval diffs
- multi-owner internal teams
- complex contact roles

## Implementation Notes

V1 implementation should align to these behaviors:

- sponsor status must exist at the database level
- sponsor contact emails must be stored on `sponsor_users`
- public data queries must filter out `draft`
- sponsor profile updates must go through a controlled API path
- admin sponsor updates must go through a controlled API path

## Current Repository Alignment

The current implementation for this spec includes:

- sponsor status in the database schema
- internal owner on sponsors
- email and optional name on sponsor contacts
- public query filtering for `published` and `needs_review`
- sponsor profile update endpoint
- admin sponsor edit screen and update endpoint
- contact reassignment by email after sponsor authentication

## Future Extensions

Possible V2 directions if needed later:

- admin-created sponsor creation UI
- invite-trigger UI for sponsor contacts
- review inbox for `needs_review`
- separate public and draft values
- contact activity audit trail
- internal notes per sponsor
- lightweight analytics for sponsor engagement
