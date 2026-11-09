"""ATS-friendly single-column resume for Aakash Kumar. Usage: python build_resume.py <out.pdf>"""
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor, black
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether, HRFlowable

OUT = sys.argv[1]
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.fonts import addMapping
F = "/System/Library/Fonts/Supplemental/"
for n, f in [("Arial", "Arial.ttf"), ("Arial-Bold", "Arial Bold.ttf"), ("Arial-Italic", "Arial Italic.ttf"), ("Arial-BoldItalic", "Arial Bold Italic.ttf")]:
    pdfmetrics.registerFont(TTFont(n, F + f))
addMapping("Arial", 0, 0, "Arial"); addMapping("Arial", 1, 0, "Arial-Bold"); addMapping("Arial", 0, 1, "Arial-Italic"); addMapping("Arial", 1, 1, "Arial-BoldItalic")
ACCENT = HexColor("#1f3a5f")
GREY = HexColor("#444444")

name = ParagraphStyle("name", fontName="Arial-Bold", fontSize=20, leading=24, alignment=TA_CENTER)
headline = ParagraphStyle("headline", fontName="Arial", fontSize=10.5, leading=14, alignment=TA_CENTER, textColor=ACCENT)
contact = ParagraphStyle("contact", fontName="Arial", fontSize=9, leading=12, alignment=TA_CENTER, textColor=GREY)
h = ParagraphStyle("h", fontName="Arial-Bold", fontSize=11, leading=14, textColor=ACCENT, spaceBefore=8, spaceAfter=1)
role = ParagraphStyle("role", fontName="Arial-Bold", fontSize=10, leading=13, spaceBefore=5)
meta = ParagraphStyle("meta", fontName="Arial-Italic", fontSize=9, leading=12, textColor=GREY, spaceAfter=1)
body = ParagraphStyle("body", fontName="Arial", fontSize=9.5, leading=12.5)
bullet = ParagraphStyle("bullet", parent=body, leftIndent=11, bulletIndent=2, bulletFontName="Arial", spaceAfter=1.2)

def link(url, text=None):
    return f'<link href="{url}" color="#1f3a5f">{text or url.split("://")[-1]}</link>'

story = []
def section(title):
    story.append(Paragraph(title.upper(), h))
    story.append(HRFlowable(width="100%", thickness=0.6, color=ACCENT, spaceBefore=0, spaceAfter=3))

def bullets(items):
    return [Paragraph(t, bullet, bulletText="•") for t in items]

def job(title, company, dates, place, items):
    story.append(KeepTogether([
        Paragraph(f"{title} | {company}", role),
        Paragraph(f"{dates} | {place}", meta),
        *bullets(items),
    ]))

# ---------- Header ----------
story += [
    Paragraph("Aakash Kumar", name),
    Paragraph("AI Product Engineer | Applied AI, RAG &amp; Semantic Search | Former CTO (Acquired Startup)", headline),
    Spacer(1, 2),
    Paragraph("New Delhi, India | Open to Remote &amp; Relocation | +91-8527741952 | "
              + link("mailto:aakashkumaar074@gmail.com", "aakashkumaar074@gmail.com"), contact),
    Paragraph(link("https://www.linkedin.com/in/aakash074/", "linkedin.com/in/aakash074") + " | "
              + link("https://github.com/aakash074", "github.com/aakash074") + " | "
              + link("https://aakash074.netlify.app", "aakash074.netlify.app"), contact),
]

# ---------- Summary ----------
section("Summary")
story.append(Paragraph(
    "AI product engineer with 4+ years of building and shipping products from zero to scale. Former CTO of "
    "CloneMyTrips (acquired) and Head of AI at WanderOn. Builds production AI systems: semantic search and "
    "reranking over ~26M patent families, RAG pipelines, AI agents and workflow automation. Strong full-stack "
    "foundation (Python, TypeScript, React, Node.js) and a security background: top 5 globally on HackTheBox, "
    "2x ETHGlobal winner, and holder of an Australian patent in ML-based vulnerability detection.", body))

