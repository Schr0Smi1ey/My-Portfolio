import { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper, SectionHeader, Spinner, EmptyState, ProjectFilter } from "../components/ui";
import ProjectCard from "../components/ProjectCard";
import { useProjects } from "../hooks";
import { TECH_FILTERS } from "../constants";

const ProjectsPage = () => {
  const { projects, isLoading } = useProjects();
  const [activeTech, setActiveTech] = useState("All");
  const [search, setSearch]         = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const allTechs = Object.values(p.techStack).flat().map((t) => t.toLowerCase());
      const matchesTech   = activeTech === "All" || allTechs.includes(activeTech.toLowerCase());
      const matchesSearch = !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchesTech && matchesSearch;
    });
  }, [projects, activeTech, search]);

  return (
    <PageWrapper>
      <Helmet>
        <title>Projects — Sarafat Karim</title>
        <meta name="description" content="Full-stack projects built with React, Node.js, MongoDB and more." />
      </Helmet>

      <div className="container mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Portfolio"
          title="Projects"
          subtitle="A collection of full-stack applications built with the MERN stack, focused on real-world problems and clean user experience."
        />

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <ProjectFilter
              filters={TECH_FILTERS}
              active={activeTech}
              onSelect={setActiveTech}
              searchValue={search}
              onSearch={setSearch}
            />

            {/* Results count */}
            {(search || activeTech !== "All") && (
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-5">
                {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
                {activeTech !== "All" && <span> in <span className="text-primary font-medium">{activeTech}</span></span>}
              </p>
            )}

            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EmptyState message={`No projects match "${search || activeTech}".`} />
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {filtered.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default ProjectsPage;
