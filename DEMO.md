# XP Live Demo: TDD (Red → Green → Refactor) + CI

**Repo:** https://github.com/saoussen123/xp-demo  
**Feature to build live:** `canBorrow(borrowedCount)`. A library member may borrow a book only if they have fewer than 3 books.  
**Starting point:** tag `demo-start` on `main` (only `lateFee` exists, 1 test, CI green).  
**Backup:** branch `demo-solution` has the finished code (3 tests, CI green). Use `git checkout demo-solution` if something goes wrong live.

Before you start: open a terminal in the project folder, open `src/library.ts` and `src/library.spec.ts` in the editor, and open the repo's **Actions** tab in the browser.

---

## Step 1: Show green CI

**Say:** "Every push runs our test suite automatically on GitHub. Right now everything is green."

Show the Actions tab in the browser (latest run on `main` = ✅), or run:

```bash
gh run list --limit 1
```

Expected: `completed  success  ...  CI  main  push ...`

Optionally run the tests locally:

```bash
npm test
```

Expected:

```
Tests:       1 passed, 1 total
```

---

## Step 2: Write the failing tests (RED)

**Say:** "In TDD we write the test first: it describes the rule before any code exists."

Replace the contents of `src/library.spec.ts` with:

```ts
import { lateFee, canBorrow } from './library';

describe('lateFee', () => {
  test('lateFee(4) returns 2', () => {
    expect(lateFee(4)).toBe(2);
  });
});

describe('canBorrow', () => {
  test('a member with 3 books cannot borrow', () => {
    expect(canBorrow(3)).toBe(false);
  });

  test('a member with 2 books can borrow', () => {
    expect(canBorrow(2)).toBe(true);
  });
});
```

Run:

```bash
npm test
```

Expected (RED, because the function doesn't exist yet):

```
FAIL src/library.spec.ts
  ● Test suite failed to run

    src/library.spec.ts:1:19 - error TS2305: Module '"./library"' has no exported member 'canBorrow'.

Test Suites: 1 failed, 1 total
Tests:       0 total
```

---

## Step 3: Write the minimum code (GREEN)

**Say:** "Now we write the simplest code that makes the tests pass, and nothing more."

Add to the end of `src/library.ts`:

```ts
export function canBorrow(borrowedCount: number): boolean {
  return borrowedCount < 3;
}
```

Run:

```bash
npm test
```

Expected (GREEN):

```
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

---

## Step 4: Refactor with MAX_BOOKS (still GREEN)

**Say:** "With the tests as a safety net, we can improve the code without fear. The magic number becomes a named constant."

Change `src/library.ts` so it reads:

```ts
export function lateFee(daysLate: number): number { return daysLate * 0.5; }

const MAX_BOOKS = 3;

export function canBorrow(borrowedCount: number): boolean {
  return borrowedCount < MAX_BOOKS;
}
```

Run:

```bash
npm test
```

Expected (still GREEN):

```
Tests:       3 passed, 3 total
```

---

## Step 5: Commit + push, show CI green

**Say:** "We integrate continuously: small commit, push, and the CI server checks it for the whole team."

```bash
git add src
git commit -m "Add canBorrow with MAX_BOOKS limit"
git push
gh run watch
```

Expected: `gh run watch` finishes with `✓ main CI` and every step ticked, including `✓ Run npm test`. Show the green run in the Actions tab.

---

## Step 6 (optional): Break it and show CI RED

**Say:** "If someone introduces a bug, CI catches it immediately, before it reaches users."

In `src/library.ts` change `<` to `<=`:

```ts
  return borrowedCount <= MAX_BOOKS;
```

```bash
git commit -am "Allow borrowing up to and including MAX_BOOKS"
git push
gh run watch
```

Expected: the run fails (`X main CI`, `X Run npm test`). The log shows:

```
FAIL src/library.spec.ts
  ● canBorrow › a member with 3 books cannot borrow

    Expected: false
    Received: true

Tests:       1 failed, 2 passed, 3 total
```

(Running `npm test` locally first shows the same failure.)

To get back to green on stage:

```bash
git revert --no-edit HEAD
git push
```

---

## Reset after rehearsal (REHEARSAL ONLY)

> ⚠️ **For rehearsal only. Never run this after the real presentation if you want to keep the result.**  
> It deletes every commit made during the demo, both locally and on GitHub (force-push).

```bash
git checkout main
git fetch --tags --force
git reset --hard demo-start
git push --force origin main
```

Check that you are back at the start:

```bash
npm test          # Tests: 1 passed, 1 total
git log --oneline -1
```

The force-push triggers a new CI run on the starting code. It will be green, so the Actions tab shows a green run on top again for Step 1.
