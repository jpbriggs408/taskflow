# TaskFlow

TaskFlow is a CLI tool for managing JIRA issues and Git branches, designed to streamline your development workflow.

## Features

- Authenticate with JIRA
- Create JIRA tickets and corresponding Git branches
- List assigned or recently viewed issues
- Describe specific issues
- Assign issues to yourself or others
- Update issue statuses
- Add comments to issues
- Create consistently named commits

## Planned Features

Local vs global configuration

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Git

### Installation for Development

1. Close the repository

    ```bash
    git clone https://github.com/jpbriggs408/taskflow.git
    cd taskflow
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

    or

    ```bash
    pnpm install
    ```

3. Create a `.env` file in the root directory with your JIRA credentials:

    ```txt
    JIRA_URL=your_domain.atlassian.net
    JIRA_EMAIL=your_email@example.com
    JIRA_API_TOKEN=your_api_token
    JIRA_PROJECT_KEY=your_project_key (e.g.: FRI)
    JIRA_ACCOUNT_ID=your-account-id
    ```

    Here is an example:

    ```txt
    JIRA_URL=etsy.atlassian.net
    JIRA_EMAIL=jbriggs@etsy.com
    JIRA_API_TOKEN=not-telling-sorry
    JIRA_PROJECT_KEY=FRI
    JIRA_ACCOUNT_ID=0123456789
    ```

4. Link the package to use it globally:

    ```bash
    npm link
    ```

Now you can use `taskflow` command in your terminal.

### Development Workflow

1. Make changes to the TypeScript files in the `src` directory.

2. Compile the TypeScript code:

    ```bash
    pnpm run build
    ```

3. Test your changes:

    ```bash
    taskflow <command>
    ```

4. If you add new files, update `src/index.ts` to include them.

### Building the Code

To build the code for production:

```bash
pnpm run build
```

This command will:

1. Compile TypeScript to JavaScript
2. Apply any path aliases
3. Add necessary `.js` extensions to imports in the compiled files

The compiled code will be in the `dist` directory.

## Usage

Here are some example commands:

```bash
taskflow create
taskflow auth
taskflow list
```

For more detailed usage instructions, run:

```bash
taskflow help
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
