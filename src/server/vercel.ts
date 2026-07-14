type VercelProjectLink = {
  org?: string;
  repo?: string;
  type?: string;
};

type VercelAlias = string | {
  domain?: string;
  url?: string;
};

type VercelProjectTarget = {
  url?: string;
  alias?: VercelAlias[];
  aliases?: VercelAlias[];
  domains?: VercelAlias[];
};

type VercelDeployment = {
  url?: string;
  target?: string | null;
  alias?: VercelAlias[];
  aliases?: VercelAlias[];
  domains?: VercelAlias[];
};

type VercelProjectResponse = {
  id: string;
  name: string;
  framework?: string | null;
  link?: VercelProjectLink;
  targets?: {
    production?: VercelProjectTarget;
  };
  latestDeployments?: VercelDeployment[];
};

type VercelProjectsResponse = {
  projects?: VercelProjectResponse[];
};

export type VercelProject = {
  id: string;
  name: string;
  slug: string;
  framework: string | null;
  demoUrl: string | null;
  imageUrl: string | null;
  repositoryName: string | null;
  repositoryOwner: string | null;
  repositoryUrl: string | null;
};

function normalizeVercelUrl(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }

  return url.startsWith("http") ? url : `https://${url}`;
}

function getAliasUrl(alias: VercelAlias | undefined): string | null {
  if (!alias) {
    return null;
  }

  if (typeof alias === "string") {
    return alias;
  }

  return alias.domain ?? alias.url ?? null;
}

function getFirstAliasUrl(source: VercelProjectTarget | VercelDeployment | undefined): string | null {
  if (!source) {
    return null;
  }

  const [publicDomain] = [
    ...(source.alias ?? []),
    ...(source.aliases ?? []),
    ...(source.domains ?? []),
  ];

  return getAliasUrl(publicDomain);
}

function getProductionUrl(project: VercelProjectResponse): string | null {
  const productionTarget = project.targets?.production;
  const productionDeployment = project.latestDeployments?.find((deployment) => deployment.target === "production");
  const [publicDomain] = [
    getFirstAliasUrl(productionTarget),
    getFirstAliasUrl(productionDeployment),
    productionDeployment?.url,
    productionTarget?.url,
  ];

  return normalizeVercelUrl(publicDomain);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getVercelProjects(): Promise<VercelProject[]> {
  if (!process.env.VERCEL_TOKEN) {
    return [];
  }

  const params = new URLSearchParams({ limit: "100" });

  if (process.env.VERCEL_TEAM_ID) {
    params.set("teamId", process.env.VERCEL_TEAM_ID);
  }

  const response = await fetch(`https://api.vercel.com/v9/projects?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    },
    next: { revalidate: 3600 },
  }).catch(() => null);

  if (!response?.ok) {
    return [];
  }

  const data = (await response.json()) as VercelProjectsResponse;

  return (data.projects ?? []).map((project) => {
    const repositoryOwner = project.link?.org ?? null;
    const repositoryName = project.link?.repo ?? null;
    const repositoryUrl = repositoryOwner && repositoryName
      ? `https://github.com/${repositoryOwner}/${repositoryName}`
      : null;

    const demoUrl = getProductionUrl(project);

    return {
      id: project.id,
      name: project.name,
      slug: slugify(project.name),
      framework: project.framework ?? null,
      demoUrl,
      imageUrl: null,
      repositoryName,
      repositoryOwner,
      repositoryUrl,
    };
  });
}
