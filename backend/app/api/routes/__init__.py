from fastapi import APIRouter
#from app.api.routes.time_calls import router as time_calls_router
from backend.app.api.routes.dtp import router as dtp_router
from backend.app.api.routes.building import router as building_router


router = APIRouter()

#router.include_router(time_calls_router, prefix="/time_calls", tags=["time_calls"])
router.include_router(dtp_router, prefix="/dtp", tags=["dtp"])
router.include_router(building_router, prefix="/building", tags=["building"])

