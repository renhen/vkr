from typing import Optional, List

from pydantic import Field
import datetime

from backend.app.models.core import CoreModel, IDModelMixin




class ParticipantsModel(IDModelMixin):
    gender: Optional[str] = Field(None, example="Мужской")
    role: Optional[str] = Field(None, example="Водитель")
    health_status: Optional[str] = Field(None, example="Не постарадал")
    violations: Optional[List[str]] = Field(None)


class PointModel(IDModelMixin):
    latitude: float = Field(..., example=42.5281)
    longitude: float = Field(..., example=48.1241)


class DTPRecordModel(PointModel):
    category: Optional[str] = Field(None, example="Наезд на пешехода")
    severity: Optional[str] = Field(None, example="Легкий")
    light: Optional[str] = Field(None, example="Светлое время суток")
    address: Optional[str] = Field(None, example="г Волгоград, ул им Пархоменко, 19")
    _datetime: datetime = Field(None, example="2021-04-30 16:15:00")
    dead_count: int = Field(...)
    injured_count: int = Field(...)
    participants_count: int = Field(...)
    nearby: Optional[List[str]] = Field(None)
    weather: Optional[List[str]] = Field(None)
    participants_categories: Optional[List[str]] = Field(None)
    road_condition: Optional[List[str]] = Field(None)
    participants: Optional[List[ParticipantsModel]] = Field(None)
