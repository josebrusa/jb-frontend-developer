import About from "../src/components/About";
import Contact from "../src/components/Contact";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import Projects from "../src/components/Projects";
import Sidenav from "../src/components/Sidenav";
import VisualLayer from "../src/components/visuals/VisualLayer";
import Work from "../src/components/Work";

export const revalidate = 3600;

type HomeProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const contactStatus = Array.isArray(params?.contact) ? params?.contact[0] : params?.contact;

  return (
    <main id="main-content" className="relative z-10">
      <VisualLayer />
      <Sidenav />
      <Header />
      <Work />
      <About />
      <Projects />
      <Contact status={contactStatus} />
      <Footer />
    </main>
  );
}
