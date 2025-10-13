from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import dashboard, user
from .routers import auth
from .utilities import database
from .utilities.database import engine

database.Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="Sales Dashboard API",
    description="Sales Dashboard API helps to manage sales data and provides insights through various endpoints."
                "copyright © 2025 Charvet Group. All rights reserved.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "https://*.vercel.app",
        "https://charvet-group.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router)
app.include_router(user.router)
app.include_router(auth.router)
