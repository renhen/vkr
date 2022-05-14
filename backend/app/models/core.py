from typing import Optional

from pydantic import BaseModel, Field
from pydantic.types import PositiveInt


class CoreModel(BaseModel):
    pass


class CountBase(CoreModel):
    count: int = Field(..., example="1")


class NameBase(CoreModel):
    name: str = Field(..., example="value")


class NameCountBase(NameBase, CountBase):
    pass


class IDModelBase(CoreModel):
    id: Optional[PositiveInt] = Field(None, example=1)


class IDModelMixin(CoreModel):
    id: PositiveInt = Field(..., example=1)
