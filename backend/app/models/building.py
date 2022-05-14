from pydantic import Field

from backend.app.models.core import CoreModel, CountBase


class EmergencyHouseBase(CountBase):
    is_alarm: int = Field(..., example="0")


class ArchitecturalStats(CoreModel):
    count_all_house: int = Field(..., example=1)
    count_architectural_house: int = Field(..., example=1)


class FloorCountModel(CountBase):
    floor: int = Field(None, example=1)


class BuiltYearStats(CountBase):
    built_year: int = Field(None, example=2000)
