const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');

async function run() {
  try {
    // Get inputs
    const repoName = core.getInput('repo-name');
    const repoDescription = core.getInput('repo-description');
    
    // Get the GitHub token from the environment
    const token = core.getInput('github-token');

    // Create an Octokit instance
    const octokit = new Octokit({ auth: token });

    // Create the repository
    const response = await octokit.rest.repos.createForAuthenticatedUser({
      name: repoName,
      description: repoDescription,
      auto_init: true, // Optionally initialize with a README
      private: true,
      homepage: "https://github.com/fernandaakl"
    });

    // Output the repository URL
    core.setOutput('repo-url', response.data.html_url);
    console.log(`Repository created: ${response.data.html_url}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
