import {
  getAdminProjectData,
  importGitHubProject,
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin,
  toggleProjectVisibility,
} from "../../src/server/admin";

type AdminPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const pageSize = 5;

function getErrorMessage(error: string | string[] | undefined): string | null {
  if (!error) {
    return null;
  }

  const value = Array.isArray(error) ? error[0] : error;

  if (value === "db") {
    return "Configurá DATABASE_URL para guardar cambios en Neon.";
  }

  if (value === "auth") {
    return "Iniciá sesión para administrar el portfolio.";
  }

  if (value === "project") {
    return "No se pudo procesar el proyecto seleccionado.";
  }

  if (value === "limited") {
    return "Demasiados intentos. Probá nuevamente en unos minutos.";
  }

  return "Contraseña incorrecta o configuración incompleta.";
}

function getParam(params: Record<string, string | string[] | undefined> | undefined, key: string): string {
  const value = params?.[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function getPage(params: Record<string, string | string[] | undefined> | undefined, key: string): number {
  const page = Number(getParam(params, key));
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function matchesSearch<T>(item: T, query: string, selectors: Array<(item: T) => string | null | undefined>): boolean {
  if (!query) {
    return true;
  }

  const normalizedQuery = query.toLowerCase();
  return selectors.some((selector) => selector(item)?.toLowerCase().includes(normalizedQuery));
}

function paginate<T>(items: T[], page: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    currentPage,
    totalPages,
    items: items.slice(start, start + pageSize),
  };
}

function pageHref(params: Record<string, string | string[] | undefined> | undefined, pageKey: string, page: number): string {
  const nextParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params ?? {})) {
    const stringValue = Array.isArray(value) ? value[0] : value;
    if (stringValue && key !== pageKey) {
      nextParams.set(key, stringValue);
    }
  }

  nextParams.set(pageKey, String(page));
  return `/admin?${nextParams.toString()}`;
}

function SearchAndPagination(props: {
  params: Record<string, string | string[] | undefined> | undefined;
  queryKey: string;
  pageKey: string;
  query: string;
  currentPage: number;
  totalPages: number;
  placeholder: string;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <form className="flex gap-2" action="/admin">
        {Object.entries(props.params ?? {}).map(([key, value]) => {
          const stringValue = Array.isArray(value) ? value[0] : value;
          if (!stringValue || key === props.queryKey || key === props.pageKey) return null;
          return <input key={key} type="hidden" name={key} value={stringValue} />;
        })}
        <input
          name={props.queryKey}
          defaultValue={props.query}
          placeholder={props.placeholder}
          className="min-w-0 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#29F3C3]"
        />
        <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#29F3C3]">
          Buscar
        </button>
      </form>
      <div className="flex items-center gap-2 text-sm text-white/45">
        <a
          href={pageHref(props.params, props.pageKey, Math.max(1, props.currentPage - 1))}
          className="rounded-full border border-white/10 px-3 py-2 transition hover:border-[#29F3C3] hover:text-[#29F3C3]"
        >
          Anterior
        </a>
        <span>
          {props.currentPage}/{props.totalPages}
        </span>
        <a
          href={pageHref(props.params, props.pageKey, Math.min(props.totalPages, props.currentPage + 1))}
          className="rounded-full border border-white/10 px-3 py-2 transition hover:border-[#29F3C3] hover:text-[#29F3C3]"
        >
          Siguiente
        </a>
      </div>
    </div>
  );
}

