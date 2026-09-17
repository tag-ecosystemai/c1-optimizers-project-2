from dotenv import load_dotenv
load_dotenv()

from app.ingestion.newsapi_client import search_articles

results = search_articles("AI regulation", page_size=4)
for r in results:
    print(r)