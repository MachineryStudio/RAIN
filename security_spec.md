# RAION Security Specification

## Data Invariants
1. A user can only edit their own profile.
2. Only admins can create/edit/delete songs.
3. Playlists can only be edited by their owners.
4. Song metadata must be strictly typed and contain required fields.

## The Dirty Dozen Payloads
1. Attempt to set `isAdmin: true` on self-profile creation.
2. Attempt to update another user's `raiTokens`.
3. Attempt to create a song as a non-admin.
4. Attempt to update a song's `playCount` directly from client (should be limited or handled via specific logic).
5. Attempt to delete a song as a non-admin.
6. Attempt to create a playlist for another user.
7. Attempt to inject a 1MB string into `songName`.
8. Attempt to remove required fields from a song object.
9. Attempt to update immutable fields like `createdAt`.
10. Attempt to spoof `uid` in a write.
11. Attempt to bypass `email_verified` if required (though we use Google Auth primarily).
12. Attempt to query all user profiles without filtering for self.

## Test Runner (Draft)
A separate test file would verify these. For now, we focus on the rules.
