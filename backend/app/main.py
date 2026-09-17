from dotenv import load_dotenv
from pathlib import Path
import os

load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import analyze_bias, summarize, compare, fetch

app = FastAPI(title="RawSignal API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_bias.router)
app.include_router(summarize.router)
app.include_router(compare.router)
app.include_router(fetch.router)


@app.get("/")
def health_check():
    return {"status": "ok"}