from typing import List

from fastapi import APIRouter, Depends

from backend.app.api.dependencies.database import get_repository
from backend.app.db.repositories.building import BuildingRepository
from backend.app.models.building import EmergencyHouseBase, ArchitecturalStats, FloorCountModel, BuiltYearStats
from backend.app.models.core import NameCountBase

router = APIRouter()


@router.get("/emergency/count",
            response_model=List[EmergencyHouseBase])
async def get_emergency_house_count(
        repo: BuildingRepository = Depends(get_repository(BuildingRepository)),
):
    """
    Возвращает количество домов, признанных аварийными и количество домов, не признанных аварийными
    """
    return await repo.emergency_house_count()


@router.get("/repair_work/count",
            response_model=List[NameCountBase])
async def get_repair_work_count(
        repo: BuildingRepository = Depends(get_repository(BuildingRepository)),
):
    """
    Возвращает тип работы и количество домов, для которых эта работа запланирована
    """
    return await repo.repair_work_count()


@router.get("/stats/architectural",
            response_model=List[ArchitecturalStats])
async def get_architectural_stats(
        repo: BuildingRepository = Depends(get_repository(BuildingRepository)),
):
    """
    Возвращает количество всех домов и домов, имеющих архитектурную ценность
    """
    return await repo.architectural_stats()


@router.get("/floor/count",
            response_model=List[FloorCountModel])
async def get_floor_count(
        repo: BuildingRepository = Depends(get_repository(BuildingRepository)),
):
    """
    Возвращает этажность дома и количество домов с конкретной этажностью
    """
    return await repo.floor_count()


@router.get("/stats/housing_availability/avg",
            response_model=float)
async def get_avg_housing_availability(
        repo: BuildingRepository = Depends(get_repository(BuildingRepository)),
):
    """
    Возвращает среднюю жилищную обеспеченность на 1 человека в городе
    """
    return await repo.avg_housing_availability()


@router.get("/built_year/count",
            response_model=List[BuiltYearStats])
async def get_built_year_count(
        repo: BuildingRepository = Depends(get_repository(BuildingRepository)),
):
    """
    Возвращает год постройки и количество домов, построенных в этот год
    """
    return await repo.built_year_stat()
