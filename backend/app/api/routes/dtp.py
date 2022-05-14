from datetime import timedelta
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from pydantic.datetime_parse import date
from starlette import status

from backend.app.api.dependencies.database import get_repository
from backend.app.db.repositories.dtp import DTPRepository
from backend.app.models.core import NameCountBase
from backend.app.models.dtp import PointModel, DTPRecordModel

router = APIRouter()


@router.get("/point",
            response_model=List[PointModel])
async def get_point(
        start_date: date,
        end_date: date,
        repo: DTPRepository = Depends(get_repository(DTPRepository)),
):
    """
    !!! Писать дату надо в формате YYYY-MM-DD
    Получить список координат для отображения на карте
    """
    if start_date > end_date or end_date - start_date > timedelta(days=14):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Интервал превышает 14 дней или дата начала больше, чем дата конца интервала"
        )

    return await repo.get_points(start_date, end_date)


@router.get("/{id}",
            response_model=DTPRecordModel)
async def get_by_id(
        id: int,
        repo: DTPRepository = Depends(get_repository(DTPRepository)),
):
    """
    Возвращает всю информацию о дтп по заданному айди.
    """
    res = await repo.get_dtp_by_id(id)
    if res is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ДТП с указанным айди не найден"
        )
    return res


@router.get("/stat/driver/violations/top",
            response_model=List[NameCountBase])
async def get_top_driver_violations(
        count: int,
        repo: DTPRepository = Depends(get_repository(DTPRepository)),
):
    """
    Возвращает топ %count% нарушений водителя и их количество

    %count% должен быть в диапозоне от 1 до 20 включительно
    """
    if count > 20 or count < 1:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Count не находится в диапозоне от 1 до 20 включительно"
        )
    return await repo.top_driver_violations(count)


@router.get("/stat/driver/violations/count",
            response_model=int)
async def get_count_driver_violations(
        repo: DTPRepository = Depends(get_repository(DTPRepository)),
):
    """
    Возвращает количество всех дтп, в которых нарушил водитель
    """
    return await repo.count_driver_violations()


@router.get("/stat/passenger/violations/top",
            response_model=List[NameCountBase])
async def get_top_passenger_violations(
        count: int,
        repo: DTPRepository = Depends(get_repository(DTPRepository)),
):
    """
    Возвращает топ %count% нарушений пешехода и их количество

    %count% должен быть в диапозоне от 1 до 20 включительно
    """
    if count > 20 or count < 1:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Count не находится в диапозоне от 1 до 20 включительно"
        )
    return await repo.top_passenger_violations(count)


@router.get("/stat/passenger/violations/count",
            response_model=int)
async def get_count_passenger_violations(
        repo: DTPRepository = Depends(get_repository(DTPRepository)),
):
    """
    Возвращает количество всех дтп, в которых нарушил пешеход
    """
    return await repo.count_passenger_violations()


@router.get("/stat/weather/count",
            response_model=List[NameCountBase])
async def get_weather_count(
        repo: DTPRepository = Depends(get_repository(DTPRepository)),
):
    """
    Возвращает погодные условия и количество дтп в конкретные условия
    """
    return await repo.count_weather()


@router.get("/stat/light/count",
            response_model=List[NameCountBase])
async def get_light_count(
        repo: DTPRepository = Depends(get_repository(DTPRepository)),
):
    """
    Возвращает освещенность и количество дтп, совершенные в данной освещенности
    """
    return await repo.count_light()
