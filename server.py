#!/usr/bin/env python3
"""
Modern Portfolio Website Server
Railway-compatible server for the GBP 1500 portfolio.
"""

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from pathlib import Path

app = FastAPI(title="Rantilini Modern Portfolio", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return FileResponse('index.html')

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "rantilini-portfolio-modern"}

# Mount static files - serve all static content
app.mount("/static", StaticFiles(directory="."), name="static")
app.mount("/", StaticFiles(directory=".", html=True), name="root")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