# ---------- Experience ----------
section("Experience")
job("AI Consultant", "Shifu Ventures (Product Studio &amp; VC)", "Aug 2026 – Present", "India", [
    "Designed and built the core AI of <b>Photon Legal's Product Pulse</b>: a prior-art search engine over "
    "<b>~26M deduplicated Google Patents families</b>.",
    "Embedded patent text with <b>MiniLM</b> sentence embeddings for semantic vector retrieval and reranked candidates "
    "with <b>Cohere Rerank</b> to surface the closest matching prior art.",
    "Built a CI-gated evaluation harness that scores retrieval recall against the prior art patent examiners actually "
    "cited; found and fixed a family-level scoring flaw that had been understating recall and reversed a planned "
    "switch to a smaller corpus.",
    "Built an idea-scoring system that compares inventors' disclosures against matched prior art, helping client "
    "companies decide which inventions to file as patents.",
    "Work with Shifu Ventures portfolio startups on product, AI and engineering to get their products working "
    "reliably in production.",
])
job("Head of AI", "WanderOn", "Oct 2025 – Jul 2026", "Gurugram, India", [
    "Led AI across the organization; built internal AI tools that improved operational efficiency and launched "
    "AI agents to improve customer experience.",
    "Built AI-first systems for operations automation and product intelligence using LLM applications, RAG and "
    "multi-agent workflows. The company raised an INR 54 Cr Series A during this period.",
])
job("Chief Technology Officer", "CloneMyTrips (Acquired)", "Mar 2024 – Sep 2025", "Bengaluru, India (Hybrid)", [
    "Designed the platform architecture from scratch and led engineering and product through to the company's acquisition.",
    "Launched the <b>Dora AI Engine</b> in the mobile app, generating AI-curated travel itineraries that connect "
    "travel creators with their audiences.",
    "Worked directly with the founders on technical strategy, product roadmap and scaling.",
])
job("Senior Frontend Developer (Web3)", "Safle", "Feb 2023 – Mar 2024", "Abu Dhabi, UAE (Remote)", [
    "Built a crypto wallet that works without an internet connection, for a Web3 wallet and browser used by a global user base.",
])
job("Co-Founder", "Calmverse", "Aug 2022 – Feb 2023", "Remote", [
    "Co-founded a Web3 metaverse for mental health; owned the product concept and technical architecture.",
])
job("Senior Frontend Developer", "QuickSell", "Jun 2022 – Nov 2022", "Mumbai, India", [
    "Promoted from junior to senior developer; built React.js applications for a conversational commerce platform.",
])
job("Lead Developer, Megham Cloud (IaaS)", "Centre of Innovation &amp; Incubation, NIT Warangal",
    "Aug 2020 – Apr 2022", "Warangal, India", [
    "Led development of the institute's Megham cloud infrastructure platform.",
])

# ---------- Client work ----------
section("Selected Consulting &amp; Client Work")
story += bullets([
    "<b>Fintech &amp; Web3 products</b> (Frontline BNPL, PayoutRails stablecoin payroll, HashFast payment links, "
    "NanoBond bond launchpad): built smart-contract and payment infrastructure, batch payouts and real-time settlement.",
    "<b>Nihaan Energy</b> (EV charging): built the NEO mobile app and web charger-management platform with "
    "real-time monitoring and OCPP compliance.",
    "20+ products shipped across AI, fintech, Web3, consumer apps and clean energy.",
])

# ---------- Projects ----------
section("Projects")
story += bullets([
    "<b>Wedding Album AI Shortlister</b>: picks the best photos from thousands using CLIP embeddings, aesthetic "
    "scoring, clustering-based duplicate removal and LLM curation. Launched on Product Hunt (Mar 2026). Python, CLIP, LLMs.",
    "<b>OKX DeFi AI Copilot</b>: AI agent that turns plain-English trading strategies into one-click swaps on Solana "
    "via the OKX DEX API. React 19, TypeScript, Perplexity API.",
    "<b>SafeLease</b>: privacy-preserving property leasing with zero-knowledge identity (Self Protocol) and four "
    "Solidity smart contracts on Celo.",
])

# ---------- Skills ----------
section("Skills")
for label, items in [
    ("AI / ML", "LLM applications, RAG, semantic search, vector embeddings (MiniLM, CLIP), reranking (Cohere), "
                "AI agents, multi-agent systems, prompt engineering, OpenAI and Claude APIs, MCP"),
    ("Languages", "Python, TypeScript, JavaScript, SQL, Solidity, Bash"),
    ("Backend &amp; Data", "Node.js, Express, Django, REST, GraphQL, PostgreSQL, MongoDB, Redis"),
    ("Frontend", "React, Next.js, React Native, Tailwind CSS"),
    ("Cloud &amp; DevOps", "AWS, Docker, CI/CD, Vercel, Netlify, Linux, Git"),
    ("Web3 &amp; Security", "Solana, Ethereum, Hedera, Celo, penetration testing, OWASP Top 10, threat modeling"),
]:
    story.append(Paragraph(f"<b>{label}:</b> {items}", ParagraphStyle("sk", parent=body, spaceAfter=1.5)))

# ---------- Education ----------
section("Education")
story.append(Paragraph("<b>B.Tech, Computer Science and Engineering</b> | National Institute of Technology (NIT), Warangal", body))
story.append(Paragraph("2018 – 2022", meta))

# ---------- Achievements ----------
section("Achievements")
story += bullets([
    "<b>Patent:</b> Australian Patent AU 2021105619, an ML-based method for identifying duplicate security vulnerabilities.",
    "<b>2x ETHGlobal hackathon winner</b> (ETHGlobal Singapore and Bangkok).",
    "<b>HackTheBox Omniscient rank</b>: top 5 globally among 400,000+ hackers.",
    "Earned INR 2 lakh+ in bug bounties for responsibly disclosing vulnerabilities to Dell, Samsung and others.",
    "Invited InfoSec speaker at the E&amp;ICT Academy, NIT Warangal Faculty Development Program.",
    "Co-founded BugClaim (crowdsourced security SaaS) and CybSec NITW; organized PhantomCTF, NIT Warangal's first CTF.",
])

doc = SimpleDocTemplate(
    OUT, pagesize=A4, leftMargin=16*mm, rightMargin=16*mm, topMargin=13*mm, bottomMargin=13*mm,
    title="Aakash Kumar - Resume", author="Aakash Kumar",
    subject="AI Product Engineer resume",
    keywords="AI Engineer, Applied AI, RAG, Semantic Search, LLM, Python, TypeScript",
    creator="Aakash Kumar",
)
doc.build(story)
print("written", OUT)
