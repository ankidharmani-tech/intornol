"""
crawler.py — Scoped crawler targeting specific government domains.

Limits to ~25 pages, respects robots.txt, adds 1-2 sec delay, and extracts
structured JSON using the LLM pipeline, saving them to data/seed_services/.
"""

import json
import os
import random
import time
import urllib.robotparser
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

from backend.app.extraction.llm_extractor import extract_from_text

# ── Config ──────────────────────────────────────────────────────────

ALLOWED_DOMAINS = ["services.india.gov.in", "thanecorporation.gov.in"]
START_URLS = [
    "https://services.india.gov.in/service/listing",
    "https://thanecorporation.gov.in/tmc/"
]
MAX_PAGES = 25
DELAY_MIN = 1.0
DELAY_MAX = 2.0

USER_AGENT = "NagrikMargCrawler/1.0 (Hackathon Project)"

# ── Globals ─────────────────────────────────────────────────────────

visited = set()
queue = START_URLS.copy()
rp_cache = {}


def get_robot_parser(url: str) -> urllib.robotparser.RobotFileParser:
    parsed = urlparse(url)
    domain = parsed.netloc
    if domain not in rp_cache:
        rp = urllib.robotparser.RobotFileParser()
        rp.set_url(f"{parsed.scheme}://{domain}/robots.txt")
        try:
            rp.read()
        except Exception:
            pass  # If robots.txt is missing/fails, we'll assume allowed
        rp_cache[domain] = rp
    return rp_cache[domain]


def can_fetch(url: str) -> bool:
    parsed = urlparse(url)
    # Scope check
    if not any(d in parsed.netloc for d in ALLOWED_DOMAINS):
        return False
    # robots.txt check
    rp = get_robot_parser(url)
    try:
        return rp.can_fetch(USER_AGENT, url)
    except Exception:
        return True


def crawl_and_extract():
    print("Starting scoped crawler...")
    extracted_nodes = []
    
    while queue and len(visited) < MAX_PAGES:
        url = queue.pop(0)
        
        if url in visited:
            continue
            
        if not can_fetch(url):
            print(f"Skipping (out of scope or robots.txt): {url}")
            visited.add(url)
            continue
            
        print(f"[{len(visited)+1}/{MAX_PAGES}] Fetching {url}")
        visited.add(url)
        
        try:
            headers = {"User-Agent": USER_AGENT}
            resp = requests.get(url, headers=headers, timeout=10)
            resp.raise_for_status()
            
            # Delay
            time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
            
            soup = BeautifulSoup(resp.text, "html.parser")
            
            # Extract links for queue
            for link in soup.find_all("a", href=True):
                next_url = urljoin(url, link["href"])
                # Clean URL (remove fragments)
                next_url = next_url.split("#")[0]
                if next_url not in visited and next_url not in queue:
                    queue.append(next_url)
            
            # Extract text for LLM
            # Remove scripts, styles, nav, footer
            for el in soup(["script", "style", "nav", "footer", "header"]):
                el.decompose()
            text_content = soup.get_text(separator="\n", strip=True)
            
            # If page has substantive content, try to extract a service node
            if len(text_content) > 200:
                print("  -> Sending to LLM extraction...")
                node = extract_from_text(text_content, source_url=url)
                if node and node.get("name"):
                    # Generate an ID
                    import uuid
                    node["id"] = f"crawled_{uuid.uuid4().hex[:8]}"
                    node["status"] = "approved"
                    extracted_nodes.append(node)
                    print(f"  -> Successfully extracted: {node['name']}")
                else:
                    print("  -> No service data extracted (or API key missing).")
                    
        except Exception as e:
            print(f"  -> Error fetching {url}: {e}")
            
    # Save results
    if extracted_nodes:
        output_file = Path(__file__).resolve().parents[3] / "data" / "seed_services" / "crawled_data.json"
        
        # Build the schema-compliant wrapper
        wrapper = {
            "task": "crawled_services",
            "city": "Thane",
            "state": "Maharashtra",
            "services": extracted_nodes,
            "edges": [],
            "clarifying_questions": []
        }
        
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(wrapper, f, indent=2)
            
        print(f"Saved {len(extracted_nodes)} nodes to {output_file}")
    else:
        print("Crawler finished but no nodes were extracted.")

if __name__ == "__main__":
    crawl_and_extract()
