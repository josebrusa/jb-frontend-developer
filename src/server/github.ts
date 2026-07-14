type GitHubRepository = {
  name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  size: number;
};

export type GitHubProject = {
  name: string;
  repositoryUrl: string;
  demoUrl: string | null;
  description: string;
  technologies: string[];
  stars: number;
};

export async function getGitHubProjects(username = process.env.GITHUB_USERNAME): Promise<GitHubProject[]> {
  if (!username) {
    return [];
  }

  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
    next: { revalidate: 3600 },
  }).catch(() => null);

  if (!response?.ok) {
    return [];
  }

  const repositories = (await response.json()) as GitHubRepository[];

  return repositories
    .filter((repo) => !repo.fork && !repo.archived && repo.size > 0 && repo.name !== username)
    .map((repo) => ({
      name: repo.name,
      repositoryUrl: repo.html_url,
      demoUrl: repo.homepage || null,
      description: repo.description ?? "Proyecto publicado en GitHub con foco en aprendizaje, producto y buenas prácticas.",
      technologies: [repo.language, ...(repo.topics ?? [])].filter((technology): technology is string => Boolean(technology)),
      stars: repo.stargazers_count,
    }));
}