const AdminPage = async ({ searchParams }: AdminPageProps) => {
  const params = await searchParams;
  const errorMessage = getErrorMessage(params?.error);
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    return (
      <main id="main-content" className="min-h-screen bg-[#050505] px-6 py-20 text-white">
        <section className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-[#29F3C3]">Admin</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Portfolio CMS</h1>
          <p className="mt-4 text-sm leading-6 text-white/58">
            Acceso privado para decidir qué proyectos de GitHub/Vercel se muestran en el portfolio.
          </p>
          {errorMessage ? (
            <p className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
              {errorMessage}
            </p>
          ) : null}
          <form action={loginAdmin} className="mt-8 space-y-4">
            <label className="block text-sm uppercase tracking-[0.2em] text-white/45" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none transition focus:border-[#29F3C3]"
              required
            />
            <button className="w-full rounded-full bg-[#29F3C3] px-5 py-3 text-sm font-semibold text-black transition hover:bg-white">
              Entrar
            </button>
          </form>
        </section>
      </main>
    );
  }

  const { hasDatabaseUrl, databaseProjects, fallbackProjects, githubProjects, vercelProjects } = await getAdminProjectData();
  const savedQuery = getParam(params, "savedQ");
  const githubQuery = getParam(params, "githubQ");
  const vercelQuery = getParam(params, "vercelQ");
  const savedPage = getPage(params, "savedPage");
  const githubPage = getPage(params, "githubPage");
  const vercelPage = getPage(params, "vercelPage");
  const filteredSavedProjects = databaseProjects.filter((project) =>
    matchesSearch(project, savedQuery, [
      (item) => item.title,
      (item) => item.description,
      (item) => item.repositoryUrl,
      (item) => item.demoUrl,
      (item) => item.technologies.join(" "),
    ]),
  );
  const filteredGitHubProjects = githubProjects.filter((project) =>
    matchesSearch(project, githubQuery, [
      (item) => item.name,
      (item) => item.description,
      (item) => item.repositoryUrl,
      (item) => item.demoUrl,
      (item) => item.technologies.join(" "),
    ]),
  );
  const filteredVercelProjects = vercelProjects.filter((project) =>
    matchesSearch(project, vercelQuery, [
      (item) => item.name,
      (item) => item.demoUrl,
      (item) => item.repositoryUrl,
      (item) => item.repositoryName,
      (item) => item.framework,
      (item) => item.matchedGitHubName,
      (item) => item.technologies.join(" "),
    ]),
  );
  const savedPagination = paginate(filteredSavedProjects, savedPage);
  const githubPagination = paginate(filteredGitHubProjects, githubPage);
  const vercelPagination = paginate(filteredVercelProjects, vercelPage);

  return (
    <main id="main-content" className="min-h-screen bg-[#050505] px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:flex-row md:items-end md:justify-between md:p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#29F3C3]">Admin</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Portfolio CMS</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/58">
              Importá proyectos desde GitHub y decidí cuáles quedan visibles en la sección pública.
              Los cambios se guardan en Neon cuando `DATABASE_URL` está configurado.
            </p>
          </div>
          <form action={logoutAdmin}>
            <button className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/70 transition hover:border-[#29F3C3] hover:text-[#29F3C3]">
              Salir
            </button>
          </form>
        </header>

        {errorMessage ? (
          <p className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
            {errorMessage}
          </p>
        ) : null}

        {!hasDatabaseUrl ? (
          <section className="mb-8 rounded-[1.5rem] border border-yellow-300/20 bg-yellow-300/10 p-5 text-sm leading-6 text-yellow-50">
            No hay `DATABASE_URL`. Podés ver proyectos, pero para guardar qué mostrar necesitás configurar Neon en `.env.local` y Vercel.
          </section>
        ) : null}

        <section className="mb-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#29F3C3]">Visible</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Proyectos guardados</h2>
            </div>
            <p className="text-sm text-white/45">{filteredSavedProjects.length}/{databaseProjects.length} en DB</p>
          </div>

          <SearchAndPagination
            params={params}
            queryKey="savedQ"
            pageKey="savedPage"
            query={savedQuery}
            currentPage={savedPagination.currentPage}
            totalPages={savedPagination.totalPages}
            placeholder="Buscar guardados..."
          />

          <div className="grid gap-4">
            {savedPagination.items.length > 0 ? (
              savedPagination.items.map((project) => (
                <article key={project.id} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-6">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${project.featured ? "bg-[#72F0D1]" : "bg-white/25"}`} />
                      <p className="text-sm uppercase tracking-[0.2em] text-white/42">
                        {project.featured ? "Visible" : "Oculto"}
                      </p>
                    </div>
                    <h3 className="text-2xl font-semibold tracking-[-0.03em]">{project.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/58">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 6).map((technology) => (
                        <span key={technology} className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-white/58">
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                  <form action={toggleProjectVisibility} className="mt-5 md:mt-0">
                    <input type="hidden" name="id" value={project.id} />
                    <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#29F3C3]">
                      Ocultar
                    </button>
                  </form>
                </article>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-white/58">
                No hay proyectos guardados para esta búsqueda. Importá desde GitHub/Vercel o corré `pnpm db:seed` para cargar la selección curada.
              </div>
            )}
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#29F3C3]">Vercel</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Deployments disponibles</h2>
            </div>
            <p className="text-sm text-white/45">{filteredVercelProjects.length}/{vercelProjects.length} proyectos</p>
          </div>

          <SearchAndPagination
            params={params}
            queryKey="vercelQ"
            pageKey="vercelPage"
            query={vercelQuery}
            currentPage={vercelPagination.currentPage}
            totalPages={vercelPagination.totalPages}
            placeholder="Buscar Vercel..."
          />

          <div className="grid gap-4">
            {vercelPagination.items.length > 0 ? (
              vercelPagination.items.map((project, index) => (
                <article key={project.id} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/42">
                      {project.matchedGitHubName ? `Match: ${project.matchedGitHubName}` : "Vercel"}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{project.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/58">
                      {project.demoUrl ?? "Sin production URL detectada"}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 6).map((technology) => (
                        <span key={technology} className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-white/58">
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                  <form action={importGitHubProject} className="mt-5 md:mt-0">
                    <input type="hidden" name="title" value={project.name} />
                    <input type="hidden" name="slug" value={project.slug} />
                    <input type="hidden" name="description" value={project.description} />
                    <input type="hidden" name="repositoryUrl" value={project.repositoryUrl ?? ""} />
                    <input type="hidden" name="demoUrl" value={project.demoUrl ?? ""} />
                    <input type="hidden" name="imageUrl" value={project.imageUrl ?? ""} />
                    <input type="hidden" name="technologies" value={project.technologies.join(", ")} />
                    <input type="hidden" name="sortOrder" value={String(200 + index)} />
                    <button
                      className="rounded-full bg-[#29F3C3] px-4 py-2 text-sm font-semibold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35"
                      disabled={project.alreadyImported || !hasDatabaseUrl}
                    >
                      {project.alreadyImported ? "Importado" : "Mostrar"}
                    </button>
                  </form>
                </article>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-white/58">
                No hay proyectos de Vercel para mostrar. Configurá `VERCEL_TOKEN` y opcionalmente `VERCEL_TEAM_ID`.
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#29F3C3]">GitHub</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Repos disponibles</h2>
            </div>
            <p className="text-sm text-white/45">{filteredGitHubProjects.length}/{githubProjects.length} repos</p>
          </div>

          <SearchAndPagination
            params={params}
            queryKey="githubQ"
            pageKey="githubPage"
            query={githubQuery}
            currentPage={githubPagination.currentPage}
            totalPages={githubPagination.totalPages}
            placeholder="Buscar GitHub..."
          />

          <div className="grid gap-4">
            {githubPagination.items.map((project, index) => (
              <article key={project.repositoryUrl} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-white/42">
                    {project.demoUrl ? "Vercel/GitHub" : "GitHub"}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{project.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/58">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 6).map((technology) => (
                      <span key={technology} className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-white/58">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
                <form action={importGitHubProject} className="mt-5 md:mt-0">
                  <input type="hidden" name="title" value={project.name} />
                  <input type="hidden" name="slug" value={project.slug} />
                  <input type="hidden" name="description" value={project.description} />
                  <input type="hidden" name="repositoryUrl" value={project.repositoryUrl} />
                  <input type="hidden" name="demoUrl" value={project.demoUrl ?? ""} />
                  <input type="hidden" name="imageUrl" value="" />
                  <input type="hidden" name="technologies" value={project.technologies.join(", ")} />
                  <input type="hidden" name="sortOrder" value={String(100 + index)} />
                  <button
                    className="rounded-full bg-[#29F3C3] px-4 py-2 text-sm font-semibold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35"
                    disabled={project.alreadyImported || !hasDatabaseUrl}
                  >
                    {project.alreadyImported ? "Importado" : "Mostrar"}
                  </button>
                </form>
              </article>
            ))}
          </div>
        </section>

        {databaseProjects.length === 0 ? (
          <section className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-white/42">Fallback actual</p>
            <p className="mt-2 text-sm leading-6 text-white/58">
              Si no hay proyectos en DB, el portfolio muestra {fallbackProjects.length} proyectos curados desde archivos locales.
            </p>
          </section>
        ) : null}
      </div>
    </main>
  );
};

export default AdminPage;
