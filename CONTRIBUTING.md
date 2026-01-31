# Contribution Guidelines

We would love for you to contribute to this project.
As a contributor, here are the guidelines we would like you to follow:

## Be Kind - Code of Conduct

Help us keep this project open and inclusive. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md)

## Found a bug? Want a feature? - Please submit an Issue

[Choose an issue template](https://github.com/hirezio/given/issues/new/choose) to file a bug report / feature request.

## Want to contribute code? please submit a Pull Request (PR), but first...

.

### ✅ 1. [Search this repo first](https://github.com/hirezio/given/pulls)...

for an open or closed PR that relates to the change you want to introduce.

.

### ✅ 2. **Before you start coding - find / create an issue**

**Make sure there's an issue** describing the problem you're fixing, or documents the design for the feature you'd like to add.
Discussing the design up front helps to ensure that we're ready to accept your work.

**Don't waste your time working on code before you got a 👍 in an issue comment.**

.

### ✅ 3. Fork the this repo and create a branch.

- Hit that "Fork" button above (in this repo's github page).

![image](https://user-images.githubusercontent.com/1430726/95460679-ec014400-097d-11eb-9a7a-93e0262d37d9.png)

- git clone your fork

`git clone YOUR_FORK_URL`

Get your url by from here 👇

![image](https://user-images.githubusercontent.com/1430726/95461173-94afa380-097e-11eb-9568-dc986e050de6.png)

- Create a new branch locally in your fork's repo

```shell
git checkout -b my-fix-branch master
```

⚠ **IMPORTANT:** In this project the most important file is `shared/given-core/given-core.ts` -
It is the actual implementation of both `jasmine-given` and `jest-given`.
So if you change anything you need to verify that there is a test in both of the frameworks spec files.

.

### ✅ 4. Make sure you add / modify tests

- From the root of the project run `pnpm install`.

- Then run `pnpm build`.

- Run `pnpm lint` to lint the code.

- Run `pnpm test:full` to make sure there aren't any errors

.

### ✅ 5. Add a "changeset"

For your convenience, I've added a video tutorial I prepared for Qwik that covers the process of adding a changeset:

[📽 TUTORIAL: Adding a changeset](https://go.screenpal.com/watch/cZivIcVPJQV)

**5.1.** Run the following command to create a changeset:

```shell
pnpm change
```

**5.2.** Choose the packages that should be included in the changeset

**5.3** Choose the specific type of change

(hit `Enter` if you need to skip to the next option)

- `major` for breaking changes
- `minor` for new features
- `patch` for bug fixes

**5.4.** Prefix your change title with one of these:

- `FEAT:` or `feat:` for features
- `FIX:` or `fix:` for bug fixes
- `DOCS` or `docs:` for documentation
- `CHORE:` or `chore:` for chores
- `INFRA:` or `infra:` for infrastructure changes

**5.5.** Modify the created MD file

After the `change` command runs, a new MD file will be created under the `.changeset` folder.

Please modify this file to include a descriptive message of the changes you made.

You can even add code examples if you need do, to describe a new feature for example. (pun intended 😉)

The prefix and this elaborated description will be used to create the changelog files and release notes, so please give them love. 💗😊

---

.

### ✅ 6. Push your branch to GitHub:

```shell
git push origin my-fix-branch
```

.

### ✅ 7. In GitHub, create a pull request for `hirezio/given:master`.

Make sure you check the following checkbox "Allow edits from maintainers" -

![image](https://user-images.githubusercontent.com/1430726/95461503-fbcd5800-097e-11eb-9b55-321d1ff0e6bb.png)

If you need to update your PR for some reason -

- Make the required updates.

- Re-run the tests to ensure tests are still passing `pnpm test:full`

- Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

  ```shell
  git rebase master -i
  git push -f
  ```

.

### ✅ 8. After your pull request is merged - delete your PR branch

After your pull request is merged, you can safely delete your branch and pull the changes from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```shell
  git push origin --delete my-fix-branch
  ```

- Check out the master branch:

  ```shell
  git checkout master -f
  ```

- Delete the local branch:

  ```shell
  git branch -D my-fix-branch
  ```

- Update your master with the latest upstream version:

  ```shell
  git pull --ff upstream master
  ```

.

### ✅ 9. That's it! Thank you for your contribution! 🙏💓
