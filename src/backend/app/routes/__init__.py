from fastapi import APIRouter

from app.routes.dashboard import router as dashboard_router
from app.routes.interactions import router as interactions_router
from app.routes.policies import router as policies_router

api_router = APIRouter()

api_router.include_router(dashboard_router, tags=["Dashboard"])
api_router.include_router(interactions_router, tags=["Interactions"])
api_router.include_router(policies_router, tags=["Policies"])