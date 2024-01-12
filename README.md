# Cypress

### Prerequisites

https://nodejs.org/en/
Install LTS
Just take the defaults

`C:\Users\<username>\node --version`
v16.15.0

`C:\Users\<username>\npm --version`
8.5.5

### Setup

Install oracle to `c:\cypress`

`cd to c:\cypress` and `git clone https://<YOUR NETWORK USERNAME>@source/stash/scm/cyp/oracle.git`

### Oracle

Check Environment Variables are set:

`TNS_ADMIN` set to something like `\\oscas0001\tns`
`%PATH%` to include Oracle bin

- On DEV machine, something like `C:\ada\apps\oracle\product\12.2.0\client_1\bin;`
- On Test machine, something like `C:\CaseMgmtLocal\ORACLT11\bin;`

### Validate Oracle setup properly

- Edit `cypress\scripts\runSqlPlus.bat` and edit as follows

```
    @ECHO off
    sqlplus /nolog @cypress\scripts\selectDual.sql  CIMSMGR U_Pick_It dv2_cc1 %1
    rem sqlplus /nolog @cypress\scripts\P2changecs.sql  CIMSMGR U_Pick_It dv2_cc1 %1
```

- Edit the `cypress\scripts\selectDual.sql` and comment out the `exit` with `rem`
- from root, run `cypress\scripts\runSqlPlus.bat 1`
- you should see the following

```
SQL*Plus: Release 12.2.0.1.0 Production on Mon Aug 8 07:14:17 2022

Copyright (c) 1982, 2016, Oracle.  All rights reserved.

Connected.
old   1:     select &4 from dual
new   1:     select 1 from dual

         1
----------
         1

Disconnected from Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production
With the Partitioning, OLAP, Advanced Analytics and Real Application Testing options
```

- <b>Be sure to reset the `cypress\scripts\runSqlPlus.bat` and `selectDual.sql` back to the original form</b>

#### Install dependencies

`npm install`

#### Install VS Code

https://code.visualstudio.com/download

#### Install extensions

From within the `VS Code`, `terminal` execute the following

```
code --install-extension alexkrechik.cucumberautocomplete
code --install-extension esbenp.prettier-vscode
code --install-extension lfs.vscode-emacs-friendly
code --install-extension shd101wyy.markdown-preview-enhanced
```

##### To export the settings when new extensions are added

`code --list-extensions | % { "code --install-extension $_" }`

#### Setup GitHook

When you commit your code, the pre-commit hook will format your code.

- Copy `./githooks/pre-commit` to `.git\hooks`

#### Run interactive

Note: you must run from a "DOS" command prompt

- Local: `npm run cy:open:local`
- Dev: `npm run cy:open:dev`
- MV: `npm run cy:open:mv`

Note: the `cypress.env.dev|mv|test|.json` is provided If you want to use your own account, create a `cypress.env.local.json`. This is because if you are use the `dev` version, and a test is running, the authentication will fail due to the server manages them.

### Run reports

`npm run htmlReport`
