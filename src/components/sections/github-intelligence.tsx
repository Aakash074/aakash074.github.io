"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GitFork,
  Star,
  Code2,
  FolderGit2,
  Users,
  GitCommit,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  total_forks: number;
  top_languages: { name: string; count: number; color: string }[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  Solidity: "#363636",
  Rust: "#dea584",
  Go: "#00add8",
  HTML: "#e34f26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Jupyter: "#da5b0b",
};

function getLangColor(lang: string): string {
  return LANGUAGE_COLORS[lang] || "#6b7280";
}

export function GitHubIntelligence() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        // Fetch user info
        const userRes = await fetch("https://api.github.com/users/aakash074");
        const userData = await userRes.json();

        // Fetch repos
        const reposRes = await fetch(
          "https://api.github.com/users/aakash074/repos?per_page=100&sort=updated"
        );
        const repos = await reposRes.json();

        // Calculate stats
        const total_stars = repos.reduce(
          (acc: number, r: { stargazers_count: number }) => acc + r.stargazers_count,
          0
        );
        const total_forks = repos.reduce(
          (acc: number, r: { forks_count: number }) => acc + r.forks_count,
          0
        );

        // Language stats
        const langCount: Record<string, number> = {};
        repos.forEach((r: { language: string | null }) => {
          if (r.language) {
            langCount[r.language] = (langCount[r.language] || 0) + 1;
          }
        });

        const top_languages = Object.entries(langCount)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 8)
          .map(([name, count]) => ({ name, count, color: getLangColor(name) }));

        setStats({
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          total_stars,
          total_forks,
          top_languages,
        });
      } catch {
        // Graceful fallback with known stats
        setStats({
          public_repos: 101,
          followers: 57,
          following: 45,
          total_stars: 53,
          total_forks: 27,
          top_languages: [
            { name: "JavaScript", count: 28, color: "#f7df1e" },
            { name: "TypeScript", count: 15, color: "#3178c6" },
            { name: "Python", count: 12, color: "#3776ab" },
            { name: "HTML", count: 8, color: "#e34f26" },
            { name: "Solidity", count: 5, color: "#363636" },
            { name: "Shell", count: 4, color: "#89e051" },
          ],
        });
      } finally {
        setLoading(false);
      }
    }
    fetchGitHub();
  }, []);

  const statCards = stats
    ? [
        { label: "Repositories", value: stats.public_repos, icon: FolderGit2 },
        { label: "Followers", value: stats.followers, icon: Users },
        { label: "Stars", value: stats.total_stars, icon: Star },
        { label: "Forks", value: stats.total_forks, icon: GitFork },
      ]
    : [];

  const maxLangCount = stats
    ? Math.max(...stats.top_languages.map((l) => l.count), 1)
    : 1;

  return (
    <section id="github" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionHeading
        label="Open Source"
        title="GitHub Intelligence."
        description="Engineering activity across 100+ repositories, multiple languages, and Web3 ecosystems."
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-10">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-2xl border border-border/40 bg-card p-5 text-center"
          >
            <stat.icon className="mx-auto h-5 w-5 text-muted-foreground/60" />
            <p className="mt-2 text-2xl font-semibold tracking-tight">
              {loading ? "—" : stat.value}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Language distribution */}
      <Card delay={0.2} hover={false}>
        <div className="flex items-center gap-2 mb-6">
          <Code2 className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Language Distribution</h3>
        </div>
        <div className="space-y-3">
          {stats?.top_languages.map((lang) => (
            <div key={lang.name} className="flex items-center gap-3">
              <span className="w-20 text-xs font-medium text-muted-foreground">
                {lang.name}
              </span>
              <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(lang.count / maxLangCount) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
              </div>
              <span className="w-8 text-right text-xs text-muted-foreground">
                {lang.count}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* GitHub link */}
      <div className="mt-8 text-center">
        <a
          href="https://github.com/aakash074"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-all hover:bg-foreground hover:text-background hover:border-foreground"
        >
          <GitCommit className="h-4 w-4" />
          View GitHub Profile
        </a>
      </div>
      </div>
    </section>
  );
}
